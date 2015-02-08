"use strict";

var X = require('./X');
var Player = require('./Player');
var Ennemy = require('./Ennemy');
var StaticObject = require('./StaticObject');
var PIXI = require('pixi.js');


class LevelState extends X.State {
  constructor(game) {
    super(game);
  }

  onEnter() {
    var game = this.game;

    game.entities = [];

    var trunksTexture = PIXI.Texture.fromImage("assets/images/trunks.png");
    var playerTexture = PIXI.Texture.fromImage("assets/images/player.png");
    var ennemyTexture = PIXI.Texture.fromImage("assets/images/player.png");

    // Create the entities.
    game.entities.push(new StaticObject(game, 150, 150, 32, 32, trunksTexture));
    game.entities.push(new StaticObject(game, 180, 230, 32, 32, trunksTexture));
    game.entities.push(new StaticObject(game, 340, 200, 32, 32, trunksTexture));

    /*game.entities.push(new Ennemy(game, 300, 300, 32, 32, playerTexture));
    game.entities.push(new Ennemy(game, 400, 300, 32, 32, playerTexture));
    game.entities.push(new Ennemy(game, 300, 20, 32, 32, playerTexture));
    game.entities.push(new Ennemy(game, 50, 300, 32, 32, playerTexture));
    game.entities.push(new Ennemy(game, 90, 300, 32, 32, ennemyTexture));*/

    game.entities.push(new Player(game, 50, 50, 32, 32, playerTexture));

    // Camera follow the player
    //game.camera.follow(game.entities.children[game.entities.children.length - 1]);
  }

  update(dt) {
    super.update(dt);

    /*//Spawn a box each time left mouse button is clicked
    if (game.mouse.leftClick) {
        game.entities.push(new StaticObject(game, game.mouse.pos.x, game.mouse.pos.y, 32, 32, "img/trunks.png"));
    }*/

    var game = this.game;
    for (var i = 0; i < game.entities.length; i += 1) {
      if (!game.entities[i].removeFromWorld) {
        game.entities[i].update(dt);
      }
    }

    for (i = game.entities.length - 1; i >= 0;  i -= 1) {
      if (game.entities[i].removeFromWorld) {
        game.entities.splice(i, 1);
      }
    }

    game.entities.sort(function (a, b) { return a.zIndex - b.zIndex; });

    //game.camera.update(game.stage);
  }

  onExit() {}
}

module.exports = LevelState;
