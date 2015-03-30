import PIXI from "pixi.js";

export default class SpriteSheet {
  constructor(baseTextureName, frameWidth, frameHeight) {
    let baseTexture = PIXI.BaseTextureCache[baseTextureName];

    this.frameWidth = frameWidth;
    this.frameHeight = frameHeight;

    this.width = baseTexture.width / this.frameWidth;
    this.height = baseTexture.height / this.frameHeight;

    this.textures = [];
    for(let y = 0; y < this.height; y++) {
      for(let x = 0; x < this.width; x++) {
        this.textures[x + y * this.width] = new PIXI.Texture(baseTexture, new PIXI.Rectangle(x * this.frameWidth, y * this.frameHeight, this.frameWidth, this.frameHeight));
      }
    }

    this.sprite = new PIXI.Sprite(this.textures[0]);
  }

  getSprite() {
    return this.sprite;
  }
}
