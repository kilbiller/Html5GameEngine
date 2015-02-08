"use strict";

var X = require('./X');
var Actor = require('./Actor');
var PIXI = require('pixi.js');
var key = require('keymaster');

class Player extends Actor {
  constructor(game, x, y, width, height, texture) {
    super(game, x, y, width, height, texture);

    this.speed = 150;
    this.isAttacking = false;
    this.attackRect = null;
    this.boundingbox = new X.Rectangle(6, 20, 20, 10);
    this.COOLDOWN_TIME = 0.5;
    this.attackCooldown = 0;

    this.sprite = new PIXI.Sprite(this.texture);
    this.game.stage.addChild(this.sprite);

    var spriteSheet = new X.SpriteSheet(this.sprite, this.width, this.height);

    this.anims = new X.Animations(spriteSheet, {
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
  }

  update(dt) {
    var ms = this.game.mouse;

    if (!this.isAttacking && this.isAlive) {
      this.anims.setAnim("idle" + this.direction);

      if (key.isPressed("Z")) {
        this.direction = "Up";
        this.y -= this.speed * dt;
        this.anims.setAnim("moveUp");
      }
      if (key.isPressed("S")) {
        this.direction = "Down";
        this.y += this.speed * dt;
        this.anims.setAnim("moveDown");
      }
      if (key.isPressed("Q")) {
        this.direction = "Left";
        this.x -= this.speed * dt;
        this.anims.setAnim("moveLeft");
      }
      if (key.isPressed("D")) {
        this.direction = "Right";
        this.x += this.speed * dt;
        this.anims.setAnim("moveRight");
      }

      // Prevent sub-pixel movements
      this.x = Math.round(this.x);
      this.y = Math.round(this.y);

      this.sprite.position.x = this.x;
      this.sprite.position.y = this.y;

      // Collision logic.
      this.updateCollisions();

      // Player attack if press space
      if (this.attackCooldown <= 0 && key.isPressed("space")) {
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
    this.previousPos = new X.Vector(this.x, this.y);
  }

  attack() {
    var i, punchSound, entity;
    punchSound = this.game.assetManager.getSound("sounds/punch.wav");
    //punchSound.play();
    this.isAttacking = true;
    this.attackCooldown = this.COOLDOWN_TIME;

    if (this.direction === "Up") {
      this.attackRect = new X.Rectangle(this.x + 12, this.y - 1, 10, 1);
      this.anims.setAnim("attackUp");
    } else if (this.direction === "Down") {
      this.attackRect = new X.Rectangle(this.x + 8, this.y + 18, 20, 12);
      this.anims.setAnim("attackDown");
    } else if (this.direction === "Left") {
      this.attackRect = new X.Rectangle(this.x - 4, this.y + 13, 25, 12);
      this.anims.setAnim("attackLeft");
    } else if (this.direction === "Right") {
      this.attackRect = new X.Rectangle(this.x + 8, this.y + 13, 25, 12);
      this.anims.setAnim("attackRight");
    }

    for (i = 0; i < this.game.entities.length; i += 1) {
      entity = this.game.entities[i];
      if (this !== entity && entity.hitbox !== null && entity.isAlive && this.attackRect.intersects(entity.getHitBox())) {
        entity.takeDamage(10);
      }
    }
  }
}

module.exports = Player;
