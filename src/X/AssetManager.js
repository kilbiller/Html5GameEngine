"use strict";

function AssetManager() {
    this.successCount = 0;
    this.errorCount = 0;
    this.cache = {};
    this.soundsQueue = [];
}

AssetManager.prototype.queueSound = function (path) {
    if (!this.soundsQueue.hasOwnProperty(path)) {
        this.soundsQueue.push(path);
    }
};

AssetManager.prototype.isDone = function () {
    return (this.soundsQueue.length === this.successCount + this.errorCount);
};

AssetManager.prototype.downloadAll = function () {
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
};

AssetManager.prototype.getSound = function (path) {
    return this.cache[path];
};

module.exports = AssetManager;
