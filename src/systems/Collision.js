"use strict";

var X = require('./../X');

var Collision = function(entities) {
  for(var entity of entities) {
    if(entity.components.collider && entity.components.position) {
      var collisionBox = new X.Rectangle(entity.components.position.x + entity.components.collider.x,
        entity.components.position.y + entity.components.collider.y,
        entity.components.collider.width, entity.components.collider.height);
      for(var entity2 of entities) {
        if(entity2.components.collider && entity.components.position) {
          var collisionBox2 = new X.Rectangle(entity2.components.position.x + entity2.components.collider.x,
            entity2.components.position.y + entity2.components.collider.y,
            entity2.components.collider.width, entity2.components.collider.height);
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
