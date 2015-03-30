import PIXI from "pixi.js";
import Rectangle from "./Rectangle";

export default class Tile {
  constructor(x, y, id, tilesets, collidables, zOrder = 0) {
    this.id = id;
    this.bounds = new Rectangle(x, y, 32, 32);
    this.sprite = new PIXI.Sprite(tilesets[0].textures[id]); //TODO take into account more than one tilset
    this.sprite.x = x;
    this.sprite.y = y;
    this.sprite.zOrder = zOrder;
    this.isSolid = false;

    if(collidables[id]) {
      this.isSolid = true;
      this.bounds = new Rectangle(x + collidables[id].x, y + collidables[id].y, collidables[id].width, collidables[id].height);
      this.sprite.zOrder = this.bounds.Bottom;
    }
  }
}
