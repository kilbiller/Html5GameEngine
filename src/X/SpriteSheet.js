"use strict";

var PIXI = require('pixi.js');

class SpriteSheet {
  constructor(baseTextureName, frameWidth, frameHeight) {
    var baseTexture = PIXI.BaseTextureCache[baseTextureName];

    this.frameWidth = frameWidth;
    this.frameHeight = frameHeight;

    this.maxColumn = baseTexture.width / this.frameWidth;
    this.maxRow = baseTexture.height / this.frameHeight;

    this.textures = [];
    var frameCounter = 0;
    for(var i = 0; i < baseTexture.height / this.frameHeight; i++) {
      for(var j = 0; j < baseTexture.width / this.frameWidth; j++) {
        this.textures[frameCounter] = new PIXI.Texture(baseTexture, new PIXI.Rectangle(j*this.frameWidth, i*this.frameHeight, this.frameWidth, this.frameHeight));
        frameCounter++;
      }
    }

    this.sprite = new PIXI.Sprite(this.textures[0]);
  }

  getSprite() {
    return this.sprite;
  }
}

module.exports = SpriteSheet;
