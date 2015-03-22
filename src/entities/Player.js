"use strict";

var X = require('./../X');
var Entity = require('./Entity');
var Components = require('../Components');

class Player extends Entity {
  constructor(x, y, width, height, textureName) {
    super("player");
    super.addComponent(new Components.Position(x, y));
    super.addComponent(new Components.Dimension(width, height));

    var spriteSheet = new X.SpriteSheet(textureName, width, height);
    super.addComponent(new Components.Sprite(spriteSheet.getSprite()));
    super.addComponent(new Components.Animation(new X.Animations(spriteSheet, {
      idleDown: {
        frames: [0],
        step: 0.15,
        loop: true
      },
      idleUp: {
        frames: [1],
        step: 0.15,
        loop: true
      },
      idleLeft: {
        frames: [2],
        step: 0.15,
        loop: true
      },
      idleRight: {
        frames: [3],
        step: 0.15,
        loop: true
      },
      moveDown: {
        frames: [4, 5, 6, 7],
        step: 0.15,
        loop: true
      },
      moveUp: {
        frames: [8, 9, 10, 11],
        step: 0.15,
        loop: true
      },
      moveLeft: {
        frames: [12, 13, 14, 15],
        step: 0.15,
        loop: true
      },
      moveRight: {
        frames: [16, 17, 18, 19],
        step: 0.15,
        loop: true
      },
      attackDown: {
        frames: [20, 21, 22],
        step: 0.1,
        loop: false
      },
      attackUp: {
        frames: [24, 25, 26],
        step: 0.1,
        loop: false
      },
      attackLeft: {
        frames: [28, 29, 30],
        step: 0.1,
        loop: false
      },
      attackRight: {
        frames: [32, 33, 34],
        step: 0.1,
        loop: false
      },
      death: {
        frames: [36, 37, 38],
        step: 0.12,
        loop: false
      }
    }), "idleDown"));

    super.addComponent(new Components.Speed(150));

    super.addComponent(new Components.UserInput());

    super.addComponent(new Components.Direction());

    super.addComponent(new Components.Health());

    super.addComponent(new Components.Attack(50));

    super.addComponent(new Components.Collider(6, 20, 20, 10));
  }
}

module.exports = Player;
