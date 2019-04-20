import * as PIXI from "pixi.js";
import Vector from "./Vector";
import { clamp } from "./Utils";

export default class Camera {
  constructor(game, world) {
    this.game = game;
    this.world = world;
    this.target = null;
  }

  follow(target) {
    this.target = target;
  }

  update(dt) {
    if (this.target !== null) {
      let targetCenter = new Vector(
        this.target.components.sprite.sprite.x +
          this.target.components.sprite.sprite.width / 2,
        this.target.components.sprite.sprite.y +
          this.target.components.sprite.sprite.height / 2
      );
      let x = targetCenter.x - this.game.width / 2;
      let y = targetCenter.y - this.game.height / 2;
      x = clamp(
        x,
        0,
        this.game.world.tilemap.width * this.game.world.tilemap.tilewidth -
          this.game.width
      );
      y = clamp(
        y,
        0,
        this.game.world.tilemap.height * this.game.world.tilemap.tileheight -
          this.game.height
      );

      //let lerp = Vector.lerp(new Vector(this.game.renderer.x, this.game.renderer.y), new Vector(x, y), 0.1);
      this.world.x = -x;
      this.world.y = -y;
    }
  }
}
