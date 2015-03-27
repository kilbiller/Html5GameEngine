"use strict";

import SpriteSheet from './SpriteSheet';
import Tile from './Tile';
import Rectangle from './Rectangle';

export default class Tilemap {
  constructor(game, json, tileset) {
    this.game = game;
    this.json = json;
    this.width = json.width;
    this.height = json.height;
    this.tilewidth = json.tilewidth;
    this.tileheight = json.tileheight;
    this.layers = new Array(json.layers.length);
    this.tileset = tileset;
    this.tilesetSheet = new SpriteSheet(tileset, this.tilewidth, this.tileheight);

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
    for(var i = 0; i < this.json.layers.length; i++) {
      this.layers[i] = {
        name: this.json.layers[i].name,
        tiles: new Array(this.width * this.height)
      };

      for(var y = 0; y < this.height; y++) {
        for(var x = 0; x < this.width; x++) {
          // change zOrder depending on layer
          // Background layer, zOrder = 0
          // Foreground layer, zOrder = bottom of collision rectangle
          // Top layer, zOrder = Higher than normal so that it covers everything
          var zOrder = 0;
          if(this.layers[i].name === "Top") {
            zOrder = y * this.tileheight + this.tileheight * 2;
          }

          // create the tile
          var id = this.json.layers[i].data[x + y * this.width] - 1;
          this.layers[i].tiles[x + y * this.width] = new Tile(x * this.tilewidth, y * this.tileheight, id, this.tilesetSheet, this.collidables, zOrder);

          // don't add tile to the renderer if there is no tile to render
          if(id !== -1) {
            this.game.world.addChild(this.layers[i].tiles[x + y * this.width].sprite);
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
        if(rect.intersects(this.layers[i].tiles[this.pixelToTile(rect.Left, rect.Top)].bounds) && this.layers[i].tiles[this.pixelToTile(rect.Left, rect.Top)].isSolid) {
          return true;
        }
        if(rect.intersects(this.layers[i].tiles[this.pixelToTile(rect.Left, rect.Bottom)].bounds) && this.layers[i].tiles[this.pixelToTile(rect.Left, rect.Bottom)].isSolid) {
          return true;
        }
        if(rect.intersects(this.layers[i].tiles[this.pixelToTile(rect.Right, rect.Top)].bounds) && this.layers[i].tiles[this.pixelToTile(rect.Right, rect.Top)].isSolid) {
          return true;
        }
        if(rect.intersects(this.layers[i].tiles[this.pixelToTile(rect.Right, rect.Bottom)].bounds) && this.layers[i].tiles[this.pixelToTile(rect.Right, rect.Bottom)].isSolid) {
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
