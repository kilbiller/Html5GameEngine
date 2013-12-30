/*global define*/
define(function (require) {

    "use strict";

    var SpriteSheet = require('engine/SpriteSheet');

    /**
    Animation class
    @class Animation
    **/
    function Animation(spriteSheet, frameList, frameDuration, loop, freeze) {
        this.spriteSheet = spriteSheet;
        this.frameList = frameList;
        this.frameDuration = frameDuration;
        this.totalTime = this.frameList.length * this.frameDuration;
        this.elapsedTime = 0;
        this.loop = loop || false;
        this.freeze = freeze || false;
        this.source = {};
    }

    Animation.prototype.update = function (dt) {
        this.elapsedTime += dt;

        if (this.isDone()) {
            if (this.loop) {
                this.reset();
            } else if (!this.freeze) {
                return;
            }
        }

        var index = this.currentFrame();

        // Find frame position inside the spritesheet.
        this.source.x = (this.frameList[index] % this.spriteSheet.maxColumn) * this.spriteSheet.frameWidth;
        this.source.y = Math.floor(this.frameList[index] / this.spriteSheet.maxColumn) * this.spriteSheet.frameHeight;
    };

    /**
    Draw the current frame on the screen at the specified location.
    @method drawFrame
    **/
    Animation.prototype.draw = function (ctx, x, y, scaleBy) {
        scaleBy = scaleBy || 1;

        // Round the numbers to prevent sub-pixel drawing on canvas.
        // (prevent blurring and supposedly improve performance)
        x = Math.round(x);
        y = Math.round(y);

        ctx.drawImage(this.spriteSheet.image,
                     this.source.x, this.source.y,
                     this.spriteSheet.frameWidth, this.spriteSheet.frameHeight,
                     x, y,
                     this.spriteSheet.frameWidth * scaleBy, this.spriteSheet.frameHeight * scaleBy);
    };

    /**
    Return the index of the frame to draw.
    @method currentFrame
    **/
    Animation.prototype.currentFrame = function () {
        if (this.elapsedTime <= this.totalTime) {
            return Math.floor(this.elapsedTime / this.frameDuration);
        } else {
            return this.frameList.length - 1;
        }
    };

    /**
    Check if the animation loop is done.
    @method isDone
    **/
    Animation.prototype.isDone = function () {
        return (this.elapsedTime >= this.totalTime);
    };

    /**
    Reset the animation loop.
    @method reset
    **/
    Animation.prototype.reset = function () {
        this.elapsedTime = 0;
    };

    return Animation;
});
