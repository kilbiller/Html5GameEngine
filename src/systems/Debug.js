/*jshint -W079 */
"use strict";

var System = require('./System');
var X = require('./../X');
var PIXI = require('pixi.js');

class Debug extends System {
  constructor(game) {
    super(game);
  }

  update(dt) {
    for(var entity of this.game.entities) {
      var ec = entity.components;
      if(ec.sprite) {
        //game.stage.removeChildren();
        var graphics = new PIXI.Graphics();
        graphics.lineStyle(1, 0x0000FF, 1);
        graphics.drawRect(ec.sprite.sprite.x, ec.sprite.sprite.y, ec.sprite.sprite.width, ec.sprite.sprite.height);
        if(ec.collider) {
          graphics.lineStyle(1, 0xFFFFFF, 1);
          graphics.drawRect(ec.sprite.sprite.x + ec.collider.hitbox.x, ec.sprite.sprite.y + ec.collider.hitbox.y, ec.collider.hitbox.width, ec.collider.hitbox.height);
        }
        this.game.stage.addChild(graphics);
      }
    }
  }
}

module.exports = Debug;
