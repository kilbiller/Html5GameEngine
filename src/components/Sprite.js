"use strict";

var Component = require('./Component');

class Sprite extends Component {
  constructor(sprite) {
    super("sprite");

    this.sprite = sprite;
  }
}

module.exports = Sprite;
