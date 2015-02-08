"use strict";

class Rectangle {
  constructor(x, y, width, height) {
    this.x = x || 0;
    this.y = y || 0;
    this.width = width || 0;
    this.height = height || 0;
  }

  offset(x, y) {
    this.x = x || this.x;
    this.y = y || this.y;
  }

  /*draw(ctx, color, scaleBy) {
    scaleBy = scaleBy || 1;
    color = color || "#000000";

    ctx.save();
    ctx.strokeStyle = color;

    // Round the numbers to prevent sub-pixel drawing on canvas.
    // (prevent blurring and supposedly improve performance)
    var x, y;
    x = Math.round(this.x);
    y = Math.round(this.y);

    ctx.strokeRect(x, y, this.width * scaleBy, this.height * scaleBy);

    ctx.restore();
  }*/

  intersects(rect) {
    return (this.x <= rect.x + rect.width &&
            this.x + this.width >= rect.x &&
            this.y <= rect.y + rect.height &&
            this.y + this.height >= rect.y);
  }
}

module.exports = Rectangle;
