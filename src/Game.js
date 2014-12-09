"use strict";

var X = require('./X');
var Player = require('./Player');
var StaticObject = require('./StaticObject');
var Ennemy = require('./Ennemy');
var LevelState = require('./LevelState');

function Game(width, height) {
    X.GameEngine.call(this, width, height);
    this.entities = null;
    this.camera = new X.Camera(0, 0, width, height);
    this.stateManager = new X.StateManager();
}

Game.prototype = Object.create(X.GameEngine.prototype);

Game.prototype.init = function () {
    this.stateManager.push(new LevelState(this));
    this.gameloop();
};

Game.prototype.update = function (dt) {
    this.stateManager.update(dt);
};

module.exports = Game;
