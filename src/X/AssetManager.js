"use strict";

import PIXI from 'pixi.js';
import {
  Howl
}
from 'howler';

export default class AssetManager {
  constructor() {
    this.soundCache = [];
    this.jsonCache = [];
    this.soundPromiseQueue = [];
    this.imagePromiseQueue = [];
    this.jsonPromiseQueue = [];
    this.fontPromiseQueue = [];
    this.images = {};
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
    var self = this;
    var promise = new Promise(function(resolve, reject) {
      var sound = new Howl({
        urls: [path],
        onload: () => resolve(),
        onerror: () => reject()
      });

      self.soundCache[name] = sound;
    });
    this.soundPromiseQueue.push(promise);
  }

  addJson(name, path) {
    var self = this;
    var loader = new PIXI.JsonLoader(path);
    loader.load();
    var promise = new Promise(function(resolve, reject) {
      loader.on("loaded", function() {
        self.jsonCache[name] = loader.json;
        resolve();
      });
    });
    this.jsonPromiseQueue.push(promise);
  }

  addFont(name, path) {
    var self = this;
    var loader = new PIXI.BitmapFontLoader(path);
    loader.load();
    var promise = new Promise(function(resolve, reject) {
      loader.on("loaded", function() {
        resolve();
      });
    });
    this.fontPromiseQueue.push(promise);
  }

  getSound(name) {
    return this.soundCache[name];
  }

  getImage(name) {
    return this.images[name];
  }

  getJson(name) {
    return this.jsonCache[name];
  }

  loadSounds() {
    return Promise.all(this.soundPromiseQueue);
  }

  loadImages() {
    return Promise.all(this.imagePromiseQueue);
  }

  loadJsons() {
    return Promise.all(this.jsonPromiseQueue);
  }

  loadFonts() {
    return Promise.all(this.fontPromiseQueue);
  }

  loadAll() {
    return Promise.all([this.loadImages(), this.loadSounds(), this.loadJsons(), this.loadFonts()]);
  }
}
