import {bindTargetKeyWithCurrentReaction} from "./reaction";

export const baseHandlers: ProxyHandler<any> = {
  get(target, key, receiver) {
    const result = target[key];

    bindTargetKeyWithCurrentReaction({target, key, receiver, type: "get"});
  },
};
