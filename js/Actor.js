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
    this.previousPos = new Vector(this.pos.x, this.pos.y);
    this.isAlive = true;
}

Actor.prototype = new Entity();

Actor.prototype.update = function (dt) {
    Entity.prototype.update.call(this, dt);
};

Actor.prototype.draw = function (ctx) {
    Entity.prototype.draw.call(this, ctx);
    this.currentAnim.draw(ctx, this.pos.x, this.pos.y);
};

Actor.prototype.die = function () {
    var deathSound = this.game.assetManager.getSound("sounds/slime_death.wav");
    deathSound.play();
    this.currentAnim = this.anims.getAnim("death");
    this.isAlive = false;
};

Actor.prototype.getCollisionBox = function () {
    return new Rectangle(this.pos.x + this.boundingbox.x, this.pos.y + this.boundingbox.y,
                         this.boundingbox.width, this.boundingbox.height);
};

Actor.prototype.getHitBox = function () {
    return new Rectangle(this.pos.x + this.hitbox.x, this.pos.y + this.hitbox.y,
                         this.hitbox.width, this.hitbox.height);
};

Actor.prototype.updateCollisions = function () {
    var i, entity, collisionBox;
    collisionBox = this.getCollisionBox();

    for (i = 0; i < this.game.entities.length; i += 1) {
        entity = this.game.entities[i];
        if (this !== entity && entity.boundingbox !== null && collisionBox.intersects(entity.getCollisionBox())) {
            this.pos = new Vector(this.previousPos.x, this.previousPos.y);
        }
    }
};

module.exports = Actor;
