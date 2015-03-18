"use strict";

var X = require('./../X');

// TODO: Use masks for collisions

var Collision = function(entities) {
  for( var entity of entities ) {
    if(entity.components.sprite && entity.components.position && entity.components.dimension) {
      var collisionBox = new X.Rectangle( entity.components.position.x, entity.components.position.y,
                                          entity.components.dimension.width, entity.components.dimension.height);
      for(var entity2 of entities) {
        if(entity2.components.sprite && entity2.components.position && entity2.components.dimension) {
          var collisionBox2 = new X.Rectangle( entity2.components.position.x, entity2.components.position.y,
                                               entity2.components.dimension.width, entity2.components.dimension.height);
          if(entity !== entity2 && collisionBox.intersects(collisionBox2)) {
            entity.components.position.x = entity.components.position.oldX;
            entity.components.position.y = entity.components.position.oldY;
          }
        }
      }
    }
  }
};

module.exports = Collision;
