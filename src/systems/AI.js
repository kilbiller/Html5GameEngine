import SystemX from "../X/System";
import Vector from "../X/Vector";

export default class AI extends SystemX {
  constructor(game) {
    super(game);
    this.timer = 0;
    this.resetTimer = false;
  }

  update(dt) {
    this.timer += dt;
    for(let entity of this.game.world.entities) {
      let ec = entity.components;
      if(entity.type === "enemy" && ec.health.isAlive) {

        if(this.timer > 0.4) {

          if(ec.target) {
            // set target.entity
            if(ec.target.entity === null) {
              for(let e of this.game.world.entities) {
                if(ec.target.type === e.type) {
                  ec.target.entity = e;
                  break;
                }
              }
            }

            //TODO les positions ne sont pas actualisées PENSE Y
            let distanceX = (ec.target.entity.components.position.current.x + ec.target.entity.components.dimension.width / 2) - (ec.position.current.x + ec.dimension.width / 2);
            let distanceY = (ec.target.entity.components.position.current.y + ec.target.entity.components.dimension.height / 2) - (ec.position.current.y + ec.dimension.height / 2);

            // acquire target
            if(Math.abs(distanceX) < ec.target.range && Math.abs(distanceY) < ec.target.range) {
              ec.target.isAcquired = true;
            }

            // if target has been acquired
            // follow it
            if(ec.target.isAcquired) {
              if(Math.abs(distanceX) > Math.abs(distanceY)) {
                ec.velocity.current = new Vector(distanceX, 0);
              } else {
                ec.velocity.current = new Vector(0, distanceY);
              }
              ec.velocity.current.norm();
            } else {
              // else move (or don't) randomly
              let random = Math.floor(Math.random() * (5 - 0) + 0);
              if(random === 0) {
                ec.velocity.current = Vector.Zero;
              } else if(random === 1) {
                ec.velocity.current = Vector.UP;
              } else if(random === 2) {
                ec.velocity.current = Vector.DOWN;
              } else if(random === 3) {
                ec.velocity.current = Vector.LEFT;
              } else if(random === 4) {
                ec.velocity.current = Vector.RIGHT;
              }
            }

            // update directions
            if(ec.velocity.current.y < 0) {
              ec.position.facing = "UP";
            } else if(ec.velocity.current.y > 0) {
              ec.position.facing = "DOWN";
            }
            if(ec.velocity.current.x < 0) {
              ec.position.facing = "LEFT";
            } else if(ec.velocity.current.x > 0) {
              ec.position.facing = "RIGHT";
            }

            //if the player is in range
            if(Math.abs(distanceX) < 25 && Math.abs(distanceY) < 20) {
              if(ec.target.entity.components.health.isAlive) {
                if(ec.attack.canAttack) {
                  ec.attack.isAttacking = true;
                  this.game.eventList.dispatch("AttackLaunched", {
                    entity: entity
                  });
                }
                ec.velocity.current = Vector.Zero;
              }
            }

            this.resetTimer = true;
          }
        }
      }
    }

    if(this.resetTimer) {
      this.timer = 0;
      this.resetTimer = false;
    }
  }
}
