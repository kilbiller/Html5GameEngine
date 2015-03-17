"use strict";

var X = require('./../X');
var PIXI = require('pixi.js');
var Entity = require('./Entity');
var components = require('../components');

class Logs extends Entity {
  constructor(game, x, y, width, height, textureName) {
    super(game);
    super.addComponent(new components.position(x, y));
    super.addComponent(new components.sprite(new PIXI.Sprite.fromImage(textureName)));
    /*this.width = width;
    this.height = height;*/
    /*this.boundingbox = new X.Rectangle(0, 0, this.width, this.height);
    this.zIndex = this.y + this.height;*/
    this.game.stage.addChild(this.components.sprite.sprite);
  }

  /*getCollisionBox() {
    return new X.Rectangle(this.x + this.boundingbox.x, this.y + this.boundingbox.y,
                           this.boundingbox.width, this.boundingbox.height);
  }*/
}

module.exports = Logs;
