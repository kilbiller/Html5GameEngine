/*global define*/
define(['engine/Vector'], function (Vector) {

    /**
    Entity class
    @class Entity
    **/
    "use strict";
    function Entity(game, x, y) {
        this.game = game;
        this.pos = new Vector(x, y);
        this.zIndex = y;
        this.removeFromWorld = false;
    }

    /**
    Update entity's data.
    @method update
    **/
    Entity.prototype.update = function (dt) { };

    /**
    Draw the entity on screen.
    @method draw
    **/
    Entity.prototype.draw = function (dt, ctx) {
        /*if (this.game.showOutlines && this.radius) {
            ctx.beginPath();
            ctx.strokeStyle = "green";
            ctx.arc(this.x, this.y, this.radius, 0, Math.PI*2, false);
            ctx.stroke();
            ctx.closePath();
        }*/
    };

    /*Entity.prototype.outsideScreen = function() {
        return (this.x > this.game.halfSurfaceWidth || this.x < -(this.game.halfSurfaceWidth) ||
        this.y > this.game.halfSurfaceHeight || this.y < -(this.game.halfSurfaceHeight));
    }*/

    return Entity;
});
