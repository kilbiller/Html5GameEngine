"use strict";

export default class Rectangle {
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
    return(this.Left <= rect.Right && this.Right >= rect.Left && this.Top <= rect.Bottom && this.Bottom >= rect.Top);
  }

  get Top() {
    return this.y;
  }

  get Bottom() {
    return this.y + this.height;
  }

  get Left() {
    return this.x;
  }

  get Right() {
    return this.x + this.width;
  }

  print() {
    console.log(this);
  }
}
