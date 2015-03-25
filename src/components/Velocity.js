"use strict";

import Component from '../X/Component';
import Vector from '../X/Vector';

export default class Velocity extends Component {
  constructor(speed = 150) {
    super("velocity");
    this.current = Vector.Zero;
    this.speed = speed;
  }
}
