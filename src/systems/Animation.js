"use strict";

var System = require('./System');
var X = require('../X');

class Animation extends System {
  constructor(game) {
    super(game);
  }

  update(dt) {
    for(var entity of this.game.entities) {
      var ec = entity.components;
      if(ec.animation && ec.position && ec.direction) {
        /*ec.animation.state = "idle" + ec.direction.value;
        if(ec.position.y < ec.position.oldY)*/

        ec.animation.anims.setAnim(ec.animation.state);
        ec.animation.anims.getCurrent().update(dt);
      }
    }
  }
}

module.exports = Animation;
