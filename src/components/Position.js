"use strict";

import Component from './Component';

import Vector from '../X/Vector';

export default class Position extends Component {
  constructor(x = 0, y = 0) {
    super("position");
    this.current = new Vector(x, y);
    this.old = new Vector(x, y);
  }
}
