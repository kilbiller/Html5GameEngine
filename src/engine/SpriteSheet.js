"use strict";

function SpriteSheet(assetPath, frameWidth, frameHeight) {

    PIXI.Texture.call(this, PIXI.Texture.fromImage(assetPath));

    this.frameWidth = frameWidth;
    this.frameHeight = frameHeight;

    this.maxColumn = 128 / this.frameWidth;
    this.maxRow = 320 / this.frameHeight;
}

SpriteSheet.prototype = Object.create(PIXI.Texture.prototype);

module.exports = SpriteSheet;
