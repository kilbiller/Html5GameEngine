"use strict";

var Component = require('./Component');

class Attack extends Component {
  constructor(damage = 100, cooldownTime = 0.5) {
    super("attack");
    this.damage = damage;
    this.COOLDOWN_TIME = cooldownTime;
    this.cooldown = 0;
    this.isAttacking = false;
    this.canAttack = true;
  }
}

module.exports = Attack;
