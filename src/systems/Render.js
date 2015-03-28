"use strict";

import SystemX from '../X/System';

export default class Render extends SystemX {
  constructor(game) {
    super(game);
  }

  update(dt) {
    for(let entity of this.game.entities) {
      let ec = entity.components;
      if(ec.sprite && ec.position) {
        // Prevent sub-pixel rendering
        ec.sprite.sprite.x = Math.round(ec.position.current.x);
        ec.sprite.sprite.y = Math.round(ec.position.current.y);

        ec.sprite.sprite.zOrder = ec.sprite.sprite.y + ec.sprite.sprite.height;
        if(ec.health && !ec.health.isAlive) {
          ec.sprite.sprite.zOrder -= 10;
        }
      }
    }
    // Z-Order
    this.game.world.children.sort(function(a, b) {
      return a.zOrder - b.zOrder;
    });
  }
}
