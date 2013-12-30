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
        var currentTime, actualDelta, gameDelta;
        currentTime = Date.now();
        actualDelta = (currentTime - this.previousTime) / 1000;
        this.previousTime = currentTime;

        gameDelta = Math.min(actualDelta, this.maxStep);
        this.gameTime += gameDelta;
        return gameDelta;
    };

    return Timer;
});
