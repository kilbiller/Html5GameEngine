"use strict";

import Component from './Component';
import X from '../X';

export default class Collider extends Component {
  constructor(x = 0, y = 0, width = 0, height = 0) {
    super("collider");
    this.bounds = new X.Rectangle(x, y, width, height);
  }
}
