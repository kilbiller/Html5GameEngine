"use strict";

var Component = require('./Component');

class Direction extends Component {
  constructor(direction = "Down") {
    super("direction");
    this.value = direction;
  }
}

module.exports = Direction;
