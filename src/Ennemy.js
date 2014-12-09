"use strict";

var Actor = require('./Actor');
var SpriteSheet = require('./engine/SpriteSheet');
var Animations = require('./engine/Animations');
var Rectangle = require('./engine/Rectangle');
var Vector = require('./engine/Vector');
var PIXI = require('pixi.js');

function Ennemy(game, x, y, width, height, texture) {
    Actor.call(this, game, x, y, width, height, texture);

    this.speed = 150;
    this.hp = 30;
    this.boundingbox = new Rectangle(6, 20, 20, 10);

    this.sprite = new PIXI.Sprite(this.texture);
    this.game.stage.addChild(this.sprite);

    var spriteSheet = new SpriteSheet(this.sprite, this.width, this.height);
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
}

Ennemy.prototype = Object.create(Actor.prototype);

Ennemy.prototype.update = function (dt) {
    if (this.isAlive) {
        this.anims.setAnim("idle");
    }

    this.sprite.position.x = this.x;
    this.sprite.position.y = this.y;

    this.anims.getCurrent().update(dt);
    this.zIndex = this.y + this.height;
    this.previousPos = new Vector(this.x, this.y);
};

Ennemy.prototype.takeDamage = function (damage) {
    this.hp -= damage;
    if (this.hp <= 0) {this.die(); }
};

module.exports = Ennemy;
