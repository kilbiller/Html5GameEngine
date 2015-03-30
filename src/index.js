import Game from "./X/Game";
import LevelState from "./LevelState";

let width = 1024;
//let height = width / 16 * 9;
let height = 576;

let game = new Game(width, height);

// textures
game.assetManager.addImage("player", "assets/images/player.png");
game.assetManager.addImage("enemy", "assets/images/enemy.png");
game.assetManager.addImage("tileset", "assets/images/tileset.png");

// SFX
game.assetManager.addSound("punch", "assets/sounds/punch.wav");
game.assetManager.addSound("tilemap_transition", "assets/sounds/tilemap_transition.wav");

//Tilemaps
game.assetManager.addJson("test", "assets/maps/test.json");
game.assetManager.addJson("test2", "assets/maps/test2.json");

// Bitmap fonts
game.assetManager.addFont("consolas", "assets/fonts/consolas.fnt");

// states
game.stateManager.add("level", new LevelState(game));
game.stateManager.add("level2", new LevelState(game));

// TODO default state ?
game.start("level");
