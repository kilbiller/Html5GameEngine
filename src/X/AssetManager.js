"use strict";

import PIXI from 'pixi.js';
import {Howl} from 'howler';

export default class AssetManager {
  constructor() {
    this.cache = [];
    this.promiseQueue = [];
    this.imagePromiseQueue = [];
    this.images = {};
    this.sounds = {};
  }

  addImage(name, path) {
    this.images[name] = path;

    var loader = new PIXI.ImageLoader(path);
    loader.load();
    var promise = new Promise(function(resolve, reject) {
      loader.on("loaded", () => resolve());
    });
    this.imagePromiseQueue.push(promise);
  }

  addSound(name, path) {
    this.sounds[name] = path;

    var self = this;
    var promise = new Promise(function(resolve, reject) {
      var sound = new Howl({
        urls: [path],
        onload: () => resolve(),
        onerror: () => reject()
      });

      self.cache[name] = sound;
    });
    this.promiseQueue.push(promise);
  }

  getSound(path) {
    return this.cache[path];
  }

  getImage(name) {
    return this.images[name];
  }

  loadSounds() {
    return Promise.all(this.promiseQueue);
  }

  loadImages() {
    return Promise.all(this.imagePromiseQueue);
  }

  loadAll() {
    return Promise.all([this.loadImages(), this.loadSounds()]);
  }
}
