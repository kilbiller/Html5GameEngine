"use strict";

export default class Time {
  constructor() {
    this.gameTime = 0;
    this.maxStep = 0.05;
    this.previousTime = 0;
  }

  tick() {
    var now = Date.now();
    var actualDelta = (now - this.previousTime) / 1000;
    this.previousTime = now;

    var gameDelta = Math.min(actualDelta, this.maxStep);
    this.gameTime += gameDelta;
    return gameDelta;
  }
}
