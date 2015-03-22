"use strict";

import X from './../X';
import PIXI from 'pixi.js';
import Entity from './Entity';
import Components from '../components';

export default class Logs extends Entity {
  constructor(x, y, width, height, textureName) {
    super("logs");
    super.addComponent(new Components.Position(x, y));
    super.addComponent(new Components.Dimension(width, height));
    super.addComponent(new Components.Sprite(new PIXI.Sprite.fromImage(textureName)));
    super.addComponent(new Components.Collider(0, 6, width, height - 6));
  }
}
