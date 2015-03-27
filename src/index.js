"use strict";

import Game from './X/Game';
import LevelState from './LevelState';

var width = 1024;
//var height = width / 16 * 9;
var height = 576;

var game = new Game(width, height);

game.assetManager.addImage("player", "assets/images/player.png");
game.assetManager.addImage("enemy", "assets/images/enemy.png");
game.assetManager.addImage("tileset", "assets/images/PathAndObjects_0.png");

game.assetManager.addSound("punch", "assets/sounds/punch.wav");

game.assetManager.addJson("test", "assets/maps/test.json");

game.assetManager.addFont("consolas", "assets/fonts/consolas.fnt");

// TODO default state ?
game.start(new LevelState(game));
