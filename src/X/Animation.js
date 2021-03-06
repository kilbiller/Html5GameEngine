export default class Animation {
  constructor(spriteSheet, frameList, frameDuration, loop) {
    this.spriteSheet = spriteSheet;
    this.frameList = frameList;
    this.frameDuration = frameDuration;
    this.totalTime = this.frameList.length * this.frameDuration;
    this.elapsedTime = 0;
    this.loop = loop;
  }

  update(dt) {
    this.elapsedTime += dt;

    if(this.isDone()) {
      if(this.loop) {
        this.reset();
      } else {
        return;
      }
    }

    let index = this.currentFrame();
    this.spriteSheet.sprite.texture = this.spriteSheet.textures[this.frameList[index]];
  }

  currentFrame() {
    if(this.elapsedTime <= this.totalTime) {
      return Math.floor(this.elapsedTime / this.frameDuration);
    } else {
      return this.frameList.length - 1;
    }
  }

  isDone() {
    return(this.elapsedTime >= this.totalTime);
  }

  reset() {
    this.elapsedTime = 0;
  }
}
