import Animation from "./Animation";

export default class Animations {
  constructor(spriteSheet, animData) {
    this.anims = [];
    this.spriteSheet = spriteSheet;
    this.current = null;

    let data;
    try {
      data = JSON.parse(animData);
    } catch(e) {
      data = animData;
    }

    for(let anim in data) {
      if(data.hasOwnProperty(anim)) {
        this.addAnim(anim, data[anim].frames, data[anim].step, data[anim].loop);
      }
    }
  }

  addAnim(name, frames, step, loop) {
    this.anims[name] = new Animation(this.spriteSheet, frames, step, loop);
  }

  setAnim(name) {
    this.current = name;
    for(let anim of this.anims) {
      anim.visible = false;
    }
    this.anims[name].visible = true;
  }

  getCurrent() {
    return this.anims[this.current];
  }
}
