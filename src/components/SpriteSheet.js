"use strict";

var Component = require('./Component');

class SpriteSheet extends Component {
  constructor(spriteSheet) {
    super("spriteSheet");
    this.spriteSheet = spriteSheet;
  }
}

module.exports = SpriteSheet;
