"use strict";

var X = require('./../X');
var PIXI = require('pixi.js');
var Entity = require('./Entity');
var PositionComponent = require('../Component/Position');
var SpriteComponent = require('../Component/Sprite');

class LogsPile extends Entity {
  constructor(game, x, y, width, height, textureName) {
    super(game);
    super.addComponent(new PositionComponent(x, y));
    super.addComponent(new SpriteComponent(new PIXI.Sprite.fromImage(textureName)));
    /*this.width = width;
    this.height = height;*/
    /*this.boundingbox = new X.Rectangle(0, 0, this.width, this.height);
    this.zIndex = this.y + this.height;*/
    console.log(this.components);
    this.game.stage.addChild(this.components.sprite.sprite);
  }

  update(dt) {
    this.components.sprite.sprite.position.x = this.components.position.x;
    this.components.sprite.sprite.position.y = this.components.position.y;
  }

  /*getCollisionBox() {
    return new X.Rectangle(this.x + this.boundingbox.x, this.y + this.boundingbox.y,
                           this.boundingbox.width, this.boundingbox.height);
  }*/
}

module.exports = LogsPile;
