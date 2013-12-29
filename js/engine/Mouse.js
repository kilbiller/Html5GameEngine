define(function () {

    function Mouse(game) {
        this.pos = {x: 0, y:0};
        this.leftClick = false;
        this.middleClick = false;
        this.rightClick = false;
        this.game = game;

        //addEventListener("mousemove", function(e) {this.getPos(e);}.bind(this), false);
        addEventListener("mousedown", function(e) {this.mouseDown(e);}.bind(this), false);
        addEventListener("mouseup", function(e) {this.mouseUp(e);}.bind(this), false);
    }

    Mouse.prototype.getPos = function (e) {
        // Offset to canvas element.
        this.pos.x =  e.clientX - this.game.ctx.canvas.getBoundingClientRect().left;
        this.pos.y =  e.clientY - this.game.ctx.canvas.getBoundingClientRect().top;

        this.pos.x += this.game.camera.viewport.x;
        this.pos.y += this.game.camera.viewport.y;

        //console.log("x : " + this.pos.x + " y : " + this.pos.y)
    }

    Mouse.prototype.mouseDown = function (e) {
        if(e.button === 0)
            this.leftClick = true;
        if(e.button === 1)
            this.middleClick = true;
        if(e.button === 2)
            this.rightClick = true;

        this.getPos(e);
    }

    Mouse.prototype.mouseUp = function (e) {
        this.leftClick = false;
        this.middleClick = false;
        this.rightClick = false;
    }

    return Mouse;
});