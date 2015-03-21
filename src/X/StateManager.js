"use strict";

class StateManager {
  constructor() {
    this.states = [];
  }

  update(dt) {
    var state = this.states[this.states.length - 1];
    if(state) {
      state.update(dt);
    }
  }

  push(state) {
    this.states.push(state);
    state.onEnter();
  }

  pop() {
    var state = this.states[this.states.length - 1];
    state.onExit();
    return this.states[this.states.length - 1];
  }

  pause() {
    var state = this.states[this.states.length - 1];
    if(state.onPause) {
      state.onPause();
    }
  }

  resume() {
    var state = this.states[this.states.length - 1];
    if(state.onResume) {
      state.onResume();
    }
  }
}

module.exports = StateManager;
