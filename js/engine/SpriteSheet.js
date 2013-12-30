/*global define*/
define(function () {

    "use strict";
    function SpriteSheet(image, width, height) {
        this.image = image;
        this.frameWidth = width;
        this.frameHeight = height;

        this.maxColumn = this.image.width / this.frameWidth;
        this.maxRow = this.image.height / this.frameHeight;
    }

    SpriteSheet.prototype.getImage = function () {
        return this.image;
    };

    return SpriteSheet;
});
