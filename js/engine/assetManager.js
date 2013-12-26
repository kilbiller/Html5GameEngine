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
    }

    /**
    Add asset to the queue.
    @method addQueue
    **/
    AssetManager.prototype.addQueue = function(path) {
        this.downloadQueue.push(path);
    }

    /**
    Check if all assets in the queue are loaded.
    @method isDone
    **/
    AssetManager.prototype.isDone = function() {
        return (this.downloadQueue.length == this.successCount + this.errorCount);
    }

    /**
    Load all of the assets.
    @method downloadAll
    **/
    AssetManager.prototype.downloadAll = function(callback) {
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