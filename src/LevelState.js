"use strict";

// X
import Camera from './X/Camera';
import State from './X/State';
import Tilemap from './X/Tilemap';

// ENTITIES
import Player from "./entities/Player";
import Enemy from "./entities/Enemy";
import Logs from "./entities/Logs";

// SYSTEMS
import Input from './systems/Input';
import AI from './systems/AI';
import Movement from './systems/Movement';
import Animation from './systems/Animation';
import Collision from './systems/Collision';
import Attack from './systems/Attack';
import Render from './systems/Render';
import UI from './systems/UI';
import Debug from './systems/Debug';

export default class LevelState extends State {
  constructor(game) {
    super(game);
  }

  onEnter() {
    var game = this.game;

    game.tilemap = new Tilemap(game, game.assetManager.getJson("test"), game.assetManager.getImage("tileset"));
    game.tilemap.load();

    var playerTexture = game.assetManager.getImage("player");
    var enemyTexture = game.assetManager.getImage("enemy");

    game.entities.push(new Enemy(300, 300, 32, 32, enemyTexture));
    game.entities.push(new Enemy(400, 300, 32, 32, enemyTexture));
    game.entities.push(new Enemy(300, 20, 32, 32, enemyTexture));
    game.entities.push(new Enemy(50, 300, 32, 32, enemyTexture));
    game.entities.push(new Enemy(90, 300, 32, 32, enemyTexture));
    game.entities.push(new Enemy(50, 400, 32, 32, enemyTexture));
    game.entities.push(new Enemy(868, 400, 32, 32, enemyTexture));

    var player = new Player(50, 50, 32, 32, playerTexture);
    game.entities.push(player);

    // Camera follow the player
    this.camera = new Camera(game, game.world);
    this.camera.follow(player);

    this.systems = [
      new Input(game),
      new AI(game),
      new Collision(game),
      new Movement(game),
      new Attack(game),
      new Animation(game),
      new Render(game),
      new UI(game),
      //new Debug(game)
    ];

    // Add each entity sprite to the renderer
    for(var entity of game.entities) {
      if(entity.components.sprite) {
        game.world.addChild(entity.components.sprite.sprite);
      }
    }
  }

  update(dt) {
    super.update(dt);

    //console.time('systems');
    var game = this.game;
    for(var system of this.systems) {
      system.update(dt);
    }
    //console.timeEnd('systems');

    this.camera.update(dt);

    /*//Spawn a box each time left mouse button is clicked
     if (game.mouse.leftClick) {
     game.entities.push(new StaticObject(game, game.mouse.pos.x, game.mouse.pos.y, 32, 32, "img/trunks.png"));
     }*/
  }

  onExit() {}
}
