/*global define*/
define(function () {

    "use strict";

    /**
    Timer class
    @class Timer
    **/
    function Timer() {
        this.gameTime = 0;
        this.maxStep = 0.05;
        this.previousTime = 0;
    }

    /**
    Update the timer.
    @method tick
    **/
    Timer.prototype.tick = function () {
        var now, actualDelta, gameDelta;
        now = Date.now();
        actualDelta = (now - this.previousTime) / 1000;
        this.previousTime = now;

        gameDelta = Math.min(actualDelta, this.maxStep);
        this.gameTime += gameDelta;
        return gameDelta;
    };

    return Timer;
});
