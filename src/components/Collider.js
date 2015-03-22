"use strict";

var Component = require('./Component');
var X = require('../X');

class Collider extends Component {
  constructor(x = 0, y = 0, width = 0, height = 0) {
    super("collider");
    this.bounds = new X.Rectangle(x, y, width, height);
  }
}

module.exports = Collider;
