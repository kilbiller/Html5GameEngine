define(['engine/GameEngine','engine/Camera','Player','StaticObject','Ennemy'],
function (GameEngine, Camera, Player, StaticObject, Ennemy) {

     /**
     Game class
     @class Game
     **/
    function Game() {
        GameEngine.call(this);
        this.camera = null;
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

        // Camera.
        this.camera = new Camera(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);

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

        //Follow the player
        //this.camera.follow(this.entities[this.entities.length-1]);
    }

    /**
    LoadContent will be called once per game and is the place to load all of your content.
    @method loadContent
    **/
    Game.prototype.loadContent = function(callback) {
        GameEngine.prototype.loadContent.call(this,callback);

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

        // Basic Depth sorting.
        // TODO : Upgrade and implement in the engine.
        this.entities.sort(function(a,b) { return a.zIndex - b.zIndex; } );

        this.camera.update();
    }

    /**
    This is called when the game should draw itself.
    @method draw
    **/
    Game.prototype.draw = function(ctx) {
        GameEngine.prototype.draw.call(this, ctx);

        // Clear the canvas.
        this.ctx.clearRect(0,0,ctx.canvas.width,ctx.canvas.height);
        //this.ctx.canvas.width = this.ctx.canvas.width;

        // Save context before camera translation.
        this.ctx.save();
        this.camera.transform(ctx);

        //Draw entities
        for (var i = 0; i < this.entities.length; i++) {
            this.entities[i].draw(ctx);
        }

        // Restore the canvas.
        this.ctx.restore();
    }

    return Game;
});
