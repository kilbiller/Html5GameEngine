"use strict";

import Entity from '../X/Entity';

import PIXI from 'pixi.js';

import Position from '../components/Position';
import Dimension from '../components/Dimension';
import Sprite from '../components/Sprite';
import Collider from '../components/Collider';

export default class Logs extends Entity {
  constructor(x, y, width, height, textureName) {
    super("logs");
    super.addComponent(new Position(x, y));
    super.addComponent(new Dimension(width, height));
    super.addComponent(new Sprite(new PIXI.Sprite.fromImage(textureName)));
    super.addComponent(new Collider(0, 6, width, height - 6));
  }
}
