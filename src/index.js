"use strict";

import Game from './X/Game';
import LevelState from './LevelState';

var width = 900;
var height = width / 16 * 9;

var game = new Game(width, height);

game.assetManager.addImage("player", "assets/images/player.png");
game.assetManager.addImage("logs", "assets/images/logs.png");
game.assetManager.addSound("punch", "assets/sounds/punch.wav");

// TODO default state ?
game.start(new LevelState(game));
