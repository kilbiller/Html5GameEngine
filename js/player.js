define(['entity'],function (Entity) {

    var Player = function(game, x, y, width, height) {
        Entity.call(this, game, x, y);
        this.width = width;
        this.height = height;
        this.texture;
        this.speed = 150;
    }

    // Prototypal Inheritance
    Player.prototype = new Entity();
    // Restores the .constructor property that was on the original prototype object overwritten.
    // People restore it because it's expected to be there. (Not necessary since instanceOf is better).
    Player.prototype.constructor = Player;

    Player.prototype.loadContent = function(path) {
        this.texture = new Image();
        this.texture.src = path;
    }

    Player.prototype.update = function(dt) {
        if (90 in this.game.keysDown) { // Player holding z
            this.y -= this.speed * dt;
        }
        if (83 in this.game.keysDown) { // Player holding s
            this.y += this.speed * dt;
        }
        if (81 in this.game.keysDown) { // Player holding q
            this.x -= this.speed * dt;
        }
        if (68 in this.game.keysDown) { // Player holding d
            this.x += this.speed * dt;
        }

        Entity.prototype.update.call(this);
    }

    Player.prototype.draw = function(ctx) {
        if(this.texture.complete)
            ctx.drawImage(this.texture, this.x, this.y);

        Entity.prototype.draw.call(this, ctx);
    }

    return Player;
});