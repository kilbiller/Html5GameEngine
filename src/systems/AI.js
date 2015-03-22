/*jshint -W079 */
"use strict";

import System from './System';
import X from '../X';

export default class AI extends System {
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
        var dir = ec.position.current.getDirection(player.components.position.current);
        ec.position.current.add(new X.Vector(dir.x * ec.speed.value * dt, dir.y * ec.speed.value * dt));
      }
    }
  }
}
