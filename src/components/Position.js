"use strict";

var Component = require('./Component');
var X = require('../X');

class Position extends Component {
  constructor(x = 0, y = 0) {
    super("position");
    this.current = new X.Vector(x, y);
    this.old = new X.Vector(x, y);
  }
}

module.exports = Position;
