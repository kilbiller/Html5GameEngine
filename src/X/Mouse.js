import Vector from "./Vector";

export default class Mouse {
  constructor(game) {
    this.pos = new Vector(0, 0);
    this.leftClick = false;
    this.middleClick = false;
    this.rightClick = false;
    this.game = game;

    window.addEventListener("mousedown", function(e) {
      this.mouseDown(e);
    }.bind(this), false);
    window.addEventListener("mouseup", function(e) {
      this.mouseUp(e);
    }.bind(this), false);
  }

  screenToWorld() {
    return new Vector(this.pos.x + this.game.camera.viewport.x, this.pos.y + this.game.camera.viewport.y);
  }

  mouseDown(e) {
    let x, y;
    // Offset to canvas element.
    x = e.clientX - this.game.ctx.canvas.getBoundingClientRect().left;
    y = e.clientY - this.game.ctx.canvas.getBoundingClientRect().top;

    if(this.isOutsideCanvas(x, y)) {
      return;
    }

    this.pos.x = x;
    this.pos.y = y;

    this.pos.x += this.game.camera.viewport.x;
    this.pos.y += this.game.camera.viewport.y;

    if(e.button === 0) {
      this.leftClick = true;
    }
    if(e.button === 1) {
      this.middleClick = true;
    }
    if(e.button === 2) {
      this.rightClick = true;
    }
  }

  mouseUp() {
    this.leftClick = false;
    this.middleClick = false;
    this.rightClick = false;
  }

  isOutsideCanvas(x, y) {
    let canvas = this.game.ctx.canvas;
    return !!(x < 0 || y < 0 || x > canvas.width || y > canvas.height);
  }
}
