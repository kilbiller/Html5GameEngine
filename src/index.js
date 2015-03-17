"use strict";

var X = require('./X');
var LevelState = require('./LevelState');

var game = new X.Game(800, 400);
var images = ["assets/images/player.png", "assets/images/logs.png"];
var sound = "assets/sounds/punch.wav";
game.start(images, sound, new LevelState(game));
