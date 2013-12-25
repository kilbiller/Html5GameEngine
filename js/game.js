define(['timer','entity','player'],function (Timer,Entity,Player) {

    var Game = function() {
        this.isStopped = false;
        this.ctx;
        this.timer;
        this.keysDown = {};
        //this.entities = [];
        this.player;
    }

    // Allows the game to perform any initialization it needs to before starting to run.
    // This is where it can query for any required services and load any non-graphic related content.
    Game.prototype.initialize = function() {
        // Create the canvas.
        var canvas = document.createElement("canvas");
        canvas.width = 800;
        canvas.height = 400;
        this.ctx = canvas.getContext("2d");
        document.body.appendChild(canvas);

        // Create the timer.
        this.timer = new Timer();

        // Handle keyboard controls
        addEventListener("keydown", function (e) {this.keysDown[e.keyCode] = true;}.bind(this), false);
        addEventListener("keyup", function (e) {delete this.keysDown[e.keyCode];}.bind(this), false);

        // Create the player.
        this.player = new Player(this,50,50,20,50);
    }

    // LoadContent will be called once per game and is the place to load all of your content.
    Game.prototype.loadContent = function() {
        //TODO : should preload all textures related to the level before starting a level
        this.player.loadContent("img/hero.png");
    }

    // Run logic such as updating the world, checking for collisions, gathering input, and playing audio.
    Game.prototype.update = function(dt) {
        this.player.update(dt);
    }

    // This is called when the game should draw itself.
    Game.prototype.draw = function() {
        // Clear the canvas.
        this.ctx.clearRect(0,0,this.ctx.canvas.width,this.ctx.canvas.height);
        // Draw the player.
        this.player.draw(this.ctx);
    }

    // Actual gameloop.
    Game.prototype.gameloop = function() {
        var delta = this.timer.tick();
        this.update(delta);
        this.draw();

        if(!this.isStopped)
            requestAnimationFrame(this.gameloop.bind(this));
    }

    // Call this method to start the game.
    Game.prototype.run = function() {
        this.initialize();
        this.loadContent();
        this.gameloop();
    }

    return Game;
});
