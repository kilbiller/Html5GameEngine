"use strict";

var X = require('./X');
var Player = require('./Player');
var StaticObject = require('./StaticObject');
var Ennemy = require('./Ennemy');
var LevelState = require('./LevelState');

class Game extends X.GameEngine {
  constructor(width, height) {
    super(width, height);
    this.entities = null;
    this.camera = new X.Camera(0, 0, width, height);
    this.stateManager = new X.StateManager();
  }

  init() {
    this.stateManager.push(new LevelState(this));
    this.gameloop();
  }

  update(dt) {
    this.stateManager.update(dt);
  }
}

module.exports = Game;
