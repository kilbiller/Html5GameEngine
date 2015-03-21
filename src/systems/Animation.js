"use strict";

var X = require('../X');

var Animation = function(entities, dt) {
  for(var entity of entities) {
    if(entity.components.animation) {

      entity.components.animation.anims.setAnim(entity.components.animation.state);
      entity.components.animation.anims.getCurrent().update(dt);
    }
  }
};

module.exports = Animation;
