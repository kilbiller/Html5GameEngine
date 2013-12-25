define(function () {

    /**
    Timer class
    @class Timer
    **/
    var Timer = function () {
      this.gameTime = 0;
      this.maxStep = 0.05;
      this.previousTime = 0;
    }

    /**
    Update the timer.
    @method tick
    **/
    Timer.prototype.tick = function() {
      var currentTime = Date.now();
      var actualDelta = (currentTime - this.previousTime) / 1000;
      this.previousTime = currentTime;

      var gameDelta = Math.min(actualDelta, this.maxStep);
      this.gameTime += gameDelta;
      return gameDelta;
    }

    return Timer;
});