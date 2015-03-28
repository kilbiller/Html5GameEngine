"use strict";

export default class StateManager {
  constructor() {
    this.states = [];
  }

  update(dt) {
    let state = this.states[this.states.length - 1];
    if(state) {
      state.update(dt);
    }
  }

  push(state) {
    this.states.push(state);
    state.onEnter();
  }

  pop() {
    let state = this.states[this.states.length - 1];
    state.onExit();
    return this.states[this.states.length - 1];
  }

  pause() {
    let state = this.states[this.states.length - 1];
    if(state.onPause) {
      state.onPause();
    }
  }

  resume() {
    let state = this.states[this.states.length - 1];
    if(state.onResume) {
      state.onResume();
    }
  }
}
