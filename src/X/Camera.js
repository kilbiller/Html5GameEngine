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
    // TODO Fix diagonal jittering
    if(this.target !== null) {
      var targetCenterX = this.target.components.sprite.sprite.x + this.target.components.sprite.sprite.width / 2;
      var targetCenterY = this.target.components.sprite.sprite.y + this.target.components.sprite.sprite.height / 2;
      var x = targetCenterX - this.game.renderer.width / 2;
      var y = targetCenterY - this.game.renderer.height / 2;
      this.game.renderer.offset = new PIXI.Point(-x, -y);
    }
  }
}
