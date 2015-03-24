"use strict";

import SystemX from '../X/System';
import Vector from '../X/Vector';

export default class Movement extends SystemX {
  constructor(game) {
    super(game);
  }

  update(dt) {
    for(var entity of this.game.entities) {
      var ec = entity.components;
      if(ec.position && ec.velocity) {
        ec.velocity.current.norm();
        ec.position.current.add(new Vector(ec.velocity.current.x * ec.velocity.speed * dt, ec.velocity.current.y * ec.velocity.speed * dt));
      }
    }
  }
}
