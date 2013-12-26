define(['engine/entity','engine/animation'],function (Entity,Animation) {

    function Player(game, x, y, width, height) {
        Entity.call(this, game, x, y);
        this.width = width;
        this.height = height;
        this.speed = 150;
        this.animations = {};
        this.currentAnimation = null;

        this.direction = "Down";
        this.isAttacking = false;
        this.isDying = false;
        this.attackDelay = 0;
    }

    Player.prototype = new Entity();
    Player.prototype.constructor = Player;

    Player.prototype.loadContent = function() {

        var spriteSheet = this.game.assetManager.getAsset("img/player.png")
        this.animations["idle"] = new Animation(spriteSheet, 32, 32, [0], 0.15, true);
        this.animations["moveDown"] = new Animation(spriteSheet, 32, 32, [4,5,6,7], 0.15, true);
        this.animations["moveUp"] = new Animation(spriteSheet, 32, 32, [8,9,10,11], 0.15, true);
        this.animations["moveLeft"] = new Animation(spriteSheet, 32, 32, [12,13,14,15], 0.15, true);
        this.animations["moveRight"] = new Animation(spriteSheet, 32, 32, [16,17,18,19], 0.15, true);

        this.animations["attackDown"] = new Animation(spriteSheet, 32, 32, [20,21,22], 0.1, false);
        this.animations["attackUp"] = new Animation(spriteSheet, 32, 32, [24,25,26], 0.1, false);
        this.animations["attackLeft"] = new Animation(spriteSheet, 32, 32, [28,29,30], 0.1, false);
        this.animations["attackRight"] = new Animation(spriteSheet, 32, 32, [32,33,34], 0.1, false);

        this.animations["death"] = new Animation(spriteSheet, 32, 32, [36,37,38], 0.12, false);
    }

    Player.prototype.update = function(dt) {
        Entity.prototype.update.call(this, dt);

        if(!this.isAttacking && !this.isDying)
        {
            this.currentAnimation = this.animations["idle"];
            this.direction = "Down";

            if (90 in this.game.keysDown) { // Player holding z
                this.y -= this.speed * dt;
                this.direction = "Up";
                this.currentAnimation = this.animations["move"+this.direction];
            }
            if (83 in this.game.keysDown) { // Player holding s
                this.y += this.speed * dt;
                this.direction = "Down";
                this.currentAnimation = this.animations["move"+this.direction];
            }
            if (81 in this.game.keysDown) { // Player holding q
                this.x -= this.speed * dt;
                this.direction = "Left";
                this.currentAnimation = this.animations["move"+this.direction];
            }
            if (68 in this.game.keysDown) { // Player holding d
                this.x += this.speed * dt;
                this.direction = "Right";
                this.currentAnimation = this.animations["move"+this.direction];
            }

            if (this.attackDelay <= 0 && 32 in this.game.keysDown) { // Player holding space
                    this.currentAnimation = this.animations["attack"+this.direction];
                    this.isAttacking = true;
                    this.attackDelay = 0.1;
                    console.log("Player attacked.");
            }

            if (65 in this.game.keysDown) { // Player holding a
                    this.currentAnimation = this.animations["death"];
                    this.isDying = true;
                    console.log("Player died.");
            }
        }

        if(this.isAttacking)
        {
            if(this.currentAnimation.isDone())
            {
                this.currentAnimation.resetAnim();
                this.currentAnimation = this.animations["idle"];
                this.isAttacking = false;
            }
        }
        else
            this.attackDelay -= dt;

        if(this.isDying)
        {
            if(this.currentAnimation.isDone())
                this.removeFromWorld = true;
        }
    }

    Player.prototype.draw = function(dt,ctx) {
        Entity.prototype.draw.call(this, dt, ctx);
        this.currentAnimation.drawFrame(dt, ctx, this.x, this.y, 1.5);
    }

    return Player;
});