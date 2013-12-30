/*global define*/
define(function (require) {

    "use strict";
    var Entity = require('engine/Entity'),
        SpriteSheet = require('engine/SpriteSheet'),
        Animation = require('engine/Animation'),
        Rectangle = require('engine/Rectangle'),
        Vector = require('engine/Vector');

    function Player(game, x, y, width, height, assetPath) {
        Entity.call(this, game, x, y);
        this.width = width;
        this.height = height;
        this.assetPath = assetPath;

        this.speed = 150;
        this.anims = {};
        this.currentAnim = null;
        this.direction = "Down";
        this.isAttacking = false;
        this.hitbox = new Rectangle(this.pos.x, this.pos.y, this.width, this.height);
        this.previousPos = new Vector(this.pos.x, this.pos.y);
        this.attackRect = null;
        this.isAlive = true;
        this.boundingbox = null;
        this.isMoving = false;

        this.COOLDOWN_TIME = 0.5;
        this.attackCooldown = 0;
    }

    Player.prototype = new Entity();
    Player.prototype.constructor = Player;

    Player.prototype.loadContent = function () {
        var spriteSheet = new SpriteSheet(this.game.assetManager.getAsset(this.assetPath), this.width, this.height);
        this.addAnim("idleDown", spriteSheet, [0], 0.15, false, true);
        this.addAnim("idleUp", spriteSheet, [1], 0.15, false, true);
        this.addAnim("idleLeft", spriteSheet, [2], 0.15, false, true);
        this.addAnim("idleRight", spriteSheet, [3], 0.15, false, true);

        this.addAnim("moveDown", spriteSheet, [4, 5, 6, 7], 0.15, true);
        this.addAnim("moveUp", spriteSheet, [8, 9, 10, 11], 0.15, true);
        this.addAnim("moveLeft", spriteSheet, [12, 13, 14, 15], 0.15, true);
        this.addAnim("moveRight", spriteSheet, [16, 17, 18, 19], 0.15, true);

        this.addAnim("attackDown", spriteSheet, [20, 21, 22], 0.1, false);
        this.addAnim("attackUp", spriteSheet, [24, 25, 26], 0.1, false);
        this.addAnim("attackLeft", spriteSheet, [28, 29, 30], 0.1, false);
        this.addAnim("attackRight", spriteSheet, [32, 33, 34], 0.1, false);

        this.addAnim("death", spriteSheet, [36, 37, 38], 0.12, false, true);
    };

    Player.prototype.update = function (dt) {
        Entity.prototype.update.call(this, dt);

        var kb = this.game.keyboard,
            ms = this.game.mouse;

        if (!this.isAttacking && this.isAlive) {
            this.currentAnim = this.anims["idle" + this.direction];

            if (kb.keysDown.hasOwnProperty(90)) { // Player holding z
                this.direction = "Up";
                this.pos.y -= this.speed * dt;
                this.currentAnim = this.anims["move" + this.direction];
            }
            if (kb.keysDown.hasOwnProperty(83)) { // Player holding s
                this.direction = "Down";
                this.pos.y += this.speed * dt;
                this.currentAnim = this.anims["move" + this.direction];
            }
            if (kb.keysDown.hasOwnProperty(81)) { // Player holding q
                this.direction = "Left";
                this.pos.x -= this.speed * dt;
                this.currentAnim = this.anims["move" + this.direction];
            }
            if (kb.keysDown.hasOwnProperty(68)) { // Player holding d
                this.direction = "Right";
                this.pos.x += this.speed * dt;
                this.currentAnim = this.anims["move" + this.direction];
            }

            if (ms.leftClick) {
                this.isMoving = true;
            }
            if (this.isMoving) {
                this.pos = Vector.moveTowards(this.pos, ms.pos, this.speed * dt);

                if (Math.abs(ms.pos.x - this.pos.x) <=  this.speed * dt && Math.abs(ms.pos.y - this.pos.y) <= this.speed * dt) {this.isMoving = false; }
            }

            // Collision logic.
            this.updateCollisions();

            if (this.attackCooldown <= 0 && kb.keysDown.hasOwnProperty(32)) { // Player holding space
                this.attack();
                this.attackCooldown = this.COOLDOWN_TIME;
            }
        }

        this.currentAnim.update(dt);

        if (this.currentAnim.isDone()) {
            this.currentAnim.reset();
            this.isAttacking = false;
            this.attackRect = null;
        }

        this.attackCooldown -= dt;
        this.hitbox.offset(this.pos.x, this.pos.y);
        this.zIndex = this.pos.y + this.height;
        this.previousPos = new Vector(this.pos.x, this.pos.y);
    };

    Player.prototype.draw = function (ctx) {
        Entity.prototype.draw.call(this, ctx);
        this.currentAnim.draw(ctx, this.pos.x, this.pos.y);

        if (this.hitbox !== null) {this.hitbox.draw(ctx); }
        if (this.boundingbox !== null) {this.boundingbox.draw(ctx); }
        if (this.attackRect !== null) {this.attackRect.draw(ctx); }
    };

    Player.prototype.setAttackRect = function () {
        if (this.direction === "Up") {
            this.attackRect = new Rectangle(this.pos.x + 12, this.pos.y - 1, 10, 1);
        } else if (this.direction === "Down") {
            this.attackRect = new Rectangle(this.pos.x + 8, this.pos.y + 18, 20, 12);
        } else if (this.direction === "Left") {
            this.attackRect = new Rectangle(this.pos.x - 4, this.pos.y + 13, 25, 12);
        } else if (this.direction === "Right") {
            this.attackRect = new Rectangle(this.pos.x + 8, this.pos.y + 13, 25, 12);
        }
    };

    Player.prototype.attack = function () {
        var i, punchSound, entity;
        punchSound = this.game.assetManager.getSound("sounds/punch.wav");
        punchSound.play();
        this.currentAnim = this.anims["attack" + this.direction];
        this.isAttacking = true;
        this.setAttackRect();

        for (i = 0; i < this.game.entities.length; i += 1) {
            entity = this.game.entities[i];
            if (this !== entity && entity.isAlive && this.attackRect.intersects(entity.hitbox)) {
                entity.hp -= 10;
            }
        }
    };

    Player.prototype.setBoundingBox = function () {
        this.boundingbox = new Rectangle(this.pos.x + 6, this.pos.y + 20, 20, 10);
    };

    Player.prototype.updateCollisions = function () {
        var i, entity;
        this.setBoundingBox();
        for (i = 0; i < this.game.entities.length; i += 1) {
            entity = this.game.entities[i];
            if (this !== entity && entity.boundingbox !== null && this.boundingbox.intersects(entity.boundingbox)) {
                this.pos = new Vector(this.previousPos.x, this.previousPos.y);
                this.setBoundingBox();
            }
        }
    };

    Player.prototype.die = function () {
        var deathSound = this.game.assetManager.getSound("sounds/slime_death.wav");
        deathSound.play();
        this.currentAnim = this.anims.death;
        this.isAlive = false;
    };

    Player.prototype.addAnim = function (name, spriteSheet, frameList, step, loop, freeze) {
        loop = loop || false;
        freeze = freeze || false;
        this.anims[name] = new Animation(spriteSheet, frameList, step, loop, freeze);
    };

    return Player;
});
