"use strict";

var X = require('./../X');
var PIXI = require('pixi.js');

var Debug = function(entities, dt, game) {
  //console.time('debug');
  for( var entity of entities ) {
    if(entity.components.sprite) {
      //game.stage.removeChildren();
      var graphics = new PIXI.Graphics();
      graphics.lineStyle(1, 0x0000FF, 1);
      graphics.drawRect(entity.components.sprite.sprite.x, entity.components.sprite.sprite.y, entity.components.sprite.sprite.width, entity.components.sprite.sprite.height);
      if(entity.components.collider) {
        graphics.lineStyle(1, 0xFFFFFF, 1);
        graphics.drawRect(entity.components.sprite.sprite.x + entity.components.collider.hitbox.x,
                          entity.components.sprite.sprite.y + entity.components.collider.hitbox.y,
                          entity.components.collider.hitbox.width,
                          entity.components.collider.hitbox.height);
      }
      game.stage.addChild(graphics);
    }
  }
  //console.timeEnd('debug');
};

module.exports = Debug;
