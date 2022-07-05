import {useReducer, useEffect, useRef} from "react";
import {Tracker} from "@/which";

export function useObserver(view) {
  const [, forceUpdate] = useReducer((x) => x + 1, 1);

  const trackerRef = useRef(null);
  if (!trackerRef.current) {
    trackerRef.current = new Tracker(() => {
      forceUpdate();
    });
  }

  useEffect(() => {
    return () => {
      if (trackerRef.current) {
        trackerRef.current.dispose();
        trackerRef.current = null;
      }
    };
  }, []);

  return trackerRef.current.track(view);
}
