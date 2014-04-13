"use strict";

function Entity(game, x, y) {
    PIXI.DisplayObjectContainer.call(this);
    this.game = game;
    this.x = x;
    this.y = y;
    this.zIndex = y;
    this.removeFromWorld = false;
}

Entity.prototype = Object.create(PIXI.DisplayObjectContainer.prototype);

Entity.prototype.update = function (dt) {};

module.exports = Entity;
