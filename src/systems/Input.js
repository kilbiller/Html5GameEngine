"use strict";

var System = require('./System');
var key = require('keymaster');

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
          if(key.isPressed("Z")) {
            ec.direction.value = "Up";
            ec.position.current.y -= ec.speed.value * dt;
            ec.animation.state = "move" + ec.direction.value;
          }
          if(key.isPressed("S")) {
            ec.direction.value = "Down";
            ec.position.current.y += ec.speed.value * dt;
            ec.animation.state = "move" + ec.direction.value;
          }
          if(key.isPressed("Q")) {
            ec.direction.value = "Left";
            ec.position.current.x -= ec.speed.value * dt;
            ec.animation.state = "move" + ec.direction.value;
          }
          if(key.isPressed("D")) {
            ec.direction.value = "Right";
            ec.position.current.x += ec.speed.value * dt;
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

module.exports = Input;
