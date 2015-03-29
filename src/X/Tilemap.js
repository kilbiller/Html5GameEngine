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
    for(let ts of json.tilesets) {
      for(let tileID in ts.tiles) {
        if(ts.tiles[tileID]) {
          if(ts.tiles[tileID] && ts.tiles[tileID].objectgroup && ts.tiles[tileID].objectgroup.objects[0]) {
            let object = ts.tiles[tileID].objectgroup.objects[0];
            if(object.x >= 0 && object.y >= 0) {
              this.collidables[tileID] = new Rectangle(object.x, object.y, object.width, object.height);
              //TODO maybe autofix x<0 & y<0
            } else {
              console.log("Une tile de collision est mal formée !!");
              console.log("id : " + tileID + ", x : " + object.x + ", y : " + object.y);
            }
          }
        }
      }
    }

  }

  load() {
    for(let i = 0; i < this.json.layers.length; i++) {
      // if on a tilelayer
      if(this.json.layers[i].type === "tilelayer") {
        this.layers[i] = {
          name: this.json.layers[i].name,
          tiles: new Array(this.width * this.height),
          type: this.json.layers[i].type
        };

        for(let y = 0; y < this.height; y++) {
          for(let x = 0; x < this.width; x++) {
            // change zOrder depending on layer
            // Background layer, zOrder = 0
            // Foreground layer, zOrder = bottom of the tile collision rectangle
            // Top layer, zOrder = 999999 so that it covers everything
            let zOrder = 0;
            if(this.layers[i].name === "Top") {
              zOrder = 999999;
            }

            // create the tile
            let id = this.json.layers[i].data[x + y * this.width] - 1;
            this.layers[i].tiles[x + y * this.width] = new Tile(x * this.tilewidth, y * this.tileheight, id, this.tilesetSheet, this.collidables, zOrder);

            // don't add tile to the renderer if there is no tile to render
            if(id !== -1) {
              this.game.worldDoc.addChild(this.layers[i].tiles[x + y * this.width].sprite);
            }
          }
        }
      }
      // if on a objectgroup
      if(this.json.layers[i].type === "objectgroup") {
        this.layers[i] = {
          name: this.json.layers[i].name,
          objects: [],
          type: this.json.layers[i].type
        };

        for(let object of this.json.layers[i].objects) {
          this.layers[i].objects.push({
            type: object.type,
            bounds: new Rectangle(object.x, object.y, object.width, object.height),
            props: object.properties
          });
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
      for(let layer of this.layers) {
        if(layer.type === "tilelayer") {
          if(rect.intersects(layer.tiles[this.pixelToTile(rect.Left, rect.Top)].bounds) && layer.tiles[this.pixelToTile(rect.Left, rect.Top)].isSolid) {
            return true;
          }
          if(rect.intersects(layer.tiles[this.pixelToTile(rect.Left, rect.Bottom)].bounds) && layer.tiles[this.pixelToTile(rect.Left, rect.Bottom)].isSolid) {
            return true;
          }
          if(rect.intersects(layer.tiles[this.pixelToTile(rect.Right, rect.Top)].bounds) && layer.tiles[this.pixelToTile(rect.Right, rect.Top)].isSolid) {
            return true;
          }
          if(rect.intersects(layer.tiles[this.pixelToTile(rect.Right, rect.Bottom)].bounds) && layer.tiles[this.pixelToTile(rect.Right, rect.Bottom)].isSolid) {
            return true;
          }
        }
      }
    }
    return false;
  }

  pixelToTile(x, y) {
    return Math.floor(x / this.tilewidth) + Math.floor(y / this.tileheight) * this.width;
  }

  getObject(rect) {
    for(let layer of this.layers) {
      if(layer.type === "objectgroup") {
        for(let object of layer.objects) {
          if(rect.intersects(object.bounds)) {
            return object;
          }
        }
      }
    }
    return null;
  }
}
