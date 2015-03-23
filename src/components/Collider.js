"use strict";

import Component from './Component';
import Rectangle from '../X/Rectangle';

export default class Collider extends Component {
  constructor(x = 0, y = 0, width = 0, height = 0) {
    super("collider");
    this.bounds = new Rectangle(x, y, width, height);
  }
}
