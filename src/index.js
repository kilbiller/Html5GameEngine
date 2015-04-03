import Game from "./X/Game";
import LevelState from "./LevelState";

let width = 1024;
//let height = width / 16 * 9;
let height = 576;

let game = new Game(width, height);

// textures
game.assetManager.addImage("player", "images/player.png");
game.assetManager.addImage("enemy", "images/enemy.png");
game.assetManager.addImage("tileset", "images/tileset.png");

// SFX
game.assetManager.addSound("punch", "sounds/punch.wav");
game.assetManager.addSound("tilemap_transition", "sounds/tilemap_transition.wav");

//Tilemaps
game.assetManager.addJson("test", "maps/test.json");
game.assetManager.addJson("test2", "maps/test2.json");

// Bitmap fonts
game.assetManager.addFont("consolas", "fonts/consolas.fnt");

// states
game.stateManager.add("level", new LevelState(game));
game.stateManager.add("level2", new LevelState(game));

// TODO default state ?
game.start("level");
