/*jshint -W079 */
"use strict";

var System = require('./System');
var key = require('keymaster');
var X = require('../X');

class Input extends System {
  constructor(game) {
    super(game);
  }

  update(dt) {
    for(var entity of this.game.entities) {
      var ec = entity.components;
      if(ec.userInput && ec.position && ec.speed && ec.animation && ec.direction && ec.attack && ec.health) {

        if(ec.health.isAlive && !ec.attack.isAttacking) {
          ec.animation.state = "idle" + ec.direction.value;
          var dir = new X.Vector();
          if(key.isPressed("Z")) {
            ec.direction.value = "Up";
            dir.add(X.Vector.UP);
            ec.animation.state = "move" + ec.direction.value;
          } else if(key.isPressed("S")) {
            ec.direction.value = "Down";
            dir.add(X.Vector.DOWN);
            ec.animation.state = "move" + ec.direction.value;
          }

          if(key.isPressed("Q")) {
            ec.direction.value = "Left";
            dir.add(X.Vector.LEFT);
            ec.animation.state = "move" + ec.direction.value;
          } else if(key.isPressed("D")) {
            ec.direction.value = "Right";
            dir.add(X.Vector.RIGHT);
            ec.animation.state = "move" + ec.direction.value;
          }

          dir.norm();
          ec.position.current.add(new X.Vector(dir.x * ec.speed.value * dt, dir.y * ec.speed.value * dt));

          if(ec.attack.canAttack && key.isPressed("space")) {
            ec.attack.isAttacking = true;
          }
        }
      }
    }
  }
}

module.exports = Input;
