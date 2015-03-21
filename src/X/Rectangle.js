"use strict";

class Rectangle {
  constructor(x = 0, y = 0, width = 0, height = 0) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
  }

  offset(x, y) {
    this.x = x || this.x;
    this.y = y || this.y;
  }

  intersects(rect) {
    return (this.x <= rect.x + rect.width &&
    this.x + this.width >= rect.x &&
    this.y <= rect.y + rect.height &&
    this.y + this.height >= rect.y);
  }
}

module.exports = Rectangle;
