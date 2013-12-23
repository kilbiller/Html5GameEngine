define(['lib/class'],function (Class) {

    var Game = Class.extend({

        init: function() {
            this.isStopped = false;
            this.canvas;
            this.ctx;

            this.Player = {x:50,y:50,width:20,height:50,speed:150};

            this.gameTime = {};
            this.keysDown = {};
        },

        // Allows the game to perform any initialization it needs to before starting to run.
        // This is where it can query for any required services and load any non-graphic related content.
        initialize: function() {
            // Create the canvas
            this.canvas = document.createElement("canvas");
            this.ctx = this.canvas.getContext("2d");
            this.canvas.width = 800;
            this.canvas.height = 400;
            document.body.appendChild(this.canvas);
        },

        // LoadContent will be called once per game and is the place to load all of your content.
        loadContent: function() {},

        // Allows the game to run logic such as updating the world, checking for collisions, gathering input, and playing audio.
        update: function(delta) {
            if (90 in this.keysDown) { // Player holding z
                this.Player.y -= this.Player.speed * delta;
            }
            if (83 in this.keysDown) { // Player holding s
                this.Player.y += this.Player.speed * delta;
            }
            if (81 in this.keysDown) { // Player holding q
                this.Player.x -= this.Player.speed * delta;
            }
            if (68 in this.keysDown) { // Player holding d
                this.Player.x += this.Player.speed * delta;
            }
        },

        // This is called when the game should draw itself.
        draw: function() {
            this.ctx.clearRect(0,0,this.canvas.width,this.canvas.height);
            this.ctx.fillRect(this.Player.x,this.Player.y,this.Player.width,this.Player.height);
        },

        tick: function() {
            this.gameTime.now = Date.now();
            var delta = this.gameTime.now - this.gameTime.then;

            this.update(delta/1000);
            this.draw();

            //console.log("then :" + this.gameTime.then + ", now :" + this.gameTime.now);

            this.gameTime.then = this.gameTime.now;

            if(!this.isStopped)
                requestAnimationFrame(this.tick.bind(this));
        },

        // Call this method to start the game.
        run: function() {
            this.initialize();
            this.loadContent();

            // Handle keyboard controls
            addEventListener("keydown", function (e) {this.keysDown[e.keyCode] = true;}.bind(this), false);
            addEventListener("keyup", function (e) {delete this.keysDown[e.keyCode];}.bind(this), false);

            this.gameTime.then = Date.now();
            this.tick();
        }
    });

    return Game;
});
