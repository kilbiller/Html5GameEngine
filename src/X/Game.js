"use strict";

import Time from './Time';
import AssetManager from './AssetManager';
import Mouse from './Mouse';
import PIXI from 'pixi.js';
import StateManager from './StateManager';

export default class Game {
  constructor(width = 427, height = 240) {
    this.stage = new PIXI.Stage(0x008000);
    this.renderer = PIXI.autoDetectRenderer(width, height);
    document.body.appendChild(this.renderer.view);

    this.time = new Time();
    this.assetManager = new AssetManager();
    //this.mouse = new Mouse(this);

    this.entities = [];
    this.stateManager = new StateManager();
  }

  update(dt) {
    this.stateManager.update(dt);
  }

  render() {
    this.renderer.render(this.stage);
  }

  gameloop() {
    var dt = this.time.tick();
    this.update(dt);
    this.render();
    requestAnimationFrame(this.gameloop.bind(this));
  }

  start(state) {
    var game = this;
    this.assetManager.loadAll().then(function() {
      game.stateManager.push(state);
      game.gameloop();
    });
  }
}
