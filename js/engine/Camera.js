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

Camera.prototype.update = function () {
    // Keep following the entity.
    if (this.followed !== null) {
        this.offset((this.followed.pos.x  + this.followed.width / 2) - this.viewport.width / 2,
                    (this.followed.pos.y + this.followed.height / 2) - this.viewport.height / 2);
    }
};

Camera.prototype.transform = function (ctx) {
    var x, y;
    // Round the numbers to prevent sub-pixel drawing on canvas.
    // (prevent blurring and supposedly improve performance)
    x = Math.round(this.viewport.x);
    y = Math.round(this.viewport.y);
    ctx.translate(-x, -y);
};

module.exports = Camera;
