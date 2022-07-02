import {isFn, isCollectionType, isNormalType} from "./checkers";
import {
  RawProxy,
  ProxyRaw,
  MakeObservableSymbol,
  RawShallowProxy,
} from "./environment";
import {buildDataTree} from "./tree";
// import {buildDataTree, getDataNode} from "./tree";

import {PropertyKey} from "./types";
import {baseHandlers} from "./handlers";

const createNormalProxy = (target: any, shallow?: boolean) => {
  const proxy = new Proxy(target, baseHandlers);

  ProxyRaw.set(proxy, target);

  RawProxy.set(target, proxy);

  return proxy;
};

export const createObservable = (
  target: any,
  key?: PropertyKey,
  value?: any,
  shallow?: boolean
) => {
  if (typeof value !== "object") {
    return value;
  }
  const raw = ProxyRaw.get(value);

  buildDataTree(target, key, value);

  if (isNormalType(value)) {
    return createNormalProxy(value);
  }

  return value;
};
