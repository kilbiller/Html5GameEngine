define(function () {

    /**
    Entity class
    @class Entity
    **/
    var Entity = function(game,x,y) {
        this.game = game;
        this.x = x;
        this.y = y;
    }

    /**
    Update entity's data.
    @method update
    **/
    Entity.prototype.update = function(dt) {
    }

    /**
    Draw the entity on screen.
    @method draw
    **/
    Entity.prototype.draw = function(dt, ctx) {
        /*if (this.game.showOutlines && this.radius) {
            ctx.beginPath();
            ctx.strokeStyle = "green";
            ctx.arc(this.x, this.y, this.radius, 0, Math.PI*2, false);
            ctx.stroke();
            ctx.closePath();
        }*/
    }

    return Entity;
});