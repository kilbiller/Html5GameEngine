"use strict";

import SystemX from '../X/System';
import Vector from '../X/Vector';

export default class AI extends SystemX {
  constructor(game) {
    super(game);
  }

  update(dt) {
    for(var entity of this.game.entities) {
      var ec = entity.components;
      if(entity.type === "enemy" && ec.health.isAlive) {
        var player;
        for(var e of this.game.entities) {
          if(e.type === "player") {
            player = e;
          }
        }
        ec.velocity.current = ec.position.current.getDirection(player.components.position.current);
      }
    }
  }
}
