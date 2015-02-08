"use strict";

class AssetManager {
  constructor() {
    this.successCount = 0;
    this.errorCount = 0;
    this.cache = {};
    this.soundsQueue = [];
  }

  queueSound(path) {
    if (!this.soundsQueue.hasOwnProperty(path)) {
      this.soundsQueue.push(path);
    }
  }

  isDone() {
    return (this.soundsQueue.length === this.successCount + this.errorCount);
  }

  downloadAll() {
    var i, path, img, audio, onLoad;

    onLoad = function () {
      this.successCount += 1;
    };

    for (i = 0; i < this.soundsQueue.length; i += 1) {
      path = this.soundsQueue[i];
      audio = new Audio(path);
      this.successCount += 1;
      audio.src = path;
      this.cache[path] = audio;
    }
  }

  getSound(path) {
    return this.cache[path];
  }
}

module.exports = AssetManager;
