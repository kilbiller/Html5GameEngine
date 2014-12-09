"use strict";

function Entity(game, x, y) {
    this.game = game;
    this.x = x;
    this.y = y;
    this.zIndex = y;
    this.removeFromWorld = false;
}

Entity.prototype.update = function (dt) {};

module.exports = Entity;
