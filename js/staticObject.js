define(['engine/entity','engine/animation','engine/rectangle'], function (Entity, Animation, Rectangle) {
    function StaticObject (game, x, y, width, height, assetPath)
    {
        Entity.call(this, game, x, y);
        this.width = width;
        this.height = height;
        this.currentAnimation = null;
        this.hitbox = new Rectangle (this.pos.x, this.pos.y, this.width, this.height);
        this.assetPath = assetPath;
    }

    StaticObject.prototype = new Entity();
    StaticObject.prototype.constructor = StaticObject;

    StaticObject.prototype.loadContent = function() {
        var spriteSheet = this.game.assetManager.getAsset(this.assetPath);
        this.currentAnimation = new Animation(spriteSheet, this.width, this.height, [0], 0.15, false, true);
    }

    StaticObject.prototype.update = function(dt) {
        Entity.prototype.update.call(this, dt);
    }

    StaticObject.prototype.draw = function(dt,ctx) {
        Entity.prototype.draw.call(this, dt, ctx);
        this.currentAnimation.drawFrame(dt, ctx, this.pos.x, this.pos.y);
        this.hitbox.draw(ctx);
    }

    return StaticObject;
});