import {ReactionStack, RawReactionsMap} from "./environment";
import {ArraySet} from "./array";

function addRawReactionsMap(target, key, reaction) {
  let reactionsMap = RawReactionsMap.get(key);

  if (reactionsMap) {
    const reactions = reactionsMap.get(key);

    if (reactions) {
      reactions.add(reaction);
    } else {
      reactions.set(key, new ArraySet([reaction]));
    }
  } else {
    reactionsMap = new Map([[key, new ArraySet([reaction])]]);

    RawReactionsMap.set(target, reactionsMap);
  }

  return reactionsMap;
}

export function bindTargetKeyCurrentReaction({target, key}) {
  const current = ReactionStack[ReactionStack.length - 1];

  if (current) {
    addRawReactionsMap(target, key, current);
  }
}

export function runReactionsFromTargetKey({target, key, value}) {
  const reactions = [];

  const reactionMap = RawReactionsMap.get(target);
  if (reactionMap) {
    const map = reactionMap.get(key);

    map.forEach((reaction) => {
      reactions.push(reaction);
    });
  }

  for (let i = 0, len = reactions.length; i < len; i++) {
    const reaction = reactions[i];
    if (typeof reaction._scheduler === "function") {
      reaction._scheduler();
    }
  }
}
