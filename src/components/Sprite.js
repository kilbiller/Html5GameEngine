"use strict";

import Component from './Component';

export default class Sprite extends Component {
  constructor(sprite) {
    super("sprite");

    this.sprite = sprite;
  }
}
