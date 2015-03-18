"use strict";

var Component = require('./Component');

class Health extends Component {
  constructor(hp = 100) {
    super("health");
    this.hp = hp;
    this.isAlive = true;
  }
}

module.exports = Health;
