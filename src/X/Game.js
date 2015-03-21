"use strict";

var Time = require('./Time');
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

    this.time = new Time();
    this.assetManager = new AssetManager();
    //this.mouse = new Mouse(this);

    this.entities = null;
    this.camera = new Camera(0, 0, width, height);
    this.stateManager = new StateManager();
  }

  update(dt) {
    this.stateManager.update(dt);
  }

  render() {
    this.renderer.render(this.stage);
  }

  gameloop() {
    var dt = this.time.tick();
    this.update(dt);
    this.render();
    requestAnimationFrame(this.gameloop.bind(this));
  }

  start(state) {
    var game = this;
    //TODO Change this

    this.assetManager.loadAll().then(function() {
      game.stateManager.push(state);
      game.gameloop();
    });
  }
}

module.exports = Game;
