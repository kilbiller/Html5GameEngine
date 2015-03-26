"use strict";

import SystemX from '../X/System';
import Vector from '../X/Vector';

export default class AI extends SystemX {
  constructor(game) {
    super(game);
    this.timer = 0;
    this.dir = 0;
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
        if(this.timer > 0.1) {
          //TODO les positions ne sont pas actualisées PENSE Y

          var distanceX = (player.components.position.current.x + player.components.dimension.width / 2) - (ec.position.current.x + ec.dimension.width / 2);
          var distanceY = (player.components.position.current.y + player.components.dimension.height / 2) - (ec.position.current.y + ec.dimension.height / 2);

          if(Math.abs(distanceX) > Math.abs(distanceY)) {
            ec.velocity.current = new Vector(distanceX, 0);
          } else {
            ec.velocity.current = new Vector(0, distanceY);
          }
          ec.velocity.current.norm();

          //var playerDir = ec.position.current.getDirection(player.components.position.current);
          /*ec.velocity.current.copy(playerDir);
          ec.velocity.current.norm();*/

          /*if(this.dir > 0) {
            ec.velocity.current.x = 0;
            this.dir--;
          } else {
            ec.velocity.current.y = 0;
            this.dir++;
          }
          ec.velocity.current.norm();*/

          // update directions
          if(ec.velocity.current.y < 0) {
            ec.direction.value = "Up";
          } else if(ec.velocity.current.y > 0) {
            ec.direction.value = "Down";
          }
          if(ec.velocity.current.x < 0) {
            ec.direction.value = "Left";
          } else if(ec.velocity.current.x > 0) {
            ec.direction.value = "Right";
          }

          //if the player is in range
          if(Math.abs(distanceX) < 25 && Math.abs(distanceY) < 20 /*Vector.euclidianDistance(ec.position.current, player.components.position.current) < 35*/ ) {
            if(ec.attack.canAttack && player.components.health.isAlive) {
              ec.attack.isAttacking = true;
            }
            ec.velocity.current = Vector.Zero;
          }

          this.timer = 0;
        }
      }
    }
  }
}
