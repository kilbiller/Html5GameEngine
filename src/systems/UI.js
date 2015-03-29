import SystemX from "../X/System";
import PIXI from "pixi.js";

export default class UI extends SystemX {
  constructor(game) {
    super(game);
    this.doc = new PIXI.DisplayObjectContainer();
    this.game.uiDoc.addChild(this.doc);
    this.texts = {};
  }

  update(dt) {
    //this.doc.removeChildren();
    for(let entity of this.game.world.entities) {
      let ec = entity.components;
      if(entity.type === "player") {
        if(!this.texts[entity.id]) {
          let playerHPBar = new PIXI.BitmapText("Health: " + ec.health.hp, {
            font: "18px Consolas",
            fill: "#FFFFFF",
            stroke: "#000000",
            strokeThickness: 3
          });
          this.doc.addChild(playerHPBar);
          this.texts[entity.id] = playerHPBar;
        } else {
          this.texts[entity.id].setText("Health: " + ec.health.hp);
        }
      }
      if(entity.type === "enemy") {
        if(ec.health.isAlive && !this.texts[entity.id]) {
          let enemyHPBar = new PIXI.BitmapText("Health: " + ec.health.hp, {
            font: "18px Consolas"
          });
          this.doc.addChild(enemyHPBar);
          this.texts[entity.id] = enemyHPBar;
        }
        if(this.texts[entity.id]) {
          this.texts[entity.id].setText("Health: " + ec.health.hp);
          this.texts[entity.id].x = ec.sprite.sprite.x + this.game.world.x;
          this.texts[entity.id].y = ec.sprite.sprite.y + this.game.world.y - this.texts[entity.id].height;

          if(!ec.health.isAlive) {
            this.doc.removeChild(this.texts[entity.id]);
            delete this.texts[entity.id];
          }
        }
      }
    }
  }
}
