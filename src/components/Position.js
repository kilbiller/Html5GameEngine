"use strict";

var Component = require('./Component');

class Position extends Component {
  constructor(x = 0, y = 0) {
    super("position");

    this.x = x;
    this.y = y;
    this.oldX = x;
    this.oldY = y;
  }
}

module.exports = Position;
