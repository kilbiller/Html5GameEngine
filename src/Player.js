"use strict";

var SpriteSheet = require('./engine/SpriteSheet'),
    Animations = require('./engine/Animations'),
    Rectangle = require('./engine/Rectangle'),
    Vector = require('./engine/Vector'),
    Actor = require('./Actor');

function Player(game, x, y, width, height, assetPath) {
    Actor.call(this, game, x, y, width, height, assetPath);

    this.speed = 150;
    this.isAttacking = false;
    this.attackRect = null;
    this.boundingbox = new Rectangle(6, 20, 20, 10);
    this.COOLDOWN_TIME = 0.5;
    this.attackCooldown = 0;

    var spriteSheet = new SpriteSheet(this.assetPath, this.width, this.height);
    this.anims = new Animations(spriteSheet, {
        idleDown: { frames: [0],  step: 0.15, loop: true },
        idleUp: { frames: [1], step: 0.15, loop: true },
        idleLeft: { frames: [2], step: 0.15, loop: true },
        idleRight: { frames: [3], step: 0.15, loop: true },
        moveDown: { frames: [4, 5, 6, 7], step: 0.15, loop: true },
        moveUp: { frames: [8, 9, 10, 11], step: 0.15, loop: true },
        moveLeft: { frames: [12, 13, 14, 15], step: 0.15, loop: true },
        moveRight: { frames: [16, 17, 18, 19], step: 0.15, loop: true },
        attackDown: { frames: [20, 21, 22], step: 0.1, loop: false },
        attackUp: { frames: [24, 25, 26], step: 0.1, loop: false },
        attackLeft: { frames: [28, 29, 30], step: 0.1, loop: false },
        attackRight: {  frames: [32, 33, 34], step: 0.1, loop: false },
        death: { frames: [36, 37, 38], step: 0.12, loop: false }
    });

    this.addChild(this.anims);
}

Player.prototype = Object.create(Actor.prototype);

Player.prototype.update = function (dt) {
    var kb = this.game.keyboard,
        ms = this.game.mouse;

    if (!this.isAttacking && this.isAlive) {
        this.anims.setAnim("idle" + this.direction);

        if (kb.keysDown.hasOwnProperty(90)) { // Player holding z
            this.direction = "Up";
            this.y -= this.speed * dt;
            this.anims.setAnim("moveUp");
        }
        if (kb.keysDown.hasOwnProperty(83)) { // Player holding s
            this.direction = "Down";
            this.y += this.speed * dt;
            this.anims.setAnim("moveDown");
        }
        if (kb.keysDown.hasOwnProperty(81)) { // Player holding q
            this.direction = "Left";
            this.x -= this.speed * dt;
            this.anims.setAnim("moveLeft");
        }
        if (kb.keysDown.hasOwnProperty(68)) { // Player holding d
            this.direction = "Right";
            this.x += this.speed * dt;
            this.anims.setAnim("moveRight");
        }

        // Prevent sub-pixel movements
        this.x = Math.round(this.x);
        this.y = Math.round(this.y);

        // Collision logic.
        this.updateCollisions();

        // Player attack if press space
        if (this.attackCooldown <= 0 && kb.keysDown.hasOwnProperty(32)) {
            this.attack();
        }
    }

    this.anims.getCurrent().update(dt);

    // If player has finished his attack.
    if (this.isAttacking && this.anims.getCurrent().isDone()) {
        this.anims.getCurrent().reset();
        this.isAttacking = false;
        this.attackRect = null;
    }

    if (this.attackCooldown > 0) {this.attackCooldown -= dt; }
    this.zIndex = this.y + this.height;
    this.previousPos = new Vector(this.x, this.y);
};

Player.prototype.attack = function () {
    var i, punchSound, entity;
    punchSound = this.game.assetManager.getSound("sounds/punch.wav");
    //punchSound.play();
    this.isAttacking = true;
    this.attackCooldown = this.COOLDOWN_TIME;

    if (this.direction === "Up") {
        this.attackRect = new Rectangle(this.x + 12, this.y - 1, 10, 1);
        this.anims.setAnim("attackUp");
    } else if (this.direction === "Down") {
        this.attackRect = new Rectangle(this.x + 8, this.y + 18, 20, 12);
        this.anims.setAnim("attackDown");
    } else if (this.direction === "Left") {
        this.attackRect = new Rectangle(this.x - 4, this.y + 13, 25, 12);
        this.anims.setAnim("attackLeft");
    } else if (this.direction === "Right") {
        this.attackRect = new Rectangle(this.x + 8, this.y + 13, 25, 12);
        this.anims.setAnim("attackRight");
    }

    for (i = 0; i < this.game.entities.children.length; i += 1) {
        entity = this.game.entities.children[i];
        if (this !== entity && entity.hitbox !== null && entity.isAlive && this.attackRect.intersects(entity.getHitBox())) {
            entity.takeDamage(10);
        }
    }
};

module.exports = Player;
