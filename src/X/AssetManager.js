"use strict";

var PIXI = require('pixi.js');
var Howl = require('howler').Howl;

class AssetManager {
  constructor() {
    this.cache = [];
    this.promiseQueue= [];
  }

  addImages(assets) {
    this.loader = new PIXI.AssetLoader(assets);
    this.loader.load();
  }

  addSound(path) {
    var self = this;

    var promise = new Promise(function(resolve, reject) {
      var sound = new Howl({
        urls: [path],
        onload: () => resolve()
      });

      self.cache[path] = sound;
    });

    this.promiseQueue.push(promise);
  }

  getSound(path) {
    return this.cache[path];
  }

  loadSounds() {
    return Promise.all(this.promiseQueue);
  }

  loadImages() {
    return new Promise((resolve, reject) => {
      this.loader.onComplete = () => resolve();
    });
  }

  loadAll() {
    return Promise.all([this.loadImages(), this.loadSounds()]);
  }
}

module.exports = AssetManager;
