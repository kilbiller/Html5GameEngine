"use strict";

var Component = require('./Component');

class Attack extends Component {
  constructor(damage = 100, cooldown = 0.5) {
    super("attack");
    this.damage = damage;
    this.cooldown = cooldown;
    this.isAttacking = false;
    this.canAttack = true;
  }
}

module.exports = Attack;
