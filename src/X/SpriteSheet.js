"use strict";

class SpriteSheet {
  constructor(sprite, frameWidth, frameHeight) {
    this.sprite = sprite;

    this.frameWidth = frameWidth;
    this.frameHeight = frameHeight;

    this.maxColumn = 128 / this.frameWidth;
    this.maxRow = 320 / this.frameHeight;
  }
}

module.exports = SpriteSheet;
