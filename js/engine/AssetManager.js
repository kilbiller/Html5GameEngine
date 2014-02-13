"use strict";

/**
AssetManager class
@class AssetManager
**/
function AssetManager() {
    this.successCount = 0;
    this.errorCount = 0;
    this.cache = {};
    this.downloadQueue = [];
    this.soundsQueue = [];
}

/**
Add images to the queue.
@method queueDownload
**/
AssetManager.prototype.queueDownload  = function (path) {
    if (!this.downloadQueue.hasOwnProperty(path)) {
        this.downloadQueue.push(path);
    }
};

/**
Add sounds to the queue.
@method queueSound
**/
AssetManager.prototype.queueSound = function (path) {
    if (!this.soundsQueue.hasOwnProperty(path)) {
        this.soundsQueue.push(path);
    }
};

/**
Check if all assets in the queue are loaded.
@method isDone
**/
AssetManager.prototype.isDone = function () {
    return ((this.downloadQueue.length + this.soundsQueue.length) === this.successCount + this.errorCount);
};

/**
Load all of the assets.
@method downloadAll
**/
AssetManager.prototype.downloadAll = function () {
    var i, path, img, audio, onLoad;

    onLoad = function () {
        this.successCount += 1;
    };

    for (i = 0; i < this.downloadQueue.length; i += 1) {
        path = this.downloadQueue[i];
        img = new Image();
        img.addEventListener("load", onLoad.bind(this), false);
        img.src = path;
        this.cache[path] = img;
    }
    for (i = 0; i < this.soundsQueue.length; i += 1) {
        path = this.soundsQueue[i];
        audio = new Audio(path);
        this.successCount += 1;
        audio.src = path;
        this.cache[path] = audio;
    }
};

/**
Return the specified audio.
@method getSound
**/
AssetManager.prototype.getSound = function (path) {
    return this.cache[path];
};

/**
Return the specified asset.
@method getAsset
**/
AssetManager.prototype.getAsset = function (path) {
    return this.cache[path];
};

module.exports = AssetManager;
