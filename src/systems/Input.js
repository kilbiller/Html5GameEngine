import SystemX from "../X/System";
import key from "keymaster";
import Vector from "../X/Vector";

export default class Input extends SystemX {
  constructor(game) {
    super(game);
  }

  update(dt) {
    for(let entity of this.game.world.entities) {
      let ec = entity.components;
      if(ec.userInput && ec.position && ec.animation && ec.attack && ec.health && ec.velocity) {
        ec.velocity.current = Vector.Zero;
        if(ec.health.isAlive && !ec.attack.isAttacking) {
          if(key.isPressed("Z")) {
            ec.position.facing = "UP";
            ec.velocity.current.add(Vector.UP);
          } else if(key.isPressed("S")) {
            ec.position.facing = "DOWN";
            ec.velocity.current.add(Vector.DOWN);
          }

          if(key.isPressed("Q")) {
            ec.position.facing = "LEFT";
            ec.velocity.current.add(Vector.LEFT);
          } else if(key.isPressed("D")) {
            ec.position.facing = "RIGHT";
            ec.velocity.current.add(Vector.RIGHT);
          }

          if(ec.attack.canAttack && key.isPressed("space")) {
            ec.attack.isAttacking = true;
            this.game.eventList.emit("AttackLaunched", {
              entity: entity
            });
          }
        }
        ec.velocity.current.norm();
      }
    }
  }
}
