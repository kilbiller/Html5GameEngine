"use strict";

var X = require('./../X');
var Entity = require('./Entity');
var Components = require('../Components');

class Ennemy extends Entity {
  constructor(x, y, width, height, textureName) {
    super("ennemy");
    super.addComponent(new Components.Position(x, y));
    super.addComponent(new Components.Dimension(width, height));

    var spriteSheet = new X.SpriteSheet(textureName, width, height);
    super.addComponent(new Components.Sprite(spriteSheet.getSprite()));
    super.addComponent(new Components.Animation(new X.Animations(spriteSheet, {
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
    }), "idle"));

    super.addComponent(new Components.Direction());

    super.addComponent(new Components.Health());

    super.addComponent(new Components.Collider(6, 20, 20, 10));
  }
}

module.exports = Ennemy;
