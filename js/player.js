define(['engine/Entity', 'engine/SpriteSheet','engine/Animation','engine/Rectangle'],
function (Entity, SpriteSheet, Animation, Rectangle) {

    function Player(game, x, y, width, height, assetPath) {
        Entity.call(this, game, x, y);
        this.width = width;
        this.height = height;
        this.speed = 150;
        this.anims = {};
        this.currentAnim = null;

        this.direction = "Down";
        this.isAttacking = false;
        this.attackDelay = 0;
        this.hitbox = new Rectangle (this.pos.x, this.pos.y, this.width, this.height);
        this.previousPos = {x:this.pos.x, y:this.pos.y};
        this.assetPath = assetPath;
        this.attackRect = null;
        this.isAlive = true;
        this.offsetX = 6;
        this.offsetY = 20;
        this.boundingbox = new Rectangle (  this.pos.x + this.offsetX, this.pos.y + this.offsetY,
                                            this.width - this.offsetX * 2, 10);

        this.isMoving = false;
    }

    Player.prototype = new Entity();
    Player.prototype.constructor = Player;

    Player.prototype.loadContent = function() {
        var spriteSheet = new SpriteSheet(this.game.assetManager.getAsset(this.assetPath),this.width,this.height);
        this.addAnim("idleDown", spriteSheet, [0], 0.15, false, true);
        this.addAnim("idleUp", spriteSheet, [1], 0.15, false, true);
        this.addAnim("idleLeft", spriteSheet, [2], 0.15, false, true);
        this.addAnim("idleRight", spriteSheet, [3], 0.15, false, true);

        this.addAnim("moveDown", spriteSheet, [4,5,6,7], 0.15, true);
        this.addAnim("moveUp", spriteSheet, [8,9,10,11], 0.15, true);
        this.addAnim("moveLeft", spriteSheet, [12,13,14,15], 0.15, true);
        this.addAnim("moveRight", spriteSheet, [16,17,18,19], 0.15, true);

        this.addAnim("attackDown", spriteSheet, [20,21,22], 0.1, false);
        this.addAnim("attackUp", spriteSheet, [24,25,26], 0.1, false);
        this.addAnim("attackLeft", spriteSheet, [28,29,30], 0.1, false);
        this.addAnim("attackRight", spriteSheet, [32,33,34], 0.1, false);

        this.addAnim("death", spriteSheet, [36,37,38], 0.12, false, true);
    }

    Player.prototype.update = function(dt) {
        Entity.prototype.update.call(this, dt);

        var kb = this.game.keyboard;
        var ms = this.game.mouse;

        if(!this.isAttacking && this.isAlive)
        {
            this.currentAnim = this.anims["idle"+this.direction];

            if (90 in kb.keysDown) { // Player holding z
                this.direction = "Up";
                this.moveTo(this.pos.x, this.pos.y - this.speed * dt);
                this.currentAnim = this.anims["move"+this.direction];
            }
            if (83 in kb.keysDown) { // Player holding s
                this.direction = "Down";
                this.moveTo(this.pos.x, this.pos.y + this.speed * dt);
                this.currentAnim = this.anims["move"+this.direction];
            }
            if (81 in kb.keysDown) { // Player holding q
                this.direction = "Left";
                this.moveTo(this.pos.x - this.speed * dt, this.pos.y);
                this.currentAnim = this.anims["move"+this.direction];
            }
            if (68 in kb.keysDown) { // Player holding d
                this.direction = "Right";
                this.moveTo(this.pos.x + this.speed * dt, this.pos.y);
                this.currentAnim = this.anims["move"+this.direction];
            }

            if(ms.leftClick)
                this.isMoving = true;
            if(this.isMoving)
            {
                var movement = this.moveTowards(this.pos,ms.pos,this.speed * dt)
                this.moveTo(movement.x, movement.y);

                if( Math.abs(ms.pos.x - this.pos.x) <=  this.speed * dt &&
                    Math.abs(ms.pos.y - this.pos.y) <= this.speed * dt)
                     this.isMoving = false;
            }

            // Collision logic.
            this.updateCollisions();

            if (this.attackDelay <= 0 && 32 in kb.keysDown) { // Player holding space
                this.attack();
            }
        }

        if(this.isAttacking)
        {
            if(this.currentAnim.isDone())
            {
                this.currentAnim.reset();
                this.currentAnim = this.anims["idle"+this.direction];
                this.isAttacking = false;
                this.attackRect = null;
            }
        }
        else
            this.attackDelay -= dt;

        this.currentAnim.update(dt);

        // Update zIndex.
        this.zIndex = this.pos.y + this.height;
        // Update previousPos.
        this.previousPos.x = this.pos.x;
        this.previousPos.y = this.pos.y;
    }

    Player.prototype.draw = function(ctx) {
        Entity.prototype.draw.call(this, ctx);
        this.currentAnim.draw(ctx, this.pos.x, this.pos.y);

        /*if(this.hitbox != null)
            this.hitbox.draw(ctx);
        if(this.boundingbox != null)
            this.boundingbox.draw(ctx);
        if(this.attackRect != null)
            this.attackRect.draw(ctx);*/
    }

    Player.prototype.setAttackRectangle = function(range) {
        if(this.direction === "Up")
            this.attackRect = new Rectangle (this.pos.x + 12 , this.pos.y - range, 10, range);
        else if(this.direction === "Down")
            this.attackRect = new Rectangle (this.pos.x + 12, this.pos.y+this.height, 10, range);
        else if(this.direction === "Left")
            this.attackRect = new Rectangle (this.pos.x - range, this.pos.y + 12, range, 10);
        else if(this.direction === "Right")
            this.attackRect = new Rectangle (this.pos.x+this.width, this.pos.y + 12, range, 10);
    }

    Player.prototype.attack = function() {
        var punchSound = this.game.assetManager.getSound("sounds/punch.wav");
        punchSound.play();
        this.currentAnim = this.anims["attack"+this.direction];
        this.isAttacking = true;
        this.attackDelay = 0.1;

        this.setAttackRectangle(1);
        for (var i = 0; i < this.game.entities.length; i++) {
            var entity = this.game.entities[i];
            if(this != entity && entity.isAlive && this.attackRect.intersects(entity.hitbox))
            {
                entity.hp -= 10;
            }
        }
    }

    Player.prototype.updateCollisions = function() {
        //TODO: Change hitbox to collisionBox
        for (var i = 0; i < this.game.entities.length; i++) {
            var entity = this.game.entities[i];
            if(this != entity && entity.boundingbox != null && this.boundingbox.intersects(entity.boundingbox))
            {
                this.moveTo(this.previousPos.x,this.previousPos.y);
            }
        }
    }

    Player.prototype.die = function() {
        var deathSound = this.game.assetManager.getSound("sounds/slime_death.wav");
        deathSound.play();
        this.currentAnim = this.anims["death"];
        this.isAlive = false;
    }

    Player.prototype.moveTo = function(x, y) {
        this.pos.x = x;
        this.pos.y = y;
        this.hitbox.moveTo(this.pos.x,this.pos.y);
        this.boundingbox.moveTo(this.pos.x + this.offsetX,this.pos.y + this.offsetY);
    }

    Player.prototype.addAnim = function(name, spriteSheet, frameList, step, loop, freeze) {
        var loop = loop || false;
        var freeze = freeze || false;
        this.anims[name] = new Animation(spriteSheet, frameList, step, loop, freeze);
    }

    Player.prototype.moveTowards = function(origin,goal,speed) {
        var dir = {x: goal.x - origin.x, y: goal.y - origin.y};

        var hyp = Math.sqrt(dir.x*dir.x + dir.y*dir.y);
        dir.x /= hyp;
        dir.y /= hyp;

        var newPos = {x: origin.x + dir.x*speed, y: origin.y += dir.y*speed};

        return newPos;
    }

    return Player;
});