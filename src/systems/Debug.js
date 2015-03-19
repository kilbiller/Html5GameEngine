"use strict";

var X = require('./../X');
var PIXI = require('pixi.js');

var Debug = function(entities, dt, game) {
  console.time('debug');
  for( var entity of entities ) {
    if(entity.components.sprite) {

      //game.stage.removeChildren();

      var graphics = new PIXI.Graphics();
      // draw a rectangel
      graphics.lineStyle(2, 0x0000FF, 1);
      graphics.drawRect(entity.components.sprite.sprite.x, entity.components.sprite.sprite.y, entity.components.sprite.sprite.width, entity.components.sprite.sprite.height);

      game.stage.addChild(graphics);
    }
  }
  console.timeEnd('debug');
};

module.exports = Debug;
