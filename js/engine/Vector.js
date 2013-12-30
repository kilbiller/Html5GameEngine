/*global define*/
define(function () {

    "use strict";

    function Vector(x, y) {
        this.x = x;
        this.y = y;
    }

    Vector.prototype.normalize = function () {
        var hyp = Math.sqrt(this.x * this.x + this.y * this.y);
        this.x /= hyp;
        this.y /= hyp;
    };

    Vector.moveTowards = function (origin, goal, step) {
        var dir = new Vector(goal.x - origin.x, goal.y - origin.y);
        dir.normalize();

        return new Vector(origin.x + dir.x * step, origin.y + dir.y * step);
    };

    return Vector;
});
