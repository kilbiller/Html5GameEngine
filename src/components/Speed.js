"use strict";

import Component from '../X/Component';

export default class Speed extends Component {
  constructor(value = 150) {
    super("speed");
    this.value = value;
  }
}
