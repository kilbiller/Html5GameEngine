"use strict";

import SystemX from '../X/System';
import PIXI from 'pixi.js';

export default class Debug extends SystemX {
  constructor(game) {
    super(game);
    this.doc = new PIXI.DisplayObjectContainer();
    this.game.ui.addChild(this.doc);
  }

  //TODO reduce cpu load (maybe put the text creation in health component)
  update(dt) {
    this.doc.removeChildren();
    for(var entity of this.game.entities) {
      var ec = entity.components;
      if(entity.type === "player") {
        var playerHPBar = new PIXI.Text("Health: " + ec.health.hp, {
          font: "30px Arial",
          fill: "#FFFFFF",
          stroke: "#000000",
          strokeThickness: 3
        });
        this.doc.addChild(playerHPBar);
      }
      if(entity.type === "enemy" && ec.health.isAlive) {
        var enemyHPBar = new PIXI.Text("Health: " + ec.health.hp, {
          font: "12px Arial",
          fill: "#FFFFFF",
          stroke: "#000000",
          strokeThickness: 3
        });
        enemyHPBar.x = ec.sprite.sprite.x + this.game.world.x;
        enemyHPBar.y = ec.sprite.sprite.y + this.game.world.y - enemyHPBar.height;
        this.doc.addChild(enemyHPBar);
      }
    }
  }
}
