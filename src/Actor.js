"use strict";

var Entity = require('./engine/Entity'),
    Rectangle = require('./engine/Rectangle'),
    Vector = require('./engine/Vector');

function Actor(game, x, y, width, height, assetPath) {
    Entity.call(this, game, x, y);
    this.width = width;
    this.height = height;
    this.assetPath = assetPath;

    this.anims = null;
    this.currentAnim = null;
    this.direction = "Down";
    this.hitbox = new Rectangle(0, 0, this.width, this.height);
    this.boundingbox = new Rectangle(0, 0, this.width, this.height);
    this.previousPos = new Vector(this.x, this.y);
    this.isAlive = true;
}

Actor.prototype = Object.create(Entity.prototype);

Actor.prototype.update = function (dt) {
    Entity.prototype.update.call(this, dt);
};

Actor.prototype.die = function () {
    var deathSound = this.game.assetManager.getSound("sounds/slime_death.wav");
    //deathSound.play();
    this.anims.setAnim("death");
    this.isAlive = false;
};

Actor.prototype.getCollisionBox = function () {
    return new Rectangle(this.x + this.boundingbox.x, this.y + this.boundingbox.y,
                         this.boundingbox.width, this.boundingbox.height);
};

Actor.prototype.getHitBox = function () {
    return new Rectangle(this.x + this.hitbox.x, this.y + this.hitbox.y,
                         this.hitbox.width, this.hitbox.height);
};

Actor.prototype.updateCollisions = function () {
    var i, entity, collisionBox;
    collisionBox = this.getCollisionBox();

    for (i = 0; i < this.game.entities.children.length; i += 1) {
        entity = this.game.entities.children[i];
        if (this !== entity && entity.boundingbox !== null && collisionBox.intersects(entity.getCollisionBox())) {
            this.x = this.previousPos.x;
            this.y = this.previousPos.y;
        }
    }
};

module.exports = Actor;
