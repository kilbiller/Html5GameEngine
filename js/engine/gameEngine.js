/*global define*/
/*jslint browser: true*/
define(['engine/Timer', 'engine/AssetManager', 'engine/Entity', 'engine/Keyboard', 'engine/Mouse'], function (Timer, AssetManager, Entity, Keyboard, Mouse) {

    /**
    GameEngine class
    @class GameEngine
    **/
    "use strict";
    function GameEngine(width, height) {
        this.width = width;
        this.height = height;

        this.ctx = null;
        this.timer = null;
        this.assetManager = null;
        this.entities = [];
        this.keyboard = null;
        this.mouse = null;
    }


    /**
    Allows the game to perform any initialization it needs to before starting to run.
    This is where it can query for any required services and load any non-graphic related content.
    @method initialize
    **/
    GameEngine.prototype.initialize = function () {
        // Create the canvas.
        var canvas = document.createElement("canvas");
        canvas.width = this.width;
        canvas.height = this.height;
        document.body.appendChild(canvas);

        this.ctx = canvas.getContext("2d");
        this.timer = new Timer();
        this.assetManager = new AssetManager();
        this.keyboard = new Keyboard();
        this.mouse = new Mouse(this);
    };

    /**
    LoadContent will be called once per game and is the place to load all of your content.
    @method loadContent
    **/
    GameEngine.prototype.loadContent = function () {
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

        if (!this.isStopped) { window.requestAnimationFrame(this.gameloop.bind(this)); }
    };

    /**
    Call this method to start the game.
    @method run
    **/
    GameEngine.prototype.run = function () {
        this.initialize();
        this.loadContent();
    };

    /**
    Add entity to the entities list.
    @method addEntity
    **/
    GameEngine.prototype.addEntity = function (entity) {
        this.entities.push(entity);
    };

    return GameEngine;
});
