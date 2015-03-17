"use strict";

var Component = require('./Component');

class Speed extends Component {
  constructor(value = 150) {
    super("speed");
    this.value = value;
  }
}

module.exports = Speed;
