"use strict";

var Component = require('./Component');

class Animation extends Component {
  constructor(anims, state = null) {
    super("animation");
    this.anims = anims;
    this.state = state;
  }
}

module.exports = Animation;
