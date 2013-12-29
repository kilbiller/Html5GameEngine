define(function () {
    function Rectangle (x, y, width, height) {
        this.x = x || 0;
        this.y = y || 0;
        this.width = width || 0;
        this.height = height || 0;
    }

    Rectangle.prototype.moveTo = function (x, y) {
        this.x = x || this.x;
        this.y = y || this.y;
    }

    Rectangle.prototype.move = function (x, y) {
        this.x += x || 0;
        this.y += y || 0;
    }

    Rectangle.prototype.draw = function (ctx, color, scaleBy) {
        var scaleBy = scaleBy || 1;
        var color = color || null;

        ctx.save();
        if(color != null)
            ctx.strokeStyle = color;

        // Round the numbers to prevent sub-pixel drawing on canvas.
        // (prevent blurring and supposedly improve performance)
        var x = (this.x + .5) | 0;
        var y = (this.y + .5) | 0;

        ctx.strokeRect(x, y, this.width*scaleBy, this.height*scaleBy);

        ctx.restore();
    }

    Rectangle.prototype.intersects = function (rect) {
        return  (this.x <= rect.x + rect.width &&
                this.x + this.width >= rect.x &&
                this.y <= rect.y + rect.height &&
                this.y + this.height >= rect.y);
    }

    return Rectangle;
});