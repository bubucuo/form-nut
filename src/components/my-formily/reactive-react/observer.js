import {memo} from "react";
import {useObserver} from "./hooks";

export default function observer(component) {
  const WrappedComponent = (props) => {
    return useObserver(() => component({...props}));
  };

  const memoComponent = memo(WrappedComponent);

  return memoComponent;
}
