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
import Trigger from './systems/Trigger';

export default class LevelState extends State {
  constructor(game) {
    super(game);
  }

  onEnter(params) {
    let world = this.game.world;

    world.tilemap = new Tilemap(this.game, this.game.assetManager.getJson("test"), this.game.assetManager.getImage("tileset"));
    world.tilemap.load();

    let playerTexture = this.game.assetManager.getImage("player");
    let enemyTexture = this.game.assetManager.getImage("enemy");

    world.entities.push(new Enemy(300, 300, 32, 32, enemyTexture));
    world.entities.push(new Enemy(400, 300, 32, 32, enemyTexture));
    world.entities.push(new Enemy(300, 20, 32, 32, enemyTexture));
    world.entities.push(new Enemy(50, 300, 32, 32, enemyTexture));
    world.entities.push(new Enemy(90, 300, 32, 32, enemyTexture));
    world.entities.push(new Enemy(50, 400, 32, 32, enemyTexture));
    world.entities.push(new Enemy(868, 400, 32, 32, enemyTexture));

    let player;
    if(params.player) {
      player = params.player;
      player.components.position.current.x = 50;
      player.components.position.current.y = 50;
    } else {
      player = new Player(50, 50, 32, 32, playerTexture);
    }
    world.entities.push(player);

    // Camera follow the player
    this.camera = new Camera(this.game, this.game.worldDoc);
    this.camera.follow(player);

    this.systems = [
      new Input(this.game),
      new AI(this.game),
      new Collision(this.game),
      new Movement(this.game),
      new Attack(this.game),
      new Animation(this.game),
      new Trigger(this.game),
      new Render(this.game),
      new UI(this.game),
      //new Debug(game)
    ];

    // Add each entity sprite to the renderer
    for(let entity of world.entities) {
      if(entity.components.sprite) {
        this.game.worldDoc.addChild(entity.components.sprite.sprite);
      }
    }
  }

  update(dt) {
    super.update(dt);

    //console.time('systems');
    let game = this.game;
    for(let system of this.systems) {
      system.update(dt);
    }
    //console.timeEnd('systems');

    this.camera.update(dt);

    /*//Spawn a box each time left mouse button is clicked
     if (game.mouse.leftClick) {
     game.entities.push(new StaticObject(game, game.mouse.pos.x, game.mouse.pos.y, 32, 32, "img/trunks.png"));
     }*/
  }

  onExit() {
    this.game.worldDoc.removeChildren();
    this.game.uiDoc.removeChildren();
    this.game.world.entities = [];
    this.game.world.tilemap = null;
  }
}
