/*global define*/
define(function (require) {

    "use strict";
    var SpriteSheet = require('engine/SpriteSheet'),
        Animation = require('engine/Animation'),
        Rectangle = require('engine/Rectangle'),
        Vector = require('engine/Vector'),
        Actor = require('Actor');

    function Player(game, x, y, width, height, assetPath) {
        Actor.call(this, game, x, y, width, height, assetPath);

        this.speed = 150;
        this.isAttacking = false;
        this.attackRect = null;
        this.boundingbox = new Rectangle(6, 20, 20, 10);
        //this.isMoving = false;
        this.COOLDOWN_TIME = 0.5;
        this.attackCooldown = 0;
    }

    Player.prototype = new Actor();
    Player.prototype.constructor = Player;

    Player.prototype.loadContent = function () {
        var spriteSheet = new SpriteSheet(this.game.assetManager.getAsset(this.assetPath), this.width, this.height);
        this.addAnim("idleDown", spriteSheet, [0], 0.15, false);
        this.addAnim("idleUp", spriteSheet, [1], 0.15, false);
        this.addAnim("idleLeft", spriteSheet, [2], 0.15, false);
        this.addAnim("idleRight", spriteSheet, [3], 0.15, false);

        this.addAnim("moveDown", spriteSheet, [4, 5, 6, 7], 0.15, true);
        this.addAnim("moveUp", spriteSheet, [8, 9, 10, 11], 0.15, true);
        this.addAnim("moveLeft", spriteSheet, [12, 13, 14, 15], 0.15, true);
        this.addAnim("moveRight", spriteSheet, [16, 17, 18, 19], 0.15, true);

        this.addAnim("attackDown", spriteSheet, [20, 21, 22], 0.1, false);
        this.addAnim("attackUp", spriteSheet, [24, 25, 26], 0.1, false);
        this.addAnim("attackLeft", spriteSheet, [28, 29, 30], 0.1, false);
        this.addAnim("attackRight", spriteSheet, [32, 33, 34], 0.1, false);

        this.addAnim("death", spriteSheet, [36, 37, 38], 0.12, false);
    };

    Player.prototype.update = function (dt) {
        Actor.prototype.update.call(this, dt);

        var kb = this.game.keyboard,
            ms = this.game.mouse;

        if (!this.isAttacking && this.isAlive) {
            this.currentAnim = this.anims["idle" + this.direction];

            if (kb.keysDown.hasOwnProperty(90)) { // Player holding z
                this.direction = "Up";
                this.pos.y -= this.speed * dt;
                this.currentAnim = this.anims.moveUp;
            }
            if (kb.keysDown.hasOwnProperty(83)) { // Player holding s
                this.direction = "Down";
                this.pos.y += this.speed * dt;
                this.currentAnim = this.anims.moveDown;
            }
            if (kb.keysDown.hasOwnProperty(81)) { // Player holding q
                this.direction = "Left";
                this.pos.x -= this.speed * dt;
                this.currentAnim = this.anims.moveLeft;
            }
            if (kb.keysDown.hasOwnProperty(68)) { // Player holding d
                this.direction = "Right";
                this.pos.x += this.speed * dt;
                this.currentAnim = this.anims.moveRight;
            }

            /*
            // Mouse movement.
            if (ms.leftClick) {
                this.isMoving = true;
            }
            if (this.isMoving) {
                this.pos = Vector.moveTowards(this.pos, ms.pos, this.speed * dt);
                if (Math.abs(ms.pos.x - this.pos.x) <=  this.speed * dt && Math.abs(ms.pos.y - this.pos.y) <= this.speed * dt) {
                    this.isMoving = false;
                }
            }
            */

            // Collision logic.
            this.updateCollisions();

            // Player attack if press space
            if (this.attackCooldown <= 0 && kb.keysDown.hasOwnProperty(32)) {
                this.attack();
            }
        }

        this.currentAnim.update(dt);

        // If player finished his attack.
        if (this.isAttacking && this.currentAnim.isDone()) {
            this.currentAnim.reset();
            this.isAttacking = false;
            this.attackRect = null;
        }

        if (this.attackCooldown > 0) {this.attackCooldown -= dt; }
        this.zIndex = this.pos.y + this.height;
        this.previousPos = new Vector(this.pos.x, this.pos.y);
    };

    Player.prototype.draw = function (ctx) {
        Actor.prototype.draw.call(this, ctx);

        this.getHitBox().draw(ctx);
        this.getCollisionBox().draw(ctx);
        if (this.attackRect !== null) {this.attackRect.draw(ctx); }
    };

    Player.prototype.attack = function () {
        var i, punchSound, entity;
        punchSound = this.game.assetManager.getSound("sounds/punch.wav");
        punchSound.play();
        this.isAttacking = true;
        this.attackCooldown = this.COOLDOWN_TIME;

        if (this.direction === "Up") {
            this.attackRect = new Rectangle(this.pos.x + 12, this.pos.y - 1, 10, 1);
            this.currentAnim = this.anims.attackUp;
        } else if (this.direction === "Down") {
            this.attackRect = new Rectangle(this.pos.x + 8, this.pos.y + 18, 20, 12);
            this.currentAnim = this.anims.attackDown;
        } else if (this.direction === "Left") {
            this.attackRect = new Rectangle(this.pos.x - 4, this.pos.y + 13, 25, 12);
            this.currentAnim = this.anims.attackLeft;
        } else if (this.direction === "Right") {
            this.attackRect = new Rectangle(this.pos.x + 8, this.pos.y + 13, 25, 12);
            this.currentAnim = this.anims.attackRight;
        }

        for (i = 0; i < this.game.entities.length; i += 1) {
            entity = this.game.entities[i];
            if (this !== entity && entity.hitbox !== null && entity.isAlive && this.attackRect.intersects(entity.getHitBox())) {
                entity.takeDamage(10);
            }
        }
    };

    return Player;
});
