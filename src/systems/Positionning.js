"use strict";

var Positionning = function(entities) {
  for( var entity of entities ) {
    if(entity.components.sprite && entity.components.position) {
      entity.components.sprite.sprite.position.x = entity.components.position.x;
      entity.components.sprite.sprite.position.y = entity.components.position.y;
    }
  }
};

module.exports = Positionning;
