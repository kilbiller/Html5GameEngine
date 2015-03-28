"use strict";

import SystemX from '../X/System';
import Rectangle from '../X/Rectangle';

export default class Attack extends SystemX {
  constructor(game) {
    super(game);
  }

  update(dt) {
    for(let entity of this.game.entities) {
      let ec = entity.components;
      if(ec.attack && ec.position && ec.animation) {

        if(ec.attack.isAttacking && ec.attack.canAttack) {
          let punchSound = this.game.assetManager.getSound("punch");
          punchSound.play();

          ec.attack.canAttack = false;
          ec.attack.cooldown = ec.attack.COOLDOWN_TIME;

          let attackRect;
          if(ec.position.facing === "UP") {
            attackRect = new Rectangle(ec.position.current.x + 12, ec.position.current.y - 1, 10, 1);
          } else if(ec.position.facing === "DOWN") {
            attackRect = new Rectangle(ec.position.current.x + 8, ec.position.current.y + 18, 20, 12);
          } else if(ec.position.facing === "LEFT") {
            attackRect = new Rectangle(ec.position.current.x - 4, ec.position.current.y + 13, 25, 12);
          } else if(ec.position.facing === "RIGHT") {
            attackRect = new Rectangle(ec.position.current.x + 8, ec.position.current.y + 13, 25, 12);
          }

          for(let entity2 of this.game.entities) {
            let ec2 = entity2.components;
            if(ec2.health) {
              // TODO better hitbox
              let opponentHitbox = new Rectangle(ec2.position.current.x, ec2.position.current.y, ec2.dimension.width, ec2.dimension.height);
              if(entity !== entity2 && ec2.health.hp > 0 && attackRect.intersects(opponentHitbox)) {
                ec2.health.hp -= ec.attack.damage;
                if(ec2.health.hp <= 0) {
                  // TODO find other sound
                  //let deathSound = game.assetManager.getSound("assets/sounds/slime_death.wav");
                  //deathSound.play();
                  ec2.health.isAlive = false;
                  entity2.removeComponent("velocity");
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
