"use strict";

class Timer {
  constructor() {
    this.gameTime = 0;
    this.maxStep = 0.05;
    this.previousTime = 0;
  }

  tick() {
    var now, actualDelta, gameDelta;
    now = Date.now();
    actualDelta = (now - this.previousTime) / 1000;
    this.previousTime = now;

    gameDelta = Math.min(actualDelta, this.maxStep);
    this.gameTime += gameDelta;
    return gameDelta;
  }
}

module.exports = Timer;
