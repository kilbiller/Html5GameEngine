"use strict";

export default class State {
  constructor(game) {
    this.game = game;
  }

  onEnter() {}

  update() {}

  onExit() {}

  onPause() {}

  onResume() {}

  static get Empty() {
    return new State();
  }
}
