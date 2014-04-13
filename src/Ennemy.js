"use strict";

var Actor = require('./Actor'),
    SpriteSheet = require('./engine/SpriteSheet'),
    Animations = require('./engine/Animations'),
    Rectangle = require('./engine/Rectangle'),
    Vector = require('./engine/Vector');

function Ennemy(game, x, y, width, height, assetPath) {
    Actor.call(this, game, x, y, width, height, assetPath);

    this.speed = 150;
    this.hp = 30;
    this.boundingbox = new Rectangle(6, 20, 20, 10);

    var spriteSheet = new SpriteSheet(this.assetPath, this.width, this.height);
    this.anims = new Animations(spriteSheet, {
        idle: {
            frames: [0],
            step: 0.15,
            loop: true
        },
        death: {
            frames: [36, 37, 38],
            step: 0.15,
            loop: false
        }
    });
    this.addChild(this.anims);
}

Ennemy.prototype = Object.create(Actor.prototype);

Ennemy.prototype.update = function (dt) {
    if (this.isAlive) {
        this.anims.setAnim("idle");
    }

    this.anims.getCurrent().update(dt);
    this.zIndex = this.y + this.height;
    this.previousPos = new Vector(this.x, this.y);
};

Ennemy.prototype.takeDamage = function (damage) {
    this.hp -= damage;
    if (this.hp <= 0) {this.die(); }
};

module.exports = Ennemy;
