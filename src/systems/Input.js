"use strict";

var key = require('keymaster');

var Input = function(entities, dt) {
  for(var entity of entities) {
    if(entity.components.userInput && entity.components.position && entity.components.speed && entity.components.animation && entity.components.direction &&
      entity.components.attack && entity.components.health) {

      if(entity.components.health.isAlive && !entity.components.attack.isAttacking) {
        entity.components.animation.state = "idle" + entity.components.direction.value;
        if(key.isPressed("Z")) {
          entity.components.direction.value = "Up";
          entity.components.position.y -= entity.components.speed.value * dt;
          entity.components.animation.state = "move" + entity.components.direction.value;
        }
        if(key.isPressed("S")) {
          entity.components.direction.value = "Down";
          entity.components.position.y += entity.components.speed.value * dt;
          entity.components.animation.state = "move" + entity.components.direction.value;
        }
        if(key.isPressed("Q")) {
          entity.components.direction.value = "Left";
          entity.components.position.x -= entity.components.speed.value * dt;
          entity.components.animation.state = "move" + entity.components.direction.value;
        }
        if(key.isPressed("D")) {
          entity.components.direction.value = "Right";
          entity.components.position.x += entity.components.speed.value * dt;
          entity.components.animation.state = "move" + entity.components.direction.value;
        }

        // Prevent sub-pixel movements
        entity.components.position.x = Math.round(entity.components.position.x);
        entity.components.position.y = Math.round(entity.components.position.y);

        // TODO maybe move cooldown to attack system and use canAttack instead
        // Player attack if press space
        if(entity.components.attack.cooldown <= 0 && key.isPressed("space")) {
          entity.components.attack.isAttacking = true;
        }
      }
    }
  }
};

module.exports = Input;
