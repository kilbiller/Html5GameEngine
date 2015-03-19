"use strict";

var SpritePosition = function(entities, dt, game) {
  console.time('sprite');
  //game.stage.removeChildren();
  for( var entity of entities ) {
    if(entity.components.sprite && entity.components.position) {
      entity.components.sprite.sprite.position.x = entity.components.position.x;
      entity.components.sprite.sprite.position.y = entity.components.position.y;

      entity.components.position.oldX = entity.components.position.x;
      entity.components.position.oldY = entity.components.position.y;

      game.stage.addChild(entity.components.sprite.sprite);
    }
  }

  //TODO ZOrder
  
  //console.timeEnd('sprite');
};

module.exports = SpritePosition;
