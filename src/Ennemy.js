"use strict";

var X = require('./X');
var Actor = require('./Actor');
var PIXI = require('pixi.js');

class Ennemy extends Actor {
  constructor(game, x, y, width, height, textureName) {
    super(game, x, y, width, height, textureName);

    this.speed = 150;
    this.hp = 30;
    this.boundingbox = new X.Rectangle(6, 20, 20, 10);

    var spriteSheet = new X.SpriteSheet(textureName, this.width, this.height);

    this.sprite = spriteSheet.getSprite();
    this.game.stage.addChild(this.sprite);

    this.anims = new X.Animations(spriteSheet, {
      idle: {
        frames: [0],
        step: 0.15,
        loop: true
      },
      death: {
        frames: [36, 37, 38],
        step: 0.15,
        loop: false
      }
    });
  }

  update(dt) {
    if (this.isAlive) {
      this.anims.setAnim("idle");
    }

    this.sprite.position.x = this.x;
    this.sprite.position.y = this.y;

    this.anims.getCurrent().update(dt);
    this.zIndex = this.y + this.height;
    this.previousPos = new X.Vector(this.x, this.y);
  }

  takeDamage(damage) {
    this.hp -= damage;
    if (this.hp <= 0) {this.die(); }
  }
}

module.exports = Ennemy;
