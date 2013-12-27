define(['engine/gameEngine','player','staticObject','ennemy'],function (GameEngine, Player, StaticObject, Ennemy) {

     /**
     Game class
     @class Game
     **/
    function Game() {
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

        // Create the entities.
        this.addEntity(new StaticObject(this,150,150,32,32,"img/trunks.png"));
        this.addEntity(new StaticObject(this,180,230,32,32,"img/trunks.png"));
        this.addEntity(new StaticObject(this,340,200,32,32,"img/trunks.png"));

        this.addEntity(new Ennemy(this,300,300,32,32,"img/player.png"));
        this.addEntity(new Ennemy(this,400,300,32,32,"img/player.png"));
        this.addEntity(new Ennemy(this,300,20,32,32,"img/player.png"));
        this.addEntity(new Ennemy(this,50,300,32,32,"img/player.png"));
        this.addEntity(new Ennemy(this,90,300,32,32,"img/player.png"));

        this.addEntity(new Player(this,50,50,32,32,"img/player.png"));
    }

    /**
    LoadContent will be called once per game and is the place to load all of your content.
    @method loadContent
    **/
    Game.prototype.loadContent = function(callback) {
        //GameEngine.prototype.loadContent.call(this,callback);
        // Add assets to the queue
        this.assetManager.queueDownload("img/player.png");
        this.assetManager.queueSound("sounds/slime_death.wav");
        this.assetManager.queueSound("sounds/punch.wav");
        this.assetManager.queueDownload("img/trunks.png");


        // Assign assets once they are loaded.
        this.assetManager.downloadAll(function(){
            for (var i = 0; i < this.entities.length; i++) {
                this.entities[i].loadContent();
            }
            callback();
        }.bind(this));
    }

    /**
    Run logic such as updating the world, checking for collisions, gathering input, and playing audio.
    @method update
    **/
    Game.prototype.update = function(dt) {
        GameEngine.prototype.update.call(this,dt);

        for (var i = 0; i < this.entities.length; i++) {
            if (!this.entities[i].removeFromWorld) {
                this.entities[i].update(dt);
            }
        }

        for (var i = this.entities.length-1; i >= 0; --i) {
            if (this.entities[i].removeFromWorld) {
                this.entities.splice(i, 1);
                console.log("Entity removed.");
            }
        }
    }

    /**
    This is called when the game should draw itself.
    @method draw
    **/
    Game.prototype.draw = function(dt,ctx) {
        GameEngine.prototype.draw.call(this,dt,ctx);

        // Clear the canvas.
        this.ctx.clearRect(0,0,ctx.canvas.width,ctx.canvas.height);

        //Draw entities
        for (var i = 0; i < this.entities.length; i++) {
            this.entities[i].draw(dt,ctx);
        }
    }

    return Game;
});
