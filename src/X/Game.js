"use strict";

import Time from './Time';
import AssetManager from './AssetManager';
import Mouse from './Mouse';
import PIXI from 'pixi.js';
import StateManager from './StateManager';
import Stats from 'stats-js';

export default class Game {
  constructor(width = 427, height = 240) {
    this.width = width;
    this.height = height;
    this.stage = new PIXI.Stage(0x000000);
    this.renderer = PIXI.autoDetectRenderer(width, height);
    document.body.appendChild(this.renderer.view);

    this.time = new Time();
    this.assetManager = new AssetManager();
    //this.mouse = new Mouse(this);

    this.entities = [];
    this.stateManager = new StateManager();

    this.world = new PIXI.DisplayObjectContainer();
    this.stage.addChild(this.world);
    this.ui = new PIXI.DisplayObjectContainer();
    this.stage.addChild(this.ui);

    // fps counter
    this.stats = new Stats();
    this.stats.setMode(0);
    this.stats.domElement.style.position = 'absolute';
    this.stats.domElement.style.left = '1200px';
    this.stats.domElement.style.top = '0px';
    document.body.appendChild(this.stats.domElement);
  }

  update(dt) {
    this.stateManager.update(dt);
  }

  render() {
    this.renderer.render(this.stage);
  }

  gameloop() {
    this.stats.begin();
    var dt = this.time.tick();
    this.update(dt);
    this.render();
    this.stats.end();
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
