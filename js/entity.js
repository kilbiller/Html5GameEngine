define(function () {

    var Entity = function(game,x,y) {
        this.game = game;
        this.x = x;
        this.y = y;
    }

    Entity.prototype.update = function() {
    }

    Entity.prototype.draw = function(ctx) {
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