define(['engine/Rectangle'], function (Rectangle) {

    function Camera (x, y, width, height) {
        this.viewport = new Rectangle(x, y, width, height);
        // Entity that should be followed.
        this.followed = null;
    }

    Camera.prototype.moveTo = function (x, y) {
        this.viewport.moveTo(x, y);
    }

    Camera.prototype.follow = function(entity) {
        this.followed = entity;
    }

    Camera.prototype.update = function() {
        // Keep following the entity.
        if(this.followed != null)
        {
            this.moveTo((this.followed.pos.x  + this.followed.width/2) - this.viewport.width/2,
                        (this.followed.pos.y + this.followed.height/2) - this.viewport.height/2);
        }
    }

    Camera.prototype.transform = function(ctx) {
        // Round the numbers to prevent sub-pixel drawing on canvas.
        // (prevent blurring and supposedly improve performance)
        var x = (this.viewport.x + .5) | 0;
        var y = (this.viewport.y + .5) | 0;
        ctx.translate(-x,-y);
    }

    return Camera;
});