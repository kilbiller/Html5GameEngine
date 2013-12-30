/*global define*/
define(function (require) {

    "use strict";
    var Entity = require('engine/Entity'),
        SpriteSheet = require('engine/SpriteSheet'),
        Animation = require('engine/Animation'),
        Rectangle = require('engine/Rectangle'),
        Vector = require('engine/Vector');

    function Ennemy(game, x, y, width, height, assetPath) {
        Entity.call(this, game, x, y);
        this.width = width;
        this.height = height;
        this.speed = 150;
        this.anims = {};
        this.currentAnim = null;

        this.direction = "Down";
        this.isAttacking = false;
        this.attackDelay = 0;
        this.hitbox = new Rectangle(this.pos.x, this.pos.y, this.width, this.height);
        this.previousPos = new Vector(this.pos.x, this.pos.y);
        this.assetPath = assetPath;
        this.isAlive = true;
        this.hp = 30;

        this.offsetX = 6;
        this.offsetY = 20;
        this.boundingbox = new Rectangle(this.pos.x + this.offsetX, this.pos.y + this.offsetY,
                                            this.width - this.offsetX * 2, 10);
    }

    Ennemy.prototype = new Entity();
    Ennemy.prototype.constructor = Ennemy;

    Ennemy.prototype.loadContent = function () {
        var spriteSheet = new SpriteSheet(this.game.assetManager.getAsset(this.assetPath), this.width, this.height);
        this.addAnim("idle", spriteSheet, [0], 0.15, false, true);
        this.addAnim("death", spriteSheet, [36, 37, 38], 0.12, false, true);
    };

    Ennemy.prototype.update = function (dt) {
        Entity.prototype.update.call(this, dt);

        if (this.isAlive) {
            this.currentAnim = this.anims.idle;
            if (this.hp <= 0) {this.die(); }
        }

        this.currentAnim.update(dt);

        // Update zIndex.
        this.zIndex = this.pos.y + this.height;
        // Update previousPos.
        this.previousPos = new Vector(this.pos.x, this.pos.y);
    };

    Ennemy.prototype.draw = function (ctx) {
        Entity.prototype.draw.call(this, ctx);
        this.currentAnim.draw(ctx, this.pos.x, this.pos.y);

        /*if(this.hitbox != null)
            this.boundingbox.draw(ctx);
        if(this.hitbox != null)
            this.hitbox.draw(ctx);*/
    };

    Ennemy.prototype.die = function () {
        var deathSound = this.game.assetManager.getSound("sounds/slime_death.wav");
        deathSound.play();
        this.currentAnim = this.anims.death;
        this.isAlive = false;
        //this.hitbox = null;
    };

    Ennemy.prototype.addAnim = function (name, spriteSheet, frameList, step, loop, freeze) {
        loop = loop || false;
        freeze = freeze || false;
        this.anims[name] = new Animation(spriteSheet, frameList, step, loop, freeze);
    };

    //TODO
    Ennemy.prototype.takeDamage = function () {};

    return Ennemy;
});
