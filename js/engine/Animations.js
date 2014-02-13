"use strict";

var Animation = require('./Animation');

/**
Animations class
@class Animations
**/
function Animations(spriteSheet, animData) {
    this.anims = [];
    this.spriteSheet = spriteSheet;


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

Animations.prototype.addAnim = function (name, frames, step, loop) {
    this.anims[name] = new Animation(this.spriteSheet, frames, step, loop);
};

Animations.prototype.getAnim = function (name) {
    return this.anims[name];
};

module.exports = Animations;
