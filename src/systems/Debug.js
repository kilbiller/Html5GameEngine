import SystemX from "../X/System";
import PIXI from "pixi.js";

export default class Debug extends SystemX {
  constructor(game) {
    super(game);
    this.doc = new PIXI.DisplayObjectContainer();
    this.game.worldDoc.addChild(this.doc);
  }

  update(dt) {
    this.doc.removeChildren();
    for(let entity of this.game.world.entities) {
      let ec = entity.components;
      if(ec.sprite) {
        let graphics = new PIXI.Graphics();
        if(ec.collider) {
          graphics.lineStyle(1, 0xFFFFFF, 1);
          graphics.drawRect(ec.sprite.sprite.x + ec.collider.bounds.x, ec.sprite.sprite.y + ec.collider.bounds.y, ec.collider.bounds.width, ec.collider.bounds.height);
        }
        this.doc.addChild(graphics);
      }
    }
  }
}
