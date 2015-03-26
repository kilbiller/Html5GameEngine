"use strict";

import SpriteSheet from './SpriteSheet';
import Tile from './Tile';
import Rectangle from './Rectangle';

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
    /*this.collidables = {
      63: new Rectangle(0, 10, this.tilewidth, this.tileheight - 10),
      164: new Rectangle(0, 6, this.tilewidth, this.tileheight - 6),
      156: new Rectangle(0, 10, this.tilewidth, this.tileheight - 10),
      157: new Rectangle(0, 10, this.tilewidth, this.tileheight - 10)
    };*/

    // add tiles with a collision rectangle to the collidables list
    this.collidables = {};
    for(var ts of json.tilesets) {
      for(var tileID in ts.tiles) {
        if(ts.tiles[tileID]) {
          if(ts.tiles[tileID] && ts.tiles[tileID].objectgroup && ts.tiles[tileID].objectgroup.objects[0]) {
            var object = ts.tiles[tileID].objectgroup.objects[0];
            if(object.x >= 0 && object.y >= 0) {
              this.collidables[tileID] = new Rectangle(object.x, object.y, object.width, object.height);
              //this.collidables[tileID].print();
              //TODO maybe autofix x<0 & y<0
            }
          }
        }
      }
    }

  }

  load() {
    for(var i = 0; i < this.layers.length; i++) {
      this.tiles[i] = new Array(this.width * this.height);
      for(var y = 0; y < this.height; y++) {
        for(var x = 0; x < this.width; x++) {
          var id = this.layers[i].data[x + y * this.width] - 1;
          this.tiles[i][x + y * this.width] = new Tile(x * this.tilewidth, y * this.tileheight, id, this.tilesetSheet, this.collidables);
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
        if(rect.intersects(this.tiles[i][this.pixelToTile(rect.Left, rect.Top)].bounds) && this.tiles[i][this.pixelToTile(rect.Left, rect.Top)].isSolid) {
          return true;
        }
        if(rect.intersects(this.tiles[i][this.pixelToTile(rect.Left, rect.Bottom)].bounds) && this.tiles[i][this.pixelToTile(rect.Left, rect.Bottom)].isSolid) {
          return true;
        }
        if(rect.intersects(this.tiles[i][this.pixelToTile(rect.Right, rect.Top)].bounds) && this.tiles[i][this.pixelToTile(rect.Right, rect.Top)].isSolid) {
          return true;
        }
        if(rect.intersects(this.tiles[i][this.pixelToTile(rect.Right, rect.Bottom)].bounds) && this.tiles[i][this.pixelToTile(rect.Right, rect.Bottom)].isSolid) {
          return true;
        }
      }
    }
    return false;
  }

  pixelToTile(x, y) {
    return Math.floor(x / this.tilewidth) + Math.floor(y / this.tileheight) * this.width;
  }
}
