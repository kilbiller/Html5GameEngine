"use strict";

var GameEngine = require('./engine/GameEngine'),
    Camera = require('./engine/Camera'),
    Player = require('./Player'),
    StaticObject = require('./StaticObject'),
    Ennemy = require('./Ennemy'),
    StateManager = require('./engine/StateManager'),
    LevelState = require('./LevelState');

function Game(width, height) {
    GameEngine.call(this, width, height);
    this.entities = null;
    this.camera = new Camera(0, 0, width, height);
    this.stateManager = new StateManager();
}

Game.prototype = Object.create(GameEngine.prototype);

Game.prototype.init = function () {
    this.stateManager.push(new LevelState(this));
    this.gameloop();
};

Game.prototype.update = function (dt) {
    this.stateManager.update(dt);
};

module.exports = Game;
