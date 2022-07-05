import {useReducer, useRef, useEffect} from "react";
import {Tracker} from "@/which";

export function useObserver(view) {
  const [, forceUpdate] = useReducer((x) => x + 1, 0);

  const unmountRef = useRef(false);
  const trackerRef = useRef(null);

  if (!trackerRef.current) {
    trackerRef.current = new Tracker(() => {
      forceUpdate();
    });
  }

  useEffect(() => {
    unmountRef.current = false;

    return () => {
      unmountRef.current = true;

      if (trackerRef.current) {
        trackerRef.current.dispose();
        trackerRef.current = null;
      }
    };
  }, []);

  return trackerRef.current.track(view);
}
