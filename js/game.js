/*global define*/
/*jslint browser: true*/
define(function (require) {

    "use strict";
    var GameEngine = require('engine/GameEngine'),
        Camera = require('engine/Camera'),
        Player = require('Player'),
        StaticObject = require('StaticObject'),
        Ennemy = require('Ennemy'),
        StateManager = require('engine/StateManager'),
        LevelState = require('LevelState');

    function Game(width, height) {
        GameEngine.call(this, width, height);
        this.entities = [];
        this.camera = new Camera(0, 0, width, height);
        this.stateManager = new StateManager();
    }

    Game.prototype = new GameEngine();
    Game.prototype.constructor = Game;

    Game.prototype.init = function () {
        var wait;
        GameEngine.prototype.init.call(this);

        // Add assets to the queue
        this.assetManager.queueDownload("img/player.png");
        this.assetManager.queueSound("sounds/slime_death.wav");
        this.assetManager.queueSound("sounds/punch.wav");
        this.assetManager.queueDownload("img/trunks.png");

        this.assetManager.downloadAll();

        wait = setInterval(function () {
            if (this.assetManager.isDone()) {
                clearInterval(wait);
                // Start the game.
                this.stateManager.push(new LevelState(this));
                this.gameloop();
            }
        }.bind(this), 100);
    };

    Game.prototype.update = function (dt) {
        GameEngine.prototype.update.call(this, dt);
        this.stateManager.update(dt);
    };

    Game.prototype.draw = function (ctx) {
        GameEngine.prototype.draw.call(this, ctx);
        this.stateManager.draw(ctx);
    };

    return Game;
});
