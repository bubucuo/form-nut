import {isFn} from "./checkers";
import {Reaction} from "./types";
import {ReactionStack} from "./environment";

export class Tracker {
  private results: any;
  constructor(
    schedduler?: (reaction: Reaction) => void,
    name = "TrackerReaction"
  ) {
    this.track._scheduler = (callback) => {
      if (this.track._boundary === 0) {
        this.dispose();

        if (isFn(callback)) {
          schedduler(callback);
        }
      }

      this.track._name = name;
      this.track._boundary = 0;
    };
  }

  track: any = (tracker: Reaction) => {
    if (!isFn(tracker)) return this.results;
    if (this.track._boundary > 0) return;
    if (ReactionStack.indexOf(this.track) === -1) {
      // releaseBindingReactions(this.track);
      try {
        // batchStart();
        ReactionStack.push(this.track);
        this.results = tracker();
      } finally {
        ReactionStack.pop();
        this.track._boundary++;
        // batchEnd();
        this.track._boundary = 0;
      }
    }
    return this.results;
  };

  dispose = () => {
    // disposeBindingReactions(this.track);
  };
}