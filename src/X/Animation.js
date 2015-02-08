"use strict";

var SpriteSheet = require('./SpriteSheet');
var PIXI = require('pixi.js');

class Animation {
  constructor(spriteSheet, frameList, frameDuration, loop) {
    this.spriteSheet = spriteSheet;
    this.frameList = frameList;
    this.frameDuration = frameDuration;
    this.totalTime = this.frameList.length * this.frameDuration;
    this.elapsedTime = 0;
    this.loop = loop;
    this.source = {};
  }

  update(dt) {
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
  }

  currentFrame() {
    if (this.elapsedTime <= this.totalTime) {
      return Math.floor(this.elapsedTime / this.frameDuration);
    } else {
      return this.frameList.length - 1;
    }
  }

  isDone() {
    return (this.elapsedTime >= this.totalTime);
  }

  reset() {
    this.elapsedTime = 0;
  }
}

module.exports = Animation;
