define(function (GameEngine,Player) {
    function Rectangle (x, y, width, height) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
    }

    Rectangle.prototype.setPosition = function (x, y) {
        this.x = x;
        this.y = y;
    }

    Rectangle.prototype.draw = function (ctx,scaleBy) {
        var scaleBy = scaleBy || 1;
        ctx.strokeRect(this.x, this.y, this.width*scaleBy, this.height*scaleBy);
    }

    Rectangle.prototype.intersects = function (rect) {
        return  this.x <= rect.x + rect.width &&
                this.x + this.width >= rect.x &&
                this.y <= rect.y + rect.height &&
                this.y + this.height >= rect.y
    }

    return Rectangle;
});