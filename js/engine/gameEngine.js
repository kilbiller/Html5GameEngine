define(['engine/timer','engine/assetManager','engine/entity'],function (Timer,AssetManager,Entity) {

    /**
    GameEngine class
    @class GameEngine
    **/
    var GameEngine = function() {
        this.ctx = null;
        this.timer = null;
        this.assetManager = null;
        this.keysDown = {};
    }


    /**
    Allows the game to perform any initialization it needs to before starting to run.
    This is where it can query for any required services and load any non-graphic related content.
    @method initialize
    **/
    GameEngine.prototype.initialize = function() {
        // Create the canvas.
        var canvas = document.createElement("canvas");
        canvas.width = 800;
        canvas.height = 400;
        document.body.appendChild(canvas);

        this.ctx = canvas.getContext("2d");
        this.timer = new Timer();
        this.assetManager = new AssetManager();
    }

    /**
    LoadContent will be called once per game and is the place to load all of your content.
    @method loadContent
    **/
    GameEngine.prototype.loadContent = function(callback) {
    }

    /**
    Run logic such as updating the world, checking for collisions, gathering input, and playing audio.
    @method update
    **/
    GameEngine.prototype.update = function(dt) {
    }

    /**
    This is called when the game should draw itself.
    @method draw
    **/
    GameEngine.prototype.draw = function(dt,ctx) {
    }

    /**
    Actual gameloop.
    @method gameloop
    **/
    GameEngine.prototype.gameloop = function() {
        var dt = this.timer.tick();
        this.update(dt);
        this.draw(dt,this.ctx);

        if(!this.isStopped)
            requestAnimationFrame(this.gameloop.bind(this));
    }

    /**
    Call this method to start the game.
    @method run
    **/
    GameEngine.prototype.run = function() {
        this.initialize();
        this.loadContent(function() {
            this.gameloop();
        }.bind(this));

    }

    return GameEngine;
});
