"use strict";

var Component = require('./Component');

class Animation extends Component {
  constructor(anims) {
    super("animation");
    this.anims = anims;
  }
}

module.exports = Animation;
