import SystemX from "../X/System";
import Vector from "../X/Vector";

export default class Collision extends SystemX {
  constructor(game) {
    super(game);
  }

  update(dt) {
    for(let entity of this.game.world.entities) {
      let ec = entity.components;
      if(ec.collider && ec.position && ec.velocity) {
        let collisionBoxX = ec.collider.bounds.clone().move(ec.position.current.x + (ec.velocity.current.x * ec.velocity.speed * dt), ec.position.current.y);
        let collisionBoxY = ec.collider.bounds.clone().move(ec.position.current.x, ec.position.current.y + (ec.velocity.current.y * ec.velocity.speed * dt));

        // collision with tilemap borders
        if(this.game.world.tilemap.isOutsideMap(collisionBoxX)) {
          ec.velocity.current.x = 0;
        }
        if(this.game.world.tilemap.isOutsideMap(collisionBoxY)) {
          ec.velocity.current.y = 0;
        }

        // collision with tiles
        if(this.game.world.tilemap.isSolidAt(collisionBoxX)) {
          ec.velocity.current.x = 0;
        }
        if(this.game.world.tilemap.isSolidAt(collisionBoxY)) {
          ec.velocity.current.y = 0;
        }

        // collision with other entities
        this.collisionWithEntities(entity, collisionBoxX, collisionBoxY, this.game.world.entities, dt);

      }
    }
  }

  //TODO Fix collision that block you on the side of the object
  collisionWithEntities(entity, rectX, rectY, entities, dt) {
    for(let entity2 of entities) {
      let ec2 = entity2.components;
      if(ec2.collider && ec2.position) {
        let collisionBox2 = ec2.collider.bounds.clone().move(ec2.position.current.x, ec2.position.current.y);
        if(ec2.velocity) {
          collisionBox2 = ec2.collider.bounds.clone().move(ec2.position.current.x + (ec2.velocity.current.x * ec2.velocity.speed * dt),
            ec2.position.current.y + (ec2.velocity.current.y * ec2.velocity.speed * dt));
        }
        if(entity !== entity2) {
          if(rectX.intersects(collisionBox2)) {
            entity.components.velocity.current.x = 0;
          }
          if(rectY.intersects(collisionBox2)) {
            entity.components.velocity.current.y = 0;
          }
        }
      }
    }
  }
}
