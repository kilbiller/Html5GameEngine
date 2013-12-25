define(['engine/entity','engine/animation'],function (Entity,Animation) {

    var Player = function(game, x, y, width, height) {
        Entity.call(this, game, x, y);
        this.width = width;
        this.height = height;
        this.speed = 150;
        this.animations = {};
        this.currentAnimation = null;
    }

    Player.prototype = new Entity();
    Player.prototype.constructor = Player;

    Player.prototype.loadContent = function(spriteSheet) {
        this.animations["idle"] = new Animation(spriteSheet, 32, 32, [0], 0.1, true);
        this.animations["up"] = new Animation(spriteSheet, 32, 32, [5,6,7,8,9], 0.16, true);
        this.animations["down"] = new Animation(spriteSheet, 32, 32, [0,1,2,3,4], 0.16, true);
        this.animations["left"] = new Animation(spriteSheet, 32, 32, [10,11,12,13,14], 0.16, true);
        this.animations["right"] = new Animation(spriteSheet, 32, 32, [15,16,17,18,19], 0.16, true);
    }

    Player.prototype.update = function(dt) {
        Entity.prototype.update.call(this, dt);

        this.currentAnimation = this.animations["idle"];

        if (90 in this.game.keysDown) { // Player holding z
            this.y -= this.speed * dt;
            this.currentAnimation = this.animations["up"];
        }
        if (83 in this.game.keysDown) { // Player holding s
            this.y += this.speed * dt;
            this.currentAnimation = this.animations["down"];
        }
        if (81 in this.game.keysDown) { // Player holding q
            this.x -= this.speed * dt;
            this.currentAnimation = this.animations["left"];
        }
        if (68 in this.game.keysDown) { // Player holding d
            this.x += this.speed * dt;
            this.currentAnimation = this.animations["right"];
        }
    }

    Player.prototype.draw = function(dt,ctx) {
        Entity.prototype.draw.call(this, dt, ctx);
        this.currentAnimation.drawFrame(dt, ctx, this.x, this.y, 1.5);
    }

    return Player;
});