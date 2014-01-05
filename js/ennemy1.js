/*global define*/
define(function (require) {

    "use strict";
    var Actor = require('Actor'),
        SpriteSheet = require('engine/SpriteSheet'),
        Animations = require('engine/Animations'),
        Rectangle = require('engine/Rectangle'),
        Vector = require('engine/Vector');

    function Ennemy(game, x, y, width, height, assetPath) {
        Actor.call(this, game, x, y, width, height, assetPath);

        this.speed = 150;
        this.hp = 30;
        this.boundingbox = new Rectangle(6, 20, 20, 10);
    }

    Ennemy.prototype = new Actor();
    Ennemy.prototype.constructor = Ennemy;

    Ennemy.prototype.loadContent = function (assetManager) {
        var spriteSheet = new SpriteSheet(assetManager.getAsset(this.assetPath), this.width, this.height);
        this.anims = new Animations(spriteSheet, {
            idle: {
                frames: [0],
                step: 0.15,
                loop: false
            },
            death: {
                frames: [36, 37, 38],
                step: 0.15,
                loop: false
            }
        });
    };

    Ennemy.prototype.update = function (dt) {
        Actor.prototype.update.call(this, dt);

        if (this.isAlive) {
            this.currentAnim = this.anims.getAnim("idle");
        }

        this.currentAnim.update(dt);
        this.zIndex = this.pos.y + this.height;
        this.previousPos = new Vector(this.pos.x, this.pos.y);
    };

    Ennemy.prototype.draw = function (ctx) {
        Actor.prototype.draw.call(this, ctx);

        this.getHitBox().draw(ctx);
        this.getCollisionBox().draw(ctx);
    };

    Ennemy.prototype.takeDamage = function (damage) {
        this.hp -= damage;
        if (this.hp <= 0) {this.die(); }
    };

    return Ennemy;
});
