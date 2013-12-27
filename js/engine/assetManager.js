define(function () {

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
    AssetManager.prototype.queueDownload  = function(path) {
        this.downloadQueue.push(path);
    }

    /**
    Add sounds to the queue.
    @method queueSound
    **/
    AssetManager.prototype.queueSound = function(path) {
        this.soundsQueue.push(path);
    }

    /**
    Check if all assets in the queue are loaded.
    @method isDone
    **/
    AssetManager.prototype.isDone = function() {
        return ((this.downloadQueue.length + this.soundsQueue.length) == this.successCount + this.errorCount);
    }

    /**
    Load all of the assets.
    @method downloadAll
    **/
    AssetManager.prototype.downloadAll = function(callback) {
        if (this.downloadQueue.length === 0 && this.soundsQueue.length === 0) {
            callback();
        }

        for (var i = 0; i < this.downloadQueue.length; i++) {
            var path = this.downloadQueue[i];
            var img = new Image();

            img.addEventListener("load", function() {
                this.successCount += 1;
                if (this.isDone()) { callback(); }
            }.bind(this));

            img.addEventListener("error", function() {
                this.errorCount += 1;
                if (this.isDone()) { callback(); }
            }.bind(this));

            img.src = path;
            this.cache[path] = img;
        }

        for (var i = 0; i < this.soundsQueue.length; i++) {
            var path = this.soundsQueue[i];
            var audio = new Audio(path);
            this.successCount += 1;

            audio.src = path;
            this.cache[path] = audio;
        }
    }

    /**
    Return the specified audio.
    @method getSound
    **/
    AssetManager.prototype.getSound = function(path) {
        return this.cache[path];
    }

    /**
    Return the specified asset.
    @method getAsset
    **/
    AssetManager.prototype.getAsset = function(path) {
        return this.cache[path];
    }

    return AssetManager;
});