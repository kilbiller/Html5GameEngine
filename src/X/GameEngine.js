"use strict";

var Timer = require('./Timer');
var AssetManager = require('./AssetManager');
var Entity = require('./Entity');
var Mouse = require('./Mouse');
var PIXI = require('pixi.js');

class GameEngine {
  constructor(width, height) {
    this.stage = new PIXI.Stage(0x008000);
    this.renderer = PIXI.autoDetectRenderer(width, height);
    document.body.appendChild(this.renderer.view);

    this.timer = new Timer();
    this.assetManager = new AssetManager();
    //this.mouse = new Mouse(this);
  }

  gameloop() {
    var dt = this.timer.tick();
    this.update(dt);
    this.renderer.render(this.stage);
    requestAnimationFrame(this.gameloop.bind(this));
  }

  run(assets) {
    var loader = new PIXI.AssetLoader(assets);
    loader.onComplete = function() {
      this.init();
    }.bind(this);

    loader.load();
  }
}

module.exports = GameEngine;
