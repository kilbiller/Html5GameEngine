"use strict";

import PIXI from 'pixi.js';
import Vector from './Vector';
import {
  clamp
}
from './Utils';

export default class Camera {
  constructor(game) {
    this.game = game;
    this.target = null;
  }

  follow(target) {
    this.target = target;
  }

  update(dt) {
    // TODO Fix diagonal jittering
    if(this.target !== null) {
      var targetCenter = new Vector(this.target.components.sprite.sprite.x + this.target.components.sprite.sprite.width / 2,
        this.target.components.sprite.sprite.y + this.target.components.sprite.sprite.height / 2);
      var x = targetCenter.x - this.game.renderer.width / 2;
      var y = targetCenter.y - this.game.renderer.height / 2;
      x = clamp(x, 0, this.game.tilemap.width * this.game.tilemap.tilewidth - this.game.renderer.width);
      y = clamp(y, -this.game.tilemap.tileheight, this.game.tilemap.height * this.game.tilemap.tileheight - this.game.renderer.height);

      //var lerp = Vector.lerp(new Vector(this.game.renderer.x, this.game.renderer.y), new Vector(x, y), 0.1);
      //TODO Make camera a display object container that moves around an other display object (world)
      this.game.renderer.offset = new PIXI.Point(-x, -y);
    }
  }
}
