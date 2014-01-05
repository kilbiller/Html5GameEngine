/*global define*/
/*jslint browser: true*/
define(function (require) {

    "use strict";
    var Timer = require('engine/Timer'),
        AssetManager = require('engine/AssetManager'),
        Entity = require('engine/Entity'),
        Keyboard = require('engine/Keyboard'),
        Mouse = require('engine/Mouse');
        //StateStack = require('engine/StateStack');

    /**
    GameEngine class
    @class GameEngine
    **/
    function GameEngine(width, height) {
        // Create the canvas.
        var canvas = document.createElement("canvas");
        canvas.width = width;
        canvas.height = height;
        document.body.appendChild(canvas);

        this.ctx = canvas.getContext("2d");
        this.timer = new Timer();
        this.assetManager = new AssetManager();
        this.keyboard = new Keyboard();
        this.mouse = new Mouse(this);
    }

    /**
    Init will be called once per game and is the place to load all of your content.
    @method init
    **/
    GameEngine.prototype.init = function () {
    };

    /**
    Run logic such as updating the world, checking for collisions, gathering input, and playing audio.
    @method update
    **/
    GameEngine.prototype.update = function (dt) {
    };

    /**
    This is called when the game should draw itself.
    @method draw
    **/
    GameEngine.prototype.draw = function (ctx) {
    };

    /**
    Actual gameloop.
    @method gameloop
    **/
    GameEngine.prototype.gameloop = function () {
        var dt = this.timer.tick();
        this.update(dt);
        this.draw(this.ctx);
        window.requestAnimationFrame(this.gameloop.bind(this));
    };

    /**
    Call this method to start the game.
    @method run
    **/
    GameEngine.prototype.run = function () {
        this.init();
    };

    return GameEngine;
});
