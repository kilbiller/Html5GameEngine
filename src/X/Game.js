import Time from "./Time";
import AssetManager from "./AssetManager";
import Mouse from "./Mouse";
import * as PIXI from "pixi.js";
import StateManager from "./StateManager";
import Stats from "stats-js";
import EventList from "./EventList";

export default class Game {
  constructor(width = 427, height = 240) {
    this.width = width;
    this.height = height;
    this.stage = new PIXI.Container();
    this.renderer = PIXI.autoDetectRenderer(width, height);
    document.body.appendChild(this.renderer.view);

    this.time = new Time();
    this.assetManager = new AssetManager();
    this.stateManager = new StateManager();
    //this.mouse = new Mouse(this);
    this.eventList = new EventList();

    this.world = {
      entities: [],
      tilemap: null
    };

    this.worldDoc = new PIXI.Container();
    this.stage.addChild(this.worldDoc);
    this.uiDoc = new PIXI.Container();
    this.stage.addChild(this.uiDoc);

    // fps counter
    this.stats = new Stats();
    this.stats.setMode(0);
    this.stats.domElement.style.position = "absolute";
    this.stats.domElement.style.left = "1200px";
    this.stats.domElement.style.top = "0px";
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
    let dt = this.time.tick();
    this.eventList.reset();
    this.update(dt);
    this.render();
    this.stats.end();
    requestAnimationFrame(this.gameloop.bind(this));
  }

  start(stateName) {
    let game = this;
    this.assetManager.loadAll().then(function() {
      game.stateManager.change(stateName);
      game.gameloop();
    });
  }
}
