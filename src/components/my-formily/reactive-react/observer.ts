import {IObserverOptions, ReactFC} from "./types";
import {forwardRef, memo} from "react";
import {useObserver} from "./hooks";

export function observer<
  P,
  Options extends IObserverOptions = IObserverOptions
>(component: ReactFC<P>, options?: Options) {
  const realOptions = {forwardRef: false, ...options};

  const wrappedComponent = realOptions.forwardRef
    ? forwardRef((props: any, ref: any) => {
        return useObserver(() => component({...props, ref}), realOptions);
      })
    : (props: any) => {
        return useObserver(() => component(props), realOptions);
      };

  const memoComponent = memo(wrappedComponent);

  return memoComponent;
}
