"use strict";

var X = require('./../X');

var Attack = function(entities, dt, game) {
  for( var entity of entities ) {

    if(entity.components.attack && entity.components.direction && entity.components.position && entity.components.animation) {

      if(entity.components.attack.isAttacking && entity.components.attack.canAttack) {
        var punchSound = game.assetManager.getSound("assets/sounds/punch.wav");
        punchSound.play();

        entity.components.attack.canAttack = false;
        entity.components.attack.cooldown = 0.5;

        var attackRect;
        if (entity.components.direction.value === "Up") {
          attackRect = new X.Rectangle(entity.components.position.x + 12, entity.components.position.y - 1, 10, 1);
          entity.components.animation.state = "attackUp";
        } else if (entity.components.direction.value === "Down") {
          attackRect = new X.Rectangle(entity.components.position.x + 8, entity.components.position.y + 18, 20, 12);
          entity.components.animation.state = "attackDown";
        } else if (entity.components.direction.value === "Left") {
          attackRect = new X.Rectangle(entity.components.position.x - 4, entity.components.position.y + 13, 25, 12);
          entity.components.animation.state = "attackLeft";
        } else if (entity.components.direction.value === "Right") {
          attackRect = new X.Rectangle(entity.components.position.x + 8, entity.components.position.y + 13, 25, 12);
          entity.components.animation.state = "attackRight";
        }

        for (var entity2 of entities) {
          if(entity2.components.health) {
            // TODO better hitbox
            var opponentHitbox = new X.Rectangle( entity2.components.position.x, entity2.components.position.y,
                                                 entity2.components.dimension.width, entity2.components.dimension.height);
            if (entity !== entity2 && entity2.components.health.hp > 0 && attackRect.intersects(opponentHitbox)) {
              entity2.components.health.hp -= entity.components.attack.damage;
              if (entity2.components.health.hp <= 0) {
                // TODO find other sound
                //var deathSound = game.assetManager.getSound("assets/sounds/slime_death.wav");
                //deathSound.play();
                entity2.components.animation.state = "death";
                entity2.components.health.isAlive = false;
              }
            }
          }
        }
      }

      //-------------------------------------------------------------
      // If player has finished his attack.
      if (entity.components.attack.isAttacking && entity.components.animation.anims.getCurrent().isDone()) {
        entity.components.attack.isAttacking = false;
        entity.components.attack.canAttack = true;

        //TODO find a way to remove this shit (via improving X.Animation)
        entity.components.animation.anims.getCurrent().reset();
      }

      //-------------------------------------------------------------
      if (entity.components.attack.cooldown > 0) {
        entity.components.attack.cooldown -= dt;
      }
    }
  }
};

module.exports = Attack;
