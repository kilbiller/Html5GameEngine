define(['engine/entity','engine/animation','engine/rectangle'],function (Entity, Animation, Rectangle) {

    function Ennemy(game, x, y, width, height, assetPath) {
        Entity.call(this, game, x, y);
        this.width = width;
        this.height = height;
        this.speed = 150;
        this.animations = {};
        this.currentAnimation = null;

        this.direction = "Down";
        this.isAttacking = false;
        this.attackDelay = 0;
        this.hitbox = new Rectangle (this.pos.x, this.pos.y, this.width, this.height);
        this.previousPos = {x:this.pos.x, y:this.pos.y};
        this.assetPath = assetPath;
        this.isAlive = true;
        this.hp = 30;
    }

    Ennemy.prototype = new Entity();
    Ennemy.prototype.constructor = Ennemy;

    Ennemy.prototype.loadContent = function() {

        var spriteSheet = this.game.assetManager.getAsset(this.assetPath);
        this.animations["idle"] = new Animation(spriteSheet, this.width, this.height, [0], 0.15, false, true);
        this.animations["moveDown"] = new Animation(spriteSheet, this.width, this.height, [4,5,6,7], 0.15, true);
        this.animations["moveUp"] = new Animation(spriteSheet, this.width, this.height, [8,9,10,11], 0.15, true);
        this.animations["moveLeft"] = new Animation(spriteSheet, this.width, this.height, [12,13,14,15], 0.15, true);
        this.animations["moveRight"] = new Animation(spriteSheet, this.width, this.height, [16,17,18,19], 0.15, true);

        this.animations["attackDown"] = new Animation(spriteSheet, this.width, this.height, [20,21,22], 0.1, false);
        this.animations["attackUp"] = new Animation(spriteSheet, this.width, this.height, [24,25,26], 0.1, false);
        this.animations["attackLeft"] = new Animation(spriteSheet, this.width, this.height, [28,29,30], 0.1, false);
        this.animations["attackRight"] = new Animation(spriteSheet, this.width, this.height, [32,33,34], 0.1, false);

        this.animations["death"] = new Animation(spriteSheet, this.width, this.height, [36,37,38], 0.12, false, true);
    }

    Ennemy.prototype.update = function(dt) {
        Entity.prototype.update.call(this, dt);

        if(this.isAlive)
        {
            this.currentAnimation = this.animations["idle"];
            if(this.hp <= 0)
                this.die();
        }

        // Update previousPos.
        this.previousPos.x = this.pos.x;
        this.previousPos.y = this.pos.y;
    }

    Ennemy.prototype.draw = function(dt,ctx) {
        Entity.prototype.draw.call(this, dt, ctx);
        this.currentAnimation.drawFrame(dt, ctx, this.pos.x, this.pos.y);

        if(this.hitbox != null)
            this.hitbox.draw(ctx);
    }

    Ennemy.prototype.die = function() {
        var deathSound = this.game.assetManager.getSound("sounds/slime_death.wav");
        deathSound.play();
        this.currentAnimation = this.animations["death"];
        this.isAlive = false;
        //this.hitbox = null;
    }

    return Ennemy;
});