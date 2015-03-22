"use strict";

import Component from './Component';

export default class SpriteSheet extends Component {
  constructor(spriteSheet) {
    super("spriteSheet");
    this.spriteSheet = spriteSheet;
  }
}
