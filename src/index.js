"use strict";

var Game = require('./Game');

var game = new Game(800, 400);

var assets = ["assets/images/player.png", "assets/images/trunks.png"];

game.run(assets);
