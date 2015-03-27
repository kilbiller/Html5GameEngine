"use strict";

import PIXI from 'pixi.js';
import Vector from './Vector';
import {
  clamp
}
from './Utils';

export default class Camera {
  constructor(game, world) {
    this.game = game;
    this.world = world;
    this.target = null;
  }

  follow(target) {
    this.target = target;
  }

  update(dt) {
    if(this.target !== null) {
      var targetCenter = new Vector(this.target.components.sprite.sprite.x + this.target.components.sprite.sprite.width / 2,
        this.target.components.sprite.sprite.y + this.target.components.sprite.sprite.height / 2);
      var x = targetCenter.x - this.game.width / 2;
      var y = targetCenter.y - this.game.height / 2;
      x = clamp(x, 0, this.game.tilemap.width * this.game.tilemap.tilewidth - this.game.width);
      y = clamp(y, 0, this.game.tilemap.height * this.game.tilemap.tileheight - this.game.height);

      //var lerp = Vector.lerp(new Vector(this.game.renderer.x, this.game.renderer.y), new Vector(x, y), 0.1);
      this.world.x = -x;
      this.world.y = -y;
    }
  }
}
