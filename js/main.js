/*global define*/
define(function (require) {

    "use strict";
    var Game = require('game'),
        game;

    game = new Game(800, 400);
    game.run();
});
