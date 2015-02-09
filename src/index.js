"use strict";

var X = require('./X');
var LevelState = require('./LevelState');

var game = new X.Game(800, 400);
var images = ["assets/images/player.png", "assets/images/trunks.png"];
var sound = "assets/sounds/test.mp3";
game.start(images, sound, new LevelState(game));
