"use strict";

import PIXI from 'pixi.js';

export default class Tile {
  constructor(x, y, id, sheet, solidity = false) {
    /*this.id = id;
    this.sheet = sheet;*/
    this.sprite = new PIXI.Sprite(sheet.textures[id]);
    this.sprite.x = x;
    this.sprite.y = y;
    this.sprite.zOrder = -999;
    this.isSolid = solidity;
  }
}
