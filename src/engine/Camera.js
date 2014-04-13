"use strict";

var Rectangle = require('./Rectangle');

function Camera(x, y, width, height) {
    this.viewport = new Rectangle(x, y, width, height);
    // Entity that should be followed.
    this.followed = null;
}

Camera.prototype.offset = function (x, y) {
    this.viewport.offset(x, y);
};

Camera.prototype.follow = function (entity) {
    this.followed = entity;
};

Camera.prototype.update = function (stage) {
    // Keep following the entity.
    if (this.followed !== null) {
        this.offset((this.followed.pos.x  + this.followed.width / 2) - this.viewport.width / 2,
                    (this.followed.pos.y + this.followed.height / 2) - this.viewport.height / 2);
    }

    stage.getChildAt(0).position.x = -this.viewport.x;
    stage.getChildAt(0).position.y = -this.viewport.y;
};

module.exports = Camera;
