"use strict";

import Component from './Component';
import X from '../X';

export default class Position extends Component {
  constructor(x = 0, y = 0) {
    super("position");
    this.current = new X.Vector(x, y);
    this.old = new X.Vector(x, y);
  }
}
