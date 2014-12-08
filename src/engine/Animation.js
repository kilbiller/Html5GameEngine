"use strict";

var SpriteSheet = require('./SpriteSheet');

function Animation(spriteSheet, frameList, frameDuration, loop) {
    this.spriteSheet = spriteSheet;
    this.frameList = frameList;
    this.frameDuration = frameDuration;
    this.totalTime = this.frameList.length * this.frameDuration;
    this.elapsedTime = 0;
    this.loop = loop;
    this.source = {};
}

Animation.prototype.update = function (dt) {
    this.elapsedTime += dt;

    if (this.isDone()) {
        if (this.loop) {
            this.reset();
        } else {
            return;
        }
    }

    var index = this.currentFrame();

    // Find frame position inside the spritesheet.
    this.source.x = (this.frameList[index] % this.spriteSheet.maxColumn) * this.spriteSheet.frameWidth;
    this.source.y = Math.floor(this.frameList[index] / this.spriteSheet.maxColumn) * this.spriteSheet.frameHeight;

    //Change the frame rectangle position inside the spritesheet
    this.spriteSheet.sprite.texture.setFrame(new PIXI.Rectangle(this.source.x, this.source.y, this.spriteSheet.frameWidth, this.spriteSheet.frameHeight));
};

Animation.prototype.currentFrame = function () {
    if (this.elapsedTime <= this.totalTime) {
        return Math.floor(this.elapsedTime / this.frameDuration);
    } else {
        return this.frameList.length - 1;
    }
};

Animation.prototype.isDone = function () {
    return (this.elapsedTime >= this.totalTime);
};

Animation.prototype.reset = function () {
    this.elapsedTime = 0;
};

module.exports = Animation;
