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
        var collisionBox = ec.collider.bounds.clone().move(ec.position.current.x, ec.position.current.y);
        for(var entity2 of this.game.entities) {
          var ec2 = entity2.components;
          if(ec2.collider && ec2.position) {
            var collisionBox2 = ec2.collider.bounds.clone().move(ec2.position.current.x, ec2.position.current.y);
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
