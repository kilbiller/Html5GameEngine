import Entity from "../X/Entity";

import SpriteSheet from "../X/SpriteSheet";
import Animations from "../X/Animations";

// COMPONENTS
import Position from "../components/Position";
import Dimension from "../components/Dimension";
import Sprite from "../components/Sprite";
import Animation from "../components/Animation";
import Health from "../components/Health";
import Collider from "../components/Collider";
import Velocity from "../components/Velocity";
import Attack from "../components/Attack";
import UserInput from "../components/UserInput";

export default class Player extends Entity {
  constructor(x, y, width, height, textureName) {
    super("player");
    super.addComponent(new Position(x, y));
    super.addComponent(new Dimension(width, height));
    super.addComponent(new Velocity(200));
    super.addComponent(new UserInput());
    super.addComponent(new Health());
    super.addComponent(new Attack(50));
    super.addComponent(new Collider(6, 20, 20, 10));

    let spriteSheet = new SpriteSheet(textureName, width, height);
    super.addComponent(new Sprite(spriteSheet.getSprite()));
    super.addComponent(
      new Animation(
        new Animations(spriteSheet, {
          idleDown: {
            frames: [0],
            step: 0.15,
            loop: true
          },
          idleUp: {
            frames: [1],
            step: 0.15,
            loop: true
          },
          idleLeft: {
            frames: [2],
            step: 0.15,
            loop: true
          },
          idleRight: {
            frames: [3],
            step: 0.15,
            loop: true
          },
          moveDown: {
            frames: [4, 5, 6, 7],
            step: 0.15,
            loop: true
          },
          moveUp: {
            frames: [8, 9, 10, 11],
            step: 0.15,
            loop: true
          },
          moveLeft: {
            frames: [12, 13, 14, 15],
            step: 0.15,
            loop: true
          },
          moveRight: {
            frames: [16, 17, 18, 19],
            step: 0.15,
            loop: true
          },
          attackDown: {
            frames: [20, 21, 22],
            step: 0.1,
            loop: false
          },
          attackUp: {
            frames: [24, 25, 26],
            step: 0.1,
            loop: false
          },
          attackLeft: {
            frames: [28, 29, 30],
            step: 0.1,
            loop: false
          },
          attackRight: {
            frames: [32, 33, 34],
            step: 0.1,
            loop: false
          },
          death: {
            frames: [36, 37, 38],
            step: 0.12,
            loop: false
          }
        })
      )
    );
  }
}
