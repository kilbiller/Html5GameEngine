"use strict";

class Entity {
  constructor(game, x, y) {
    this.game = game;
    this.x = x;
    this.y = y;
    this.zIndex = y;
    this.removeFromWorld = false;
  }

  update(dt) {}
}

module.exports = Entity;
