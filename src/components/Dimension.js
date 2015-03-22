"use strict";

var Component = require('./Component');

class Dimension extends Component {
  constructor(width = 0, height = 0) {
    super("dimension");
    this.width = width;
    this.height = height;
  }
}

module.exports = Dimension;
