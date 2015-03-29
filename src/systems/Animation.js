import SystemX from "../X/System";
import Vector from "../X/Vector";

export default class Animation extends SystemX {
  constructor(game) {
    super(game);
  }

  update(dt) {
    for(let entity of this.game.world.entities) {
      let ec = entity.components;
      if(ec.animation) {
        if(entity.type === "enemy") {
          if(ec.animation.state === null) {
            ec.animation.state = "idleDown";
          }
          if(ec.health.isAlive && !ec.attack.isAttacking) {
            if(ec.velocity.current.equal(Vector.Zero)) {
              switch(ec.animation.state) {
                case "moveUp":
                  ec.animation.state = "idleUp";
                  break;
                case "moveDown":
                  ec.animation.state = "idleDown";
                  break;
                case "moveLeft":
                  ec.animation.state = "idleLeft";
                  break;
                case "moveRight":
                  ec.animation.state = "idleRight";
                  break;
                case "attackUp":
                  ec.animation.state = "idleUp";
                  break;
                case "attackDown":
                  ec.animation.state = "idleDown";
                  break;
                case "attackLeft":
                  ec.animation.state = "idleLeft";
                  break;
                case "attackRight":
                  ec.animation.state = "idleRight";
                  break;
              }
            } else {
              if(ec.velocity.current.y < 0) {
                ec.animation.state = "moveUp";
              } else if(ec.velocity.current.y > 0) {
                ec.animation.state = "moveDown";
              }

              if(ec.velocity.current.x < 0) {
                ec.animation.state = "moveLeft";
              } else if(ec.velocity.current.x > 0) {
                ec.animation.state = "moveRight";
              }
            }
          } else if(ec.attack.isAttacking) {
            if(ec.animation.state === "idleUp" || ec.animation.state === "moveUp") {
              ec.animation.state = "attackUp";
            } else if(ec.animation.state === "idleDown" || ec.animation.state === "moveDown") {
              ec.animation.state = "attackDown";
            } else if(ec.animation.state === "idleLeft" || ec.animation.state === "moveLeft") {
              ec.animation.state = "attackLeft";
            } else if(ec.animation.state === "idleRight" || ec.animation.state === "moveRight") {
              ec.animation.state = "attackRight";
            }
          } else if(!ec.health.isAlive) {
            ec.animation.state = "death";
          }
        }

        if(entity.type === "player") {
          if(ec.animation.state === null) {
            ec.animation.state = "idleDown";
          }
          if(ec.health.isAlive && !ec.attack.isAttacking) {
            if(ec.velocity.current.equal(Vector.Zero)) {
              switch(ec.animation.state) {
                case "moveUp":
                  ec.animation.state = "idleUp";
                  break;
                case "moveDown":
                  ec.animation.state = "idleDown";
                  break;
                case "moveLeft":
                  ec.animation.state = "idleLeft";
                  break;
                case "moveRight":
                  ec.animation.state = "idleRight";
                  break;
                case "attackUp":
                  ec.animation.state = "idleUp";
                  break;
                case "attackDown":
                  ec.animation.state = "idleDown";
                  break;
                case "attackLeft":
                  ec.animation.state = "idleLeft";
                  break;
                case "attackRight":
                  ec.animation.state = "idleRight";
                  break;
              }
            } else {
              if(ec.velocity.current.y < 0) {
                ec.animation.state = "moveUp";
              } else if(ec.velocity.current.y > 0) {
                ec.animation.state = "moveDown";
              }

              if(ec.velocity.current.x < 0) {
                ec.animation.state = "moveLeft";
              } else if(ec.velocity.current.x > 0) {
                ec.animation.state = "moveRight";
              }
            }
          } else if(ec.attack.isAttacking) {
            if(ec.animation.state === "idleUp" || ec.animation.state === "moveUp") {
              ec.animation.state = "attackUp";
            } else if(ec.animation.state === "idleDown" || ec.animation.state === "moveDown") {
              ec.animation.state = "attackDown";
            } else if(ec.animation.state === "idleLeft" || ec.animation.state === "moveLeft") {
              ec.animation.state = "attackLeft";
            } else if(ec.animation.state === "idleRight" || ec.animation.state === "moveRight") {
              ec.animation.state = "attackRight";
            }
          } else if(!ec.health.isAlive) {
            ec.animation.state = "death";
          }
        }
        ec.animation.anims.setAnim(ec.animation.state);
        ec.animation.anims.getCurrent().update(dt);
      }
    }
  }
}
