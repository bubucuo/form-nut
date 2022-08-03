import {ReactionStack} from "./environment";

export default class Tracker {
  constructor(_scheduler) {
    this._scheduler = _scheduler;
  }
  track = (tracker) => {
    this.results = tracker();

    ReactionStack.push(this);

    return this.results;
  };

  dispose = () => {};
}
