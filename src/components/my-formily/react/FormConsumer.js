import {isFn} from "../utils";

export default function FormConsumer({children}) {
  const renderChildren = isFn(children) ? children() : null;
  return <>{renderChildren}</>;
}
