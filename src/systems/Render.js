"use strict";

var System = require('./System');

class Render extends System {
  constructor(game) {
    super(game);
  }

  update(dt) {
    // Z-Order
    this.game.entities.sort(function(a, b) {
      return(a.components.position.current.y + a.components.dimension.height) - (b.components.position.current.y + b.components.dimension.height);
    });
    //game.stage.removeChildren();
    for(var entity of this.game.entities) {
      var ec = entity.components;
      if(ec.sprite && ec.position) {
        // Prevent sub-pixel movements
        ec.position.current.x = Math.round(ec.position.current.x);
        ec.position.current.y = Math.round(ec.position.current.y);

        ec.sprite.sprite.position.x = ec.position.current.x;
        ec.sprite.sprite.position.y = ec.position.current.y;

        // save positions
        ec.position.old.copy(ec.position.current);

        this.game.stage.addChild(ec.sprite.sprite);
      }
    }
  }
}
module.exports = Render;
