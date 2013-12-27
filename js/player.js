define(['engine/entity','engine/animation','engine/rectangle','ennemy'],function (Entity, Animation, Rectangle, Ennemy) {

    function Player(game, x, y, width, height, assetPath) {
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
        this.attackRect = null;
        this.isAlive = true;
    }

    Player.prototype = new Entity();
    Player.prototype.constructor = Player;

    Player.prototype.loadContent = function() {
        var spriteSheet = this.game.assetManager.getAsset(this.assetPath);
        this.animations["idleDown"] = new Animation(spriteSheet, this.width, this.height, [0], 0.15, false, true);
        this.animations["idleUp"] = new Animation(spriteSheet, this.width, this.height, [1], 0.15, false, true);
        this.animations["idleLeft"] = new Animation(spriteSheet, this.width, this.height, [2], 0.15, false, true);
        this.animations["idleRight"] = new Animation(spriteSheet, this.width, this.height, [3], 0.15, false, true);

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

    Player.prototype.update = function(dt) {
        Entity.prototype.update.call(this, dt);

        if(!this.isAttacking && this.isAlive)
        {
            this.currentAnimation = this.animations["idle"+this.direction];

            if (90 in this.game.keysDown) { // Player holding z
                this.direction = "Up";
                this.moveTo(this.pos.x, this.pos.y - this.speed * dt);
                this.currentAnimation = this.animations["move"+this.direction];
            }
            if (83 in this.game.keysDown) { // Player holding s
                this.direction = "Down";
                this.moveTo(this.pos.x, this.pos.y + this.speed * dt);
                this.currentAnimation = this.animations["move"+this.direction];
            }
            if (81 in this.game.keysDown) { // Player holding q
                this.direction = "Left";
                this.moveTo(this.pos.x - this.speed * dt, this.pos.y);
                this.currentAnimation = this.animations["move"+this.direction];
            }
            if (68 in this.game.keysDown) { // Player holding d
                this.direction = "Right";
                this.moveTo(this.pos.x + this.speed * dt, this.pos.y);
                this.currentAnimation = this.animations["move"+this.direction];
            }

            if (this.attackDelay <= 0 && 32 in this.game.keysDown) { // Player holding space
                this.attack();
            }
        }

        if(this.isAttacking)
        {
            if(this.currentAnimation.isDone())
            {
                this.currentAnimation.reset();
                this.currentAnimation = this.animations["idle"+this.direction];
                this.isAttacking = false;
            }
        }
        else
            this.attackDelay -= dt;

        this.updateCollisions();

        this.setAttackRectangle(10);

        // Update previousPos.
        this.previousPos.x = this.pos.x;
        this.previousPos.y = this.pos.y;
    }

    Player.prototype.draw = function(dt,ctx) {
        Entity.prototype.draw.call(this, dt, ctx);
        this.currentAnimation.drawFrame(dt, ctx, this.pos.x, this.pos.y);
        this.hitbox.draw(ctx);
        this.attackRect.draw(ctx);
    }

    Player.prototype.setAttackRectangle = function(range) {
        if(this.direction == "Up")
            this.attackRect = new Rectangle (this.pos.x, this.pos.y - range, this.width, range);
        else if(this.direction == "Down")
            this.attackRect = new Rectangle (this.pos.x, this.pos.y+this.height, this.width, range);
        else if(this.direction == "Left")
            this.attackRect = new Rectangle (this.pos.x - range, this.pos.y, range, this.height);
        else if(this.direction == "Right")
            this.attackRect = new Rectangle (this.pos.x+this.width, this.pos.y, range, this.height);
    }

    Player.prototype.attack = function() {
        var punchSound = this.game.assetManager.getSound("sounds/punch.wav");
        punchSound.play();
        this.currentAnimation = this.animations["attack"+this.direction];
        this.isAttacking = true;
        this.attackDelay = 0.1;

        for (var i = 0; i < this.game.entities.length; i++) {
            var entity = this.game.entities[i];
            if(this != entity && entity instanceof Ennemy && entity.isAlive && this.attackRect.intersects(entity.hitbox))
            {
                entity.hp -= 10;
            }
        }
    }

    Player.prototype.updateCollisions = function() {
        // Collisions logic.
        //TODO: Change hitbox to collisionBox
        for (var i = 0; i < this.game.entities.length; i++) {
            var entity = this.game.entities[i];
            if(this != entity && entity.hitbox != null && this.hitbox.intersects(entity.hitbox))
            {
                this.moveTo(this.previousPos.x,this.previousPos.y);
            }
        }
    }

    Player.prototype.die = function() {
        var deathSound = this.game.assetManager.getSound("sounds/slime_death.wav");
        deathSound.play();
        this.currentAnimation = this.animations["death"];
        this.isAlive = false;
    }

    Player.prototype.moveTo = function(x, y) {
        this.pos.x = x;
        this.pos.y = y;
        this.hitbox.setPosition(this.pos.x,this.pos.y);
    }

    return Player;
});