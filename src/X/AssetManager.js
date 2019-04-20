import PIXI from "pixi.js";
import { Howl } from "howler";

//TODO: redo the whole thing

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
    PIXI.loader.add(name, path);
    let promise = new Promise(function(resolve, reject) {
      PIXI.loader.once("complete", () => resolve());
    });
    this.imagePromiseQueue.push(promise);
  }

  addSound(name, path) {
    let self = this;
    let promise = new Promise(function(resolve, reject) {
      let sound = new Howl({
        src: [path],
        onload: () => resolve(),
        onerror: () => reject()
      });

      self.soundCache[name] = sound;
    });
    this.soundPromiseQueue.push(promise);
  }

  addJson(name, path) {
    let self = this;
    PIXI.loader.add(name, path);
    let promise = new Promise(function(resolve, reject) {
      PIXI.loader.once("complete", function() {
        self.jsonCache[name] = PIXI.loader.resources[name].data;
        resolve();
      });
      // do error stuff
    });
    this.jsonPromiseQueue.push(promise);
  }

  addFont(name, path) {
    PIXI.loader.add(name, path);
    let promise = new Promise(function(resolve, reject) {
      PIXI.loader.once("complete", function() {
        resolve();
      });
      // do error stuff
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
    PIXI.loader.load();
    return Promise.all([
      this.loadImages(),
      this.loadSounds(),
      this.loadJsons(),
      this.loadFonts()
    ]);
  }
}
