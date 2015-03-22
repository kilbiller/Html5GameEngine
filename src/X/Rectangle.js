"use strict";

class Rectangle {
  constructor(x = 0, y = 0, width = 0, height = 0) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
  }

  clone() {
    return new Rectangle(this.x, this.y, this.width, this.height);
  }

  move(x = 0, y = 0) {
    this.x += x;
    this.y += y;
    return this;
  }

  offset(x, y) {
    this.x = x || this.x;
    this.y = y || this.y;
    return this;
  }

  intersects(rect) {
    return(this.x <= rect.x + rect.width &&
      this.x + this.width >= rect.x &&
      this.y <= rect.y + rect.height &&
      this.y + this.height >= rect.y);
  }

  print() {
    console.log(this);
  }
}

module.exports = Rectangle;
