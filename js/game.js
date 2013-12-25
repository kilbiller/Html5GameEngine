define(['engine/gameEngine','player'],function (GameEngine,Player) {

     /**
     Game class
     @class Game
     **/
    var Game = function() {
        GameEngine.call(this);
        this.player = null;
    }

    Game.prototype = new GameEngine();
    Game.prototype.constructor = Game;

    /**
    Allows the game to perform any initialization it needs to before starting to run.
    This is where it can query for any required services and load any non-graphic related content.
    @method initialize
    **/
    Game.prototype.initialize = function() {
        GameEngine.prototype.initialize.call(this);

        // Handle keyboard controls
        addEventListener("keydown", function (e) {this.keysDown[e.keyCode] = true;}.bind(this), false);
        addEventListener("keyup", function (e) {delete this.keysDown[e.keyCode];}.bind(this), false);

        // Create the player.
        this.player = new Player(this,50,50,20,50);
    }

    /**
    LoadContent will be called once per game and is the place to load all of your content.
    @method loadContent
    **/
    Game.prototype.loadContent = function(callback) {
        //GameEngine.prototype.loadContent.call(this,callback);
        // Add assets to the queue
        this.assetManager.addQueue("img/test.png");

        // Assign assets once they are loaded.
        this.assetManager.downloadAll(function(){
            this.player.loadContent(this.assetManager.getAsset("img/test.png"));
            callback();
        }.bind(this));
    }

    /**
    Run logic such as updating the world, checking for collisions, gathering input, and playing audio.
    @method update
    **/
    Game.prototype.update = function(dt) {
        GameEngine.prototype.update.call(this,dt);
        this.player.update(dt);
    }

    /**
    This is called when the game should draw itself.
    @method draw
    **/
    Game.prototype.draw = function(dt,ctx) {
        GameEngine.prototype.draw.call(this,dt,ctx);
        // Clear the canvas.
        this.ctx.clearRect(0,0,ctx.canvas.width,ctx.canvas.height);
        // Draw the player.
        this.player.draw(dt,ctx);
    }

    return Game;
});
