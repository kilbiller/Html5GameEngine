"use strict";

var X = require('./X');
var PIXI = require('pixi.js');

class StaticObject extends X.Entity {
  constructor(game, x, y, width, height, texture) {
    super(game, x, y);
    this.width = width;
    this.height = height;
    this.texture = texture;
    this.anims = null;
    this.currentAnim = null;
    this.boundingbox = new X.Rectangle(0, 0, this.width, this.height);
    this.zIndex = this.y + this.height;

    this.sprite = new PIXI.Sprite(this.texture);
    this.game.stage.addChild(this.sprite);

    var spriteSheet = new X.SpriteSheet(this.sprite, this.width, this.height);
    this.anims = new X.Animations(spriteSheet, {
      idle: {
        frames: [0],
        step: 0.15,
        loop: true
      }
    });
  }

  update(dt) {
    this.anims.setAnim("idle");

    this.sprite.position.x = this.x;
    this.sprite.position.y = this.y;

    this.anims.getCurrent().update(dt);
  }

  getCollisionBox() {
    return new X.Rectangle(this.x + this.boundingbox.x, this.y + this.boundingbox.y,
                           this.boundingbox.width, this.boundingbox.height);
  }
}

module.exports = StaticObject;
