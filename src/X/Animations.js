"use strict";

var Animation = require('./Animation');

class Animations {
  constructor(spriteSheet, animData) {
    this.anims = [];
    this.spriteSheet = spriteSheet;
    this.current = null;

    var anim, data;
    try {
      data = JSON.parse(animData);
    } catch (e) {
      data = animData;
    }

    for (anim in data) {
      if (data.hasOwnProperty(anim)) {
        this.addAnim(anim, data[anim].frames, data[anim].step, data[anim].loop);
      }
    }
  }

  addAnim(name, frames, step, loop) {
    this.anims[name] = new Animation(this.spriteSheet, frames, step, loop);
  }

  setAnim(name) {
    this.current = name;
    for (var anim in this.anims) {
      this.anims[anim].visible = false;
    }
    this.anims[anim].visible = true;
  }

  getCurrent() {
    return this.anims[this.current];
  }
}

module.exports = Animations;
