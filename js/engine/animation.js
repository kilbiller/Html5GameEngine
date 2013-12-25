define(function () {

    /**
    Animation class
    @class Animation
    **/
    var Animation = function (spriteSheet, frameWidth, frameHeight, frameList, frameDuration, loop) {

        this.spriteSheet = spriteSheet;
        this.frameWidth = frameWidth;
        this.frameHeight= frameHeight;
        this.frameList = frameList;
        this.frameDuration = frameDuration;
        this.totalTime = this.frameList.length * this.frameDuration;
        this.elapsedTime = 0;
        this.loop = loop;

        this.maxColumn = this.spriteSheet.width / this.frameWidth;
        this.maxRow = this.spriteSheet.height / this.frameHeight;
    }

    /**
    Draw the current frame on the screen at the specified location.
    @method drawFrame
    **/
    Animation.prototype.drawFrame = function(tick, ctx, x, y, scaleBy) {
        var scaleBy = scaleBy || 1;
        this.elapsedTime += tick;
        if (this.loop) {
            if (this.isDone()) {
                this.elapsedTime = 0;
            }
        } else if (this.isDone()) {
            return;
        }
        var index = this.currentFrame();
        var source = this.getSourcePos(index);

        ctx.drawImage(this.spriteSheet,
                     source.x,source.y,
                     this.frameWidth, this.frameHeight,
                     x, y,
                     this.frameWidth*scaleBy, this.frameHeight*scaleBy);
    }

    /**
    Return the index of the frame to draw.
    @method currentFrame
    **/
    Animation.prototype.currentFrame = function() {
        return Math.floor(this.elapsedTime / this.frameDuration);
    }

    /**
    Check if the animation loop is done.
    @method isDone
    **/
    Animation.prototype.isDone = function() {
        return (this.elapsedTime >= this.totalTime);
    }

    /**
    Return the top-left corner of the frame to draw.
    @method getSourcePos
    **/
    Animation.prototype.getSourcePos = function(index) {
        var sourceX = (this.frameList[index]%this.maxColumn) * this.frameWidth;
        var sourceY = Math.floor(this.frameList[index]/this.maxColumn) * this.frameHeight;
        return {x: sourceX,y: sourceY}
    }

    /**
    Reset the animation loop.
    @method resetAnim
    **/
    Animation.prototype.resetAnim = function() {
        this.elapsedTime = 0;
    }

    return Animation;
});