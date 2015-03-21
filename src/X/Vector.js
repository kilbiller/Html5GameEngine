"use strict";

class Vector {
  constructor(x = 0, y = 0) {
    this.x = x;
    this.y = y;
  }

  normalize() {
    var hyp = Math.sqrt(this.x * this.x + this.y * this.y);
    this.x /= hyp;
    this.y /= hyp;
  }

  moveTowards(origin, goal, step) {
    var dir = new Vector(goal.x - origin.x, goal.y - origin.y);
    dir.normalize();

    return new Vector(origin.x + dir.x * step, origin.y + dir.y * step);
  }
}

module.exports = Vector;
