"use strict";

import SystemX from '../X/System';
import key from 'keymaster';
import Vector from '../X/Vector';

export default class Input extends SystemX {
  constructor(game) {
    super(game);
  }

  update(dt) {
    for(var entity of this.game.entities) {
      var ec = entity.components;
      if(ec.userInput && ec.position && ec.animation && ec.direction && ec.attack && ec.health && ec.velocity) {
        ec.velocity.current = new Vector();
        if(ec.health.isAlive && !ec.attack.isAttacking) {
          ec.animation.state = "idle" + ec.direction.value;
          if(key.isPressed("Z")) {
            ec.direction.value = "Up";
            ec.velocity.current.add(Vector.UP);
            ec.animation.state = "move" + ec.direction.value;
          } else if(key.isPressed("S")) {
            ec.direction.value = "Down";
            ec.velocity.current.add(Vector.DOWN);
            ec.animation.state = "move" + ec.direction.value;
          }

          if(key.isPressed("Q")) {
            ec.direction.value = "Left";
            ec.velocity.current.add(Vector.LEFT);
            ec.animation.state = "move" + ec.direction.value;
          } else if(key.isPressed("D")) {
            ec.direction.value = "Right";
            ec.velocity.current.add(Vector.RIGHT);
            ec.animation.state = "move" + ec.direction.value;
          }

          if(ec.attack.canAttack && key.isPressed("space")) {
            ec.attack.isAttacking = true;
          }
        }
      }
    }
  }
}
