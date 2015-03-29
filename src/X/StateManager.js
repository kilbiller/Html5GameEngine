import State from "./State";

export default class StateManager {
  constructor() {
    this.states = [];
    this.currentState = State.Empty;
  }

  update(dt) {
    this.currentState.update(dt);
  }

  change(stateName, params = {}) {
    this.currentState.onExit();
    this.currentState = this.states[stateName];
    this.currentState.onEnter(params);
  }

  add(name, state) {
    this.states[name] = state;
  }

  pause() {
    if(this.currentState.onPause) {
      this.currentState.onPause();
    }
  }

  resume() {
    if(this.currentState.onResume) {
      this.currentState.onResume();
    }
  }
}
