"use strict";

import Component from '../X/Component';

export default class Animation extends Component {
  constructor(anims, state = null) {
    super("animation");
    this.anims = anims;
    this.state = state;
  }
}
