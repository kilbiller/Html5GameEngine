"use strict";

var X = require('./X');
var PIXI = require('pixi.js');

var Entities = require('./entities');
var Systems = require('./systems');


class LevelState extends X.State {
  constructor(game) {
    super(game);
  }

  onEnter() {
    var game = this.game;

    var logsTexture = game.assetManager.getImage("logs");
    var playerTexture = game.assetManager.getImage("player");
    var ennemyTexture = game.assetManager.getImage("player");

    // Create the entities.
    game.entities.push(new Entities.Logs(150, 150, 32, 32, logsTexture));
    game.entities.push(new Entities.Logs(180, 230, 32, 32, logsTexture));
    game.entities.push(new Entities.Logs(340, 200, 32, 32, logsTexture));

    game.entities.push(new Entities.Ennemy(300, 300, 32, 32, ennemyTexture));
    game.entities.push(new Entities.Ennemy(400, 300, 32, 32, ennemyTexture));
    game.entities.push(new Entities.Ennemy(300, 20, 32, 32, ennemyTexture));
    game.entities.push(new Entities.Ennemy(50, 300, 32, 32, ennemyTexture));
    game.entities.push(new Entities.Ennemy(90, 300, 32, 32, ennemyTexture));
    game.entities.push(new Entities.Ennemy(0, 400, 32, 32, ennemyTexture));
    game.entities.push(new Entities.Ennemy(868, 400, 32, 32, ennemyTexture));

    var player = new Entities.Player(50, 50, 32, 32, playerTexture);
    game.entities.push(player);

    // Camera follow the player
    this.camera = new X.Camera(game);
    //this.camera.follow(player);

    this.systems = [
      Systems.Input,
      Systems.Animation,
      Systems.Collision,
      Systems.Attack,
      Systems.Render,
      //Systems.Debug
    ];
  }

  update(dt) {
    super.update(dt);

    //console.time('systems');
    var game = this.game;
    for(var system of this.systems){
      system(game.entities, dt, game);
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

module.exports = LevelState;
