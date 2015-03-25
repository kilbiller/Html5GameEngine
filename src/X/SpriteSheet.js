"use strict";

import PIXI from 'pixi.js';

export default class SpriteSheet {
  constructor(baseTextureName, frameWidth, frameHeight) {
    var baseTexture = PIXI.BaseTextureCache[baseTextureName];

    this.frameWidth = frameWidth;
    this.frameHeight = frameHeight;

    this.maxColumn = baseTexture.width / this.frameWidth;
    this.maxRow = baseTexture.height / this.frameHeight;

    this.textures = [];
    for(var y = 0; y < this.maxRow; y++) {
      for(var x = 0; x < this.maxColumn; x++) {
        this.textures[x + y * this.maxColumn] = new PIXI.Texture(baseTexture, new PIXI.Rectangle(x * this.frameWidth, y * this.frameHeight, this.frameWidth, this.frameHeight));
      }
    }

    this.sprite = new PIXI.Sprite(this.textures[0]);
  }

  getSprite() {
    return this.sprite;
  }
}
