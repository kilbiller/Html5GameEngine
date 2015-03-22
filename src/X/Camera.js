"use strict";

import PIXI from 'pixi.js';

export default class Camera {
  constructor(game) {
    this.game = game;
    this.target = null;
  }

  follow(target) {
    this.target = target;
  }

  update() {
    if(this.target !== null) {
      var targetCenterX = this.target.components.position.x + this.target.components.dimension.width / 2;
      var targetCenterY = this.target.components.position.y + this.target.components.dimension.height / 2;
      this.game.renderer.offset = new PIXI.Point(-(targetCenterX - this.game.renderer.width / 2), -(targetCenterY - this.game.renderer.height / 2));
    }
  }
}
