"use strict";

var X = require('./../X');
var PIXI = require('pixi.js');
var Entity = require('./Entity');
var Components = require('../components');

class Logs extends Entity {
  constructor(x, y, width, height, textureName) {
    super();
    super.addComponent(new Components.Position(x, y));
    super.addComponent(new Components.Dimension(width, height));
    super.addComponent(new Components.Sprite(new PIXI.Sprite.fromImage(textureName)));
    /*this.boundingbox = new X.Rectangle(0, 0, this.width, this.height);
    this.zIndex = this.y + this.height;*/
  }

  /*getCollisionBox() {
    return new X.Rectangle(this.x + this.boundingbox.x, this.y + this.boundingbox.y,
                           this.boundingbox.width, this.boundingbox.height);
  }*/
}

module.exports = Logs;
