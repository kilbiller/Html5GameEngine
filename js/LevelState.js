/*global define*/
define(function (require) {

    "use strict";
    var State = require('engine/State'),
        Camera = require('engine/Camera'),
        Player = require('Player'),
        Ennemy = require('Ennemy'),
        StaticObject = require('StaticObject');


    function LevelState(game) {
        State.call(this, game);
    }

    LevelState.prototype = new State();
    LevelState.prototype.constructor = LevelState;

    LevelState.prototype.onEnter = function () {
        var i, game;
        game = this.game;

        // Create the entities.
        game.entities.push(new StaticObject(game, 150, 150, 32, 32, "img/trunks.png"));
        game.entities.push(new StaticObject(game, 180, 230, 32, 32, "img/trunks.png"));
        game.entities.push(new StaticObject(game, 340, 200, 32, 32, "img/trunks.png"));

        game.entities.push(new Ennemy(game, 300, 300, 32, 32, "img/player.png"));
        game.entities.push(new Ennemy(game, 400, 300, 32, 32, "img/player.png"));
        game.entities.push(new Ennemy(game, 300, 20, 32, 32, "img/player.png"));
        game.entities.push(new Ennemy(game, 50, 300, 32, 32, "img/player.png"));
        game.entities.push(new Ennemy(game, 90, 300, 32, 32, "img/player.png"));

        game.entities.push(new Player(game, 50, 50, 32, 32, "img/player.png"));

        for (i = 0; i < game.entities.length; i += 1) {
            game.entities[i].loadContent(game.assetManager);
        }

        //Follow the player
        game.camera.follow(game.entities[game.entities.length - 1]);
    };

    LevelState.prototype.update = function (dt) {
        State.prototype.update.call(this, dt);

        var i, game;
        game = this.game;

        for (i = 0; i < game.entities.length; i += 1) {
            if (!game.entities[i].removeFromWorld) {
                game.entities[i].update(dt);
            }
        }

        for (i = game.entities.length - 1; i >= 0;  i -= 1) {
            if (game.entities[i].removeFromWorld) {
                game.entities.splice(i, 1);
            }
        }

        // Basic Depth sorting.
        // TODO : Upgrade and implement in the engine.
        game.entities.sort(function (a, b) { return a.zIndex - b.zIndex; });

        game.camera.update();
    };

    LevelState.prototype.draw = function (ctx) {
        State.prototype.draw.call(this, ctx);

        var i, game;
        game = this.game;

        // Clear the canvas.
        ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
        //this.ctx.canvas.width = this.ctx.canvas.width;

        // Save context before camera translation.
        ctx.save();
        game.camera.transform(ctx);

        //Draw entities
        for (i = 0; i < game.entities.length; i += 1) {
            game.entities[i].draw(ctx);
        }

        // Restore the canvas.
        ctx.restore();
    };

    LevelState.prototype.onExit = function () {

    };

    return LevelState;

});
