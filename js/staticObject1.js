/*global define*/
define(function (require) {

    "use strict";
    var Entity = require('engine/Entity'),
        SpriteSheet = require('engine/SpriteSheet'),
        Animations = require('engine/Animations'),
        Rectangle = require('engine/Rectangle');

    function StaticObject(game, x, y, width, height, assetPath) {
        Entity.call(this, game, x, y);
        this.width = width;
        this.height = height;
        this.assetPath = assetPath;
        this.anims = null;
        this.currentAnim = null;
        this.boundingbox = new Rectangle(0, 0, this.width, this.height);
        this.zIndex = this.pos.y + this.height;
    }

    StaticObject.prototype = new Entity();
    StaticObject.prototype.constructor = StaticObject;

    StaticObject.prototype.loadContent = function (assetManager) {
        var spriteSheet = new SpriteSheet(assetManager.getAsset(this.assetPath), this.width, this.height);
        this.anims = new Animations(spriteSheet, {
            idle: {
                frames: [0],
                step: 0.15,
                loop: false
            }
        });
    };

    StaticObject.prototype.update = function (dt) {
        Entity.prototype.update.call(this, dt);
        this.currentAnim = this.anims.getAnim("idle");
        this.currentAnim.update(dt);
    };

    StaticObject.prototype.draw = function (ctx) {
        Entity.prototype.draw.call(this, ctx);
        this.currentAnim.draw(ctx, this.pos.x, this.pos.y);

        if (this.boundingbox !== null) {this.getCollisionBox().draw(ctx); }
    };

    StaticObject.prototype.getCollisionBox = function () {
        return new Rectangle(this.pos.x + this.boundingbox.x, this.pos.y + this.boundingbox.y,
                             this.boundingbox.width, this.boundingbox.height);
    };

    return StaticObject;
});
