"use strict";

import Component from '../X/Component';

export default class Direction extends Component {
  constructor(direction = "Down") {
    super("direction");
    this.value = direction;
  }
}
