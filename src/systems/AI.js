"use strict";

import SystemX from '../X/System';
import Vector from '../X/Vector';

export default class AI extends SystemX {
  constructor(game) {
    super(game);
    this.timer = 0;
    this.previousVel = new Vector();
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
        this.timer += dt;
        if(this.timer > 0.4) {
          ec.velocity.current = ec.position.current.getDirection(player.components.position.current);
          ec.velocity.current.norm();

          /*var random = Math.floor(Math.random() * (2 - 0) - 0);
          if(random === 1) {
            ec.velocity.current.x = 0;
          } else {
            ec.velocity.current.y = 0;
          }*/

          if(Math.abs(this.previousVel.x) > 0) {
            ec.velocity.current.x = 0;
          } else {
            ec.velocity.current.y = 0;
          }
          ec.velocity.current.norm();

          this.previousVel.copy(ec.velocity.current);
          this.timer = 0;
        }
      }
    }
  }
}
