import React, {
  useState,
  useEffect,
  useCallback,
  useRef,
  useLayoutEffect,
} from "react";

import {IObserverOptions} from "./types";
import {Tracker} from "../reactive/tracker";
import {GarbageCollector, immediate} from "./shared";

class ObjectToBeRetainedByReact {}

function objectToBeRetainedByReactFactory() {
  return new ObjectToBeRetainedByReact();
}

export const useObserver = <T extends () => any>(
  view: T,
  options?: IObserverOptions
): ReturnType<T> => {
  const forceUpdate = useForceUpdate();
  const unMountRef = React.useRef(false);
  let trackerRef = React.useRef<Tracker>();
  const gcRef = React.useRef<GarbageCollector>();
  const [objectRetainedByReact] = React.useState(
    objectToBeRetainedByReactFactory
  );
  if (!trackerRef.current) {
    trackerRef.current = new Tracker(() => {
      if (typeof options?.scheduler === "function") {
        options.scheduler(forceUpdate);
      } else {
        forceUpdate();
      }
    }, options?.displayName);
  }

  //StrictMode/ConcurrentMode会导致组件无法正确触发UnMount，所以只能自己做垃圾回收
  if (!gcRef.current) {
    gcRef.current = new GarbageCollector(() => {
      if (trackerRef.current) {
        trackerRef.current.dispose();
      }
    });
    gcRef.current.open(objectRetainedByReact);
  }

  React.useEffect(() => {
    unMountRef.current = false;
    gcRef.current.close();
    return () => {
      unMountRef.current = true;
      if (trackerRef.current) {
        trackerRef.current.dispose();
        trackerRef.current = null;
      }
    };
  }, []);

  return trackerRef.current.track(view);
};

//
const EMPTY_ARRAY: any[] = [];
const RENDER_COUNT = {value: 0};
const RENDER_QUEUE = new Set<() => void>();

export function useForceUpdate() {
  const [, setState] = useState([]);
  const unMountRef = useRef(false);

  useEffect(() => {
    unMountRef.current = false;
    return () => {
      unMountRef.current = true;
    };
  }, EMPTY_ARRAY);

  const update = useCallback(() => {
    if (unMountRef.current) return;
    setState([]);
  }, EMPTY_ARRAY);

  const scheduler = useCallback(() => {
    if (RENDER_COUNT.value === 0) {
      update();
    } else {
      RENDER_QUEUE.add(update);
    }
  }, EMPTY_ARRAY);

  RENDER_COUNT.value++;

  useDidUpdate(() => {
    if (RENDER_COUNT.value > 0) {
      RENDER_COUNT.value--;
    }
    if (RENDER_COUNT.value === 0) {
      RENDER_QUEUE.forEach((update) => {
        RENDER_QUEUE.delete(update);
        update();
      });
    }
  });

  return scheduler;
}

//

export const useDidUpdate = (callback?: () => void) => {
  const request = useRef(null);
  request.current = immediate(callback);
  useLayoutEffect(() => {
    request.current();
    callback();
  });
};
