"use strict";

import SystemX from '../X/System';

export default class Render extends SystemX {
  constructor(game) {
    super(game);
  }

  update(dt) {
    for(var entity of this.game.entities) {
      var ec = entity.components;
      if(ec.sprite && ec.position) {
        // Prevent sub-pixel rendering
        ec.sprite.sprite.position.x = Math.round(ec.position.current.x);
        ec.sprite.sprite.position.y = Math.round(ec.position.current.y);
      }
    }
    // Z-Order
    this.game.stage.children.sort(function(a, b) {
      return(a.y + a.height) - (b.y + b.height);
    });
  }
}
