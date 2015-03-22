/*jshint -W079 */
"use strict";

var System = require('./System');
var X = require('./../X');

class Attack extends System {
  constructor(game) {
    super(game);
  }

  update(dt) {
    for(var entity of this.game.entities) {
      var ec = entity.components;
      if(ec.attack && ec.direction && ec.position && ec.animation) {

        if(ec.attack.isAttacking && ec.attack.canAttack) {
          var punchSound = this.game.assetManager.getSound("punch");
          punchSound.play();

          ec.attack.canAttack = false;
          ec.attack.cooldown = ec.attack.COOLDOWN_TIME;

          var attackRect;
          if(ec.direction.value === "Up") {
            attackRect = new X.Rectangle(ec.position.current.x + 12, ec.position.current.y - 1, 10, 1);
            ec.animation.state = "attackUp";
          } else if(ec.direction.value === "Down") {
            attackRect = new X.Rectangle(ec.position.current.x + 8, ec.position.current.y + 18, 20, 12);
            ec.animation.state = "attackDown";
          } else if(ec.direction.value === "Left") {
            attackRect = new X.Rectangle(ec.position.current.x - 4, ec.position.current.y + 13, 25, 12);
            ec.animation.state = "attackLeft";
          } else if(ec.direction.value === "Right") {
            attackRect = new X.Rectangle(ec.position.current.x + 8, ec.position.current.y + 13, 25, 12);
            ec.animation.state = "attackRight";
          }

          for(var entity2 of this.game.entities) {
            var ec2 = entity2.components;
            if(ec2.health) {
              // TODO better hitbox
              var opponentHitbox = new X.Rectangle(ec2.position.current.x, ec2.position.current.y, ec2.dimension.width, ec2.dimension.height);
              if(entity !== entity2 && ec2.health.hp > 0 && attackRect.intersects(opponentHitbox)) {
                ec2.health.hp -= ec.attack.damage;
                if(ec2.health.hp <= 0) {
                  // TODO find other sound
                  //var deathSound = game.assetManager.getSound("assets/sounds/slime_death.wav");
                  //deathSound.play();
                  ec2.animation.state = "death";
                  ec2.health.isAlive = false;
                  entity2.removeComponent("collider");
                }
              }
            }
          }
        }

        //-------------------------------------------------------------
        // If player has finished his attack.
        if(ec.attack.isAttacking && ec.animation.anims.getCurrent().isDone()) {
          ec.attack.isAttacking = false;

          //TODO find a way to remove this shit (via improving X.Animation)
          ec.animation.anims.getCurrent().reset();
        }

        //-------------------------------------------------------------
        // Lower cooldown
        if(ec.attack.cooldown > 0) {
          ec.attack.cooldown -= dt;
        } else {
          ec.attack.canAttack = true;
        }
      }
    }
  }
}

module.exports = Attack;
