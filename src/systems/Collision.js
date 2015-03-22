/*jshint -W079 */
"use strict";

var System = require('./System');
var X = require('./../X');

class Collision extends System {
  constructor(game) {
    super(game);
  }

  //TODO Fix collision that block you on the side of the object

  update(dt) {
    for(var entity of this.game.entities) {
      var ec = entity.components;
      if(ec.collider && ec.position) {
        var collisionBox = new X.Rectangle(ec.position.current.x + ec.collider.x, ec.position.current.y + ec.collider.y, ec.collider.width, ec.collider.height);
        for(var entity2 of this.game.entities) {
          var ec2 = entity2.components;
          if(ec2.collider && ec.position) {
            var collisionBox2 = new X.Rectangle(ec2.position.current.x + ec2.collider.x, ec2.position.current.y + ec2.collider.y, ec2.collider.width, ec2.collider.height);
            if(entity !== entity2 && collisionBox.intersects(collisionBox2)) {
              ec.position.current.copy(ec.position.old);
            }
          }
        }
      }
    }
  }
}

module.exports = Collision;
