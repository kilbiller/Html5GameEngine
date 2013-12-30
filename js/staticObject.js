/*global define*/
define(function (require) {

    "use strict";
    var Entity = require('engine/Entity'),
        SpriteSheet = require('engine/SpriteSheet'),
        Animation = require('engine/Animation'),
        Rectangle = require('engine/Rectangle');

    function StaticObject(game, x, y, width, height, assetPath) {
        Entity.call(this, game, x, y);
        this.width = width;
        this.height = height;
        this.anims = {};
        this.currentAnim = null;
        this.boundingbox = new Rectangle(this.pos.x, this.pos.y, this.width, this.height);
        this.assetPath = assetPath;

        // Update zIndex.
        this.zIndex = this.pos.y + this.height;
    }

    StaticObject.prototype = new Entity();
    StaticObject.prototype.constructor = StaticObject;

    StaticObject.prototype.loadContent = function () {
        var spriteSheet = new SpriteSheet(this.game.assetManager.getAsset(this.assetPath), this.width, this.height);
        this.addAnim("idle", spriteSheet, [0], 0.15, false, true);
    };

    StaticObject.prototype.update = function (dt) {
        Entity.prototype.update.call(this, dt);
        this.currentAnim = this.anims.idle;
        this.currentAnim.update(dt);
    };

    StaticObject.prototype.draw = function (ctx) {
        Entity.prototype.draw.call(this, ctx);
        this.currentAnim.draw(ctx, this.pos.x, this.pos.y);

        /*if(this.boundingbox != null)
            this.boundingbox.draw(ctx);*/
    };

    StaticObject.prototype.addAnim = function (name, spriteSheet, frameList, step, loop, freeze) {
        loop = loop || false;
        freeze = freeze || false;
        this.anims[name] = new Animation(spriteSheet, frameList, step, loop, freeze);
    };

    return StaticObject;
});
