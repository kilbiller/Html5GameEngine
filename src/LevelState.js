"use strict";

// X
import Camera from './X/Camera';
import State from './X/State';

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
import Debug from './systems/Debug';

export default class LevelState extends State {
  constructor(game) {
    super(game);
  }

  onEnter() {
    var game = this.game;

    var logsTexture = game.assetManager.getImage("logs");
    var playerTexture = game.assetManager.getImage("player");
    var enemyTexture = game.assetManager.getImage("enemy");

    // Create the entities.
    for(var i = 0; i < 20; i++) {
      game.entities.push(new Logs(150 + i * 32, 150, 32, 32, logsTexture));
    }
    game.entities.push(new Logs(150, 150, 32, 32, logsTexture));
    game.entities.push(new Logs(180, 230, 32, 32, logsTexture));
    game.entities.push(new Logs(340, 200, 32, 32, logsTexture));

    game.entities.push(new Enemy(300, 300, 32, 32, enemyTexture));
    game.entities.push(new Enemy(400, 300, 32, 32, enemyTexture));
    game.entities.push(new Enemy(300, 20, 32, 32, enemyTexture));
    game.entities.push(new Enemy(50, 300, 32, 32, enemyTexture));
    game.entities.push(new Enemy(90, 300, 32, 32, enemyTexture));
    game.entities.push(new Enemy(0, 400, 32, 32, enemyTexture));
    game.entities.push(new Enemy(868, 400, 32, 32, enemyTexture));

    var player = new Player(50, 50, 32, 32, playerTexture);
    game.entities.push(player);

    // Camera follow the player
    this.camera = new Camera(game);
    //this.camera.follow(player);

    this.systems = [
      new Input(game),
      new AI(game),
      new Collision(game),
      new Movement(game),
      new Attack(game),
      new Animation(game),
      new Render(game),
      //new Debug(game)
    ];
  }

  update(dt) {
    super.update(dt);

    //console.time('systems');
    var game = this.game;
    for(var system of this.systems) {
      system.update(dt);
    }
    //console.timeEnd('systems');

    this.camera.update();

    /*//Spawn a box each time left mouse button is clicked
     if (game.mouse.leftClick) {
     game.entities.push(new StaticObject(game, game.mouse.pos.x, game.mouse.pos.y, 32, 32, "img/trunks.png"));
     }*/

    /*var game = this.game;
     for (var i = 0; i < game.entities.length; i += 1) {
     if (!game.entities[i].removeFromWorld) {
     game.entities[i].update(dt);
     }
     }*/

    /*for (i = game.entities.length - 1; i >= 0;  i -= 1) {
     if (game.entities[i].removeFromWorld) {
     game.entities.splice(i, 1);
     }
     }*/
  }

  onExit() {}
}
