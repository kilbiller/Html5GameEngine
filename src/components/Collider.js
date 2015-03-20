"use strict";

var Component = require('./Component');

class Collider extends Component {
  constructor(x = 0, y = 0, width = 0, height = 0) {
    super("collider");
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
  }
}

module.exports = Collider;
