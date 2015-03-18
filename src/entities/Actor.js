"use strict";

var X = require('./../X');

class Actor extends X.Entity {
  constructor(game, x, y, width, height, textureName) {
    super(game, x, y);
    this.width = width;
    this.height = height;
    this.textureName = textureName;

    this.anims = null;
    this.currentAnim = null;
    this.direction = "Down";
    this.hitbox = new X.Rectangle(0, 0, this.width, this.height);
    this.boundingbox = new X.Rectangle(0, 0, this.width, this.height);
    this.previousPos = new X.Vector(this.x, this.y);
    this.isAlive = true;
  }

  update(dt) {
    super.update(dt);
  }

  die() {
    var deathSound = this.game.assetManager.getSound("sounds/slime_death.wav");
    //deathSound.play();
    this.anims.setAnim("death");
    this.isAlive = false;
  }

  getCollisionBox(x=this.x, y=this.y) {
    return new X.Rectangle(this.x + this.boundingbox.x, this.y + this.boundingbox.y,
                           this.boundingbox.width, this.boundingbox.height);
  }

  getHitBox() {
    return new X.Rectangle(this.x + this.hitbox.x, this.y + this.hitbox.y,
                           this.hitbox.width, this.hitbox.height);
  }

  /*updateCollisions() {
    var i, entity, collisionBox;
    collisionBox = this.getCollisionBox();

    for (i = 0; i < this.game.entities.length; i += 1) {
      entity = this.game.entities[i];
      if (this !== entity && entity.boundingbox !== null && collisionBox.intersects(entity.getCollisionBox())) {
        this.x = this.previousPos.x;
        this.y = this.previousPos.y;
      }
    }

    return;
  }*/
}

module.exports = Actor;
