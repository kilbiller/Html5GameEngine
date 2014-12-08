"use strict";

var Entity = require('./engine/Entity'),
    SpriteSheet = require('./engine/SpriteSheet'),
    Animations = require('./engine/Animations'),
    Rectangle = require('./engine/Rectangle');

function StaticObject(game, x, y, width, height, texture) {
    Entity.call(this, game, x, y);
    this.width = width;
    this.height = height;
    this.texture = texture;
    this.anims = null;
    this.currentAnim = null;
    this.boundingbox = new Rectangle(0, 0, this.width, this.height);
    this.zIndex = this.y + this.height;

    this.sprite = new PIXI.Sprite(this.texture);
    this.game.stage.addChild(this.sprite);

    var spriteSheet = new SpriteSheet(this.sprite, this.width, this.height);
    this.anims = new Animations(spriteSheet, {
        idle: {
            frames: [0],
            step: 0.15,
            loop: true
        }
    });
}

StaticObject.prototype = Object.create(Entity.prototype);

StaticObject.prototype.update = function (dt) {
    this.anims.setAnim("idle");

    this.sprite.position.x = this.x;
    this.sprite.position.y = this.y;

    this.anims.getCurrent().update(dt);
};

StaticObject.prototype.getCollisionBox = function () {
    return new Rectangle(this.x + this.boundingbox.x, this.y + this.boundingbox.y,
                         this.boundingbox.width, this.boundingbox.height);
};

module.exports = StaticObject;
