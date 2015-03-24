"use strict";

import SystemX from '../X/System';
import Vector from '../X/Vector';

export default class Collision extends SystemX {
  constructor(game) {
    super(game);
  }

  //TODO Fix collision that block you on the side of the object

  update(dt) {
    for(let entity of this.game.entities) {
      let ec = entity.components;
      if(ec.collider && ec.position && ec.velocity) {
        let collisionBoxX = ec.collider.bounds.clone().move(ec.position.current.x + (ec.velocity.current.x * ec.velocity.speed * dt), ec.position.current.y);
        let collisionBoxY = ec.collider.bounds.clone().move(ec.position.current.x, ec.position.current.y + (ec.velocity.current.y * ec.velocity.speed * dt));
        for(let entity2 of this.game.entities) {
          let ec2 = entity2.components;
          if(ec2.collider && ec2.position) {
            let collisionBox2 = ec2.collider.bounds.clone().move(ec2.position.current.x, ec2.position.current.y);
            if(ec2.velocity) {
              collisionBox2 = ec2.collider.bounds.clone().move(ec2.position.current.x + (ec2.velocity.current.x * ec2.velocity.speed * dt),
                ec2.position.current.y + (ec2.velocity.current.y * ec2.velocity.speed * dt));
            }
            if(entity !== entity2) {
              if(collisionBoxX.intersects(collisionBox2)) {
                ec.velocity.current.x = 0;
              }
              if(collisionBoxY.intersects(collisionBox2)) {
                ec.velocity.current.y = 0;
              }
              //var repelVector = this.intersectionRepelVector(collisionBox2, collisionBox);
              //ec.position.current.add(new Vector((repelVector.x * ec.velocity.current.x) * ec.velocity.speed * dt, (repelVector.y * ec.velocity.current.y) * ec.velocity.speed * dt));*/
              //ec.position.current.add(this.intersectionRepelVector(collisionBox, collisionBox2));
              /*ec.position.current.sub(new Vector(ec.velocity.current.x * ec.velocity.speed * dt, ec.velocity.current.y * ec.velocity.speed * dt));
              ec2.position.current.sub(new Vector(ec2.velocity.current.x * ec2.velocity.speed * dt, ec2.velocity.current.y * ec2.velocity.speed * dt));*/
              //console.log(ec.collider.bounds.clone().move(ec.position.current.x, ec.position.current.y).intersects(collisionBox2));
            }
          }
        }
      }
    }
  }

  intersectionRepelVector(thisRect, otherRect) {

    var x1 = Math.abs(thisRect.Right - otherRect.Left);
    var x2 = Math.abs(thisRect.Left - otherRect.Right);
    var y1 = Math.abs(thisRect.Bottom - otherRect.Top);
    var y2 = Math.abs(thisRect.Top - otherRect.Bottom);

    var x, y;
    var xDirection, yDirection;
    // calculate displacement along X-axis
    if(x1 < x2) {
      x = x1;
      xDirection = -1; //DirectionX.Left;
    } else if(x1 > x2) {
      x = x2;
      xDirection = 1; //DirectionX.Right;
    }
    // calculate displacement along Y-axis
    if(y1 < y2) {
      y = y1;
      yDirection = -1; //DirectionY.Up;
    } else if(y1 > y2) {
      y = y2;
      yDirection = 1; //DirectionY.Down;
    }

    x += 0.1;
    y += 0.1;

    if(Math.abs(x) < Math.abs(y)) {
      return new Vector( /*x **/ xDirection, 0);
    } else if(Math.abs(y) < Math.abs(x)) {
      return new Vector(0, /*y **/ yDirection);
    } else {
      return new Vector( /*x **/ xDirection, /*y * */ yDirection);
    }

    //figure out if we're moving forward or going backward on both axes
    //var signX = thisRect.Right > otherRect.Right ? -1 : 1;
    //var signY = thisRect.Top > otherRect.Top ? -1 : 1;

    //subtract the leftmost edge from the rightmost edge to get the width
    //var width = Math.min(thisRect.Right, otherRect.Right) - Math.max(thisRect.Left, otherRect.Left);
    //subtract the topmost edge from the bottommost edge to get the height
    //var height = Math.min(thisRect.Bottom, otherRect.Bottom) - Math.max(thisRect.Top, otherRect.Top);

    //if width is less than the height, return a vector with just the width
    //if height is less than the width, return a vector with just the height
    //if they are exactly the same, then return a vector with both of them
    /*if(Math.abs(width) < Math.abs(height)) {
      return new Vector(width * signX, 0);
    } else if(Math.abs(height) < Math.abs(width)) {
      return new Vector(0, height * signY);
    } else {
      return new Vector(width * signX, height * signY);
    }*/

    /*if(Math.abs(width) < Math.abs(height)) {
      return new Vector(signX, 0);
    } else if(Math.abs(height) < Math.abs(width)) {
      return new Vector(0, signY);
    } else {
      return new Vector(signX, signY);
    }*/
  }
}
