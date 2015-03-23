"use strict";

import Component from './Component';
import Vector from '../X/Vector';

export default class Velocity extends Component {
  constructor(speed = 150) {
    super("velocity");
    this.current = new Vector();
    this.speed = speed;
  }
}
