"use strict";

var Timer = require('./Timer');
var AssetManager = require('./AssetManager');
var Entity = require('./Entity');
var Mouse = require('./Mouse');
var PIXI = require('pixi.js');

function GameEngine(width, height) {
    this.stage = new PIXI.Stage(0x008000);
    this.renderer = PIXI.autoDetectRenderer(width, height);
    document.body.appendChild(this.renderer.view);

    this.timer = new Timer();
    this.assetManager = new AssetManager();
    //this.mouse = new Mouse(this);
}

GameEngine.prototype.gameloop = function () {
    var dt = this.timer.tick();
    this.update(dt);
    this.renderer.render(this.stage);
    requestAnimationFrame(this.gameloop.bind(this));
};

GameEngine.prototype.run = function () {
    this.init();
};

module.exports = GameEngine;
