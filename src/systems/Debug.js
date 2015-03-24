"use strict";

import SystemX from '../X/System';
import PIXI from 'pixi.js';

export default class Debug extends SystemX {
  constructor(game) {
    super(game);
  }

  update(dt) {
    for(var entity of this.game.entities) {
      var ec = entity.components;
      if(ec.sprite) {
        //game.stage.removeChildren();
        var graphics = new PIXI.Graphics();
        /*graphics.lineStyle(1, 0x0000FF, 1);
        graphics.drawRect(ec.sprite.sprite.x, ec.sprite.sprite.y, ec.sprite.sprite.width, ec.sprite.sprite.height);*/
        if(ec.collider) {
          graphics.lineStyle(1, 0xFFFFFF, 1);
          graphics.drawRect(ec.sprite.sprite.x + ec.collider.bounds.x, ec.sprite.sprite.y + ec.collider.bounds.y, ec.collider.bounds.width, ec.collider.bounds.height);
        }
        this.game.stage.addChild(graphics);
      }
    }
  }
}
