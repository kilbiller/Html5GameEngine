"use strict";

var Timer = require('./Timer');
var AssetManager = require('./AssetManager');
var Entity = require('./Entity');
var Mouse = require('./Mouse');
var PIXI = require('pixi.js');
var Camera = require('./Camera');
var StateManager = require('./StateManager');

class Game {
  constructor(width=500, height=500) {
    this.stage = new PIXI.Stage(0x008000);
    this.renderer = PIXI.autoDetectRenderer(width, height);
    document.body.appendChild(this.renderer.view);

    this.timer = new Timer();
    this.assetManager = new AssetManager();
    //this.mouse = new Mouse(this);

    this.entities = null;
    this.camera = new Camera(0, 0, width, height);
    this.stateManager = new StateManager();
  }

  update(dt) {
    this.stateManager.update(dt);
  }

  gameloop() {
    var dt = this.timer.tick();
    this.update(dt);
    this.renderer.render(this.stage);
    requestAnimationFrame(this.gameloop.bind(this));
  }

  start(assets, state) {
    var loader = new PIXI.AssetLoader(assets);
    loader.onComplete = function() {
      this.stateManager.push(state);
      this.gameloop();
    }.bind(this);

    loader.load();
  }
}

module.exports = Game;
