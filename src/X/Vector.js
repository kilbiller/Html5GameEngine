"use strict";

class Vector {
  constructor(x = 0, y = 0) {
    this.x = x;
    this.y = y;
  }

  copy(vector) {
    this.x = vector.x;
    this.y = vector.y;
    return this;
  }

  clone() {
    return new Vector(this.x, this.y);
  }

  add(vector) {
    this.x += vector.x;
    this.y += vector.y;
    return this;
  }

  sub(vector) {
    this.x -= vector.x;
    this.y -= vector.y;
    return this;
  }

  norm() {
    var hyp = this.len();
    if(hyp > 0) {
      this.x /= hyp;
      this.y /= hyp;
    }
    return this;
  }

  getDirection(target) {
    var dir = new Vector(target.x - this.x, target.y - this.y);
    dir.norm();
    return dir;
  }

  dot(vector) {
    return this.x * vector.x + this.y * vector.y;
  }

  len2() {
    return this.dot(this);
  }

  len() {
    return Math.sqrt(this.len2());
  }

  print() {
    console.log(this);
  }
}

module.exports = Vector;
