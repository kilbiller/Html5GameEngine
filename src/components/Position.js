"use strict";

import Component from '../X/Component';
import Vector from '../X/Vector';

export default class Position extends Component {
  constructor(x = 0, y = 0) {
    super("position");
    this.current = new Vector(x, y);
  }
}
