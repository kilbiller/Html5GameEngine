"use strict";

import SpriteSheet from './SpriteSheet';
import Tile from './Tile';

export default class Tilemap {
  constructor(game, json, tileset) {
    this.game = game;
    this.width = json.width;
    this.height = json.height;
    this.tilewidth = json.tilewidth;
    this.tileheight = json.tileheight;
    this.layers = json.layers;
    this.tiles = new Array(this.layers.length);
    this.tileset = tileset;
    this.tilesetSheet = new SpriteSheet(tileset, this.tilewidth, this.tileheight);
  }

  load() {

    for(var i = 0; i < this.layers.length; i++) {
      this.tiles[i] = new Array(this.width * this.height);

      for(var y = 0; y < this.height; y++) {
        for(var x = 0; x < this.width; x++) {
          var id = this.layers[i].data[x + y * this.width] - 1;
          var solid = false;
          if(id === 63) {
            solid = true;
          }
          this.tiles[i][x + y * this.width] = new Tile(x * this.tilewidth, y * this.tileheight, id, this.tilesetSheet, solid);
          if(id !== -1) {
            this.game.stage.addChild(this.tiles[i][x + y * this.width].sprite);
          }
        }
      }
    }
  }

  isOutsideMap(rect) {
    if(rect.Left < 0 || rect.Right > this.width * this.tilewidth || rect.Top < 0 || rect.Bottom > this.height * this.tileheight) {
      return true;
    }
    return false;
  }

  isSolidAt(rect) {
    if(!this.isOutsideMap(rect)) {
      for(var i = 0; i < this.layers.length; i++) {
        if(this.tiles[i][this.pixelToTile(rect.Left, rect.Top)].isSolid || this.tiles[i][this.pixelToTile(rect.Left, rect.Bottom)].isSolid ||
          this.tiles[i][this.pixelToTile(rect.Right, rect.Top)].isSolid || this.tiles[i][this.pixelToTile(rect.Right, rect.Bottom)].isSolid) {
          return true;
        }
      }
    }
    return false;
  }

  pixelToTile(x, y) {
    return Math.floor(x / this.tilewidth) + Math.floor(y / this.tileheight) * this.width;
  }

  TileToPixel() {
    //TODO
  }
}
