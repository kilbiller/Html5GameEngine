"use strict";

import Component from '../X/Component';

export default class Animation extends Component {
  constructor(anims) {
    super("animation");
    this.anims = anims;
    this.state = null;
  }
}
