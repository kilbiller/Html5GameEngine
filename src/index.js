"use strict";

var X = require('./X');
var LevelState = require('./LevelState');

var game = new X.Game(800, 400);
var assets = ["assets/images/player.png", "assets/images/trunks.png"];
game.start(assets, new LevelState(game));
