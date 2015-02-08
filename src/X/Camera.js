"use strict";

var Rectangle = require('./Rectangle');

class Camera {
  constructor(x, y, width, height) {
    this.viewport = new Rectangle(x, y, width, height);
    // Entity that should be followed.
    this.followed = null;
  }

  offset(x, y) {
    this.viewport.offset(x, y);
  }

  follow(entity) {
    this.followed = entity;
  }

  update(stage) {
    // Keep following the entity.
    if (this.followed !== null) {
      this.offset((this.followed.pos.x  + this.followed.width / 2) - this.viewport.width / 2,
                  (this.followed.pos.y + this.followed.height / 2) - this.viewport.height / 2);
    }

    stage.getChildAt(0).position.x = -this.viewport.x;
    stage.getChildAt(0).position.y = -this.viewport.y;
  }
}

module.exports = Camera;
