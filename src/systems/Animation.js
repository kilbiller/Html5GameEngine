"use strict";

var X = require('../X');

var Animation = function(entities) {
  for( var entity of entities ) {
    if(entity.components.animation) {
      //entity.components.sprite.sprite = entity.components.spriteSheet.spriteSheet.sprite;
    }
  }
};

module.exports = Animation;
