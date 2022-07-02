import {ArraySet} from "./array";
import {
  ReactionStack,
  UntrackCount,
  DependencyCollected,
  RawReactionsMap,
} from "./environment";
import {IOperation, Reaction, ReactionsMap, PropertyKey} from "./types";

const addRawReactionsMap = (
  target: any,
  key: PropertyKey,
  reaction: Reaction
) => {
  const reactionsMap = RawReactionsMap.get(target);
  if (reactionsMap) {
    const reactions = reactionsMap.get(key);
    if (reactions) {
      reactions.add(reaction);
    } else {
      reactionsMap.set(key, new ArraySet([reaction]));
    }

    return reactionsMap;
  } else {
    const reactionsMap: ReactionsMap = new Map([
      [key, new ArraySet([reaction])],
    ]);

    RawReactionsMap.set(target, reactionsMap);

    return reactionsMap;
  }
};

export const isUntracking = () => UntrackCount.value > 0;

const addReactionsMapToReaction = (
  reaction: Reaction,
  reactionsMap: ReactionsMap
) => {
  const bindSet = reaction._reactionsSet;

  if (bindSet) {
    bindSet.add(reactionsMap);
  } else {
    reaction._reactionsSet = new ArraySet([reactionsMap]);
  }

  return bindSet;
};

export const bindTargetKeyWithCurrentReaction = (operation: IOperation) => {
  let {key, type, target} = operation;

  const current = ReactionStack[ReactionStack.length - 1];

  if (isUntracking()) {
    return;
  }

  if (current) {
    DependencyCollected.value = true;
    addReactionsMapToReaction(
      current,
      addRawReactionsMap(target, key, current)
    );
  }
};
