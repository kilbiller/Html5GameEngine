"use strict";

var State = require('./engine/State'),
    Camera = require('./engine/Camera'),
    Player = require('./Player'),
    Ennemy = require('./Ennemy'),
    StaticObject = require('./StaticObject');


function LevelState(game) {
    State.call(this, game);
}

LevelState.prototype = Object.create(State.prototype);

LevelState.prototype.onEnter = function () {
    var game = this.game;

    game.entities = new PIXI.DisplayObjectContainer();

    var trunksPath = "assets/images/trunks.png";
    var playerPath = "assets/images/player.png";

    // Create the entities.
    game.entities.addChild(new StaticObject(game, 150, 150, 32, 32, trunksPath));
    game.entities.addChild(new StaticObject(game, 180, 230, 32, 32, trunksPath));
    game.entities.addChild(new StaticObject(game, 340, 200, 32, 32, trunksPath));

    game.entities.addChild(new Ennemy(game, 300, 300, 32, 32, playerPath));
    game.entities.addChild(new Ennemy(game, 400, 300, 32, 32, playerPath));
    game.entities.addChild(new Ennemy(game, 300, 20, 32, 32, playerPath));
    game.entities.addChild(new Ennemy(game, 50, 300, 32, 32, playerPath));
    game.entities.addChild(new Ennemy(game, 90, 300, 32, 32, playerPath));

    game.entities.addChild(new Player(game, 50, 50, 32, 32, playerPath));

    //Follow the player
    //game.camera.follow(game.entities.children[game.entities.children.length - 1]);

    game.stage.addChild(game.entities);
};

LevelState.prototype.update = function (dt) {
    State.prototype.update.call(this, dt);

    /*//Spawn a box each time left mouse button is clicked
    if (game.mouse.leftClick) {
        game.entities.push(new StaticObject(game, game.mouse.pos.x, game.mouse.pos.y, 32, 32, "img/trunks.png"));
    }*/

    var game = this.game;
    for (var i = 0; i < game.entities.children.length; i += 1) {
        if (!game.entities.children[i].removeFromWorld) {
            game.entities.children[i].update(dt);
        }
    }

    for (i = game.entities.children.length - 1; i >= 0;  i -= 1) {
        if (game.entities.children[i].removeFromWorld) {
            game.entities.children.splice(i, 1);
        }
    }

    game.entities.children.sort(function (a, b) { return a.zIndex - b.zIndex; });

    game.camera.update(game.stage);
};

LevelState.prototype.onExit = function () {};

module.exports = LevelState;
