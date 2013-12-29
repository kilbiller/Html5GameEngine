define(function () {

    function Keyboard() {
        this.keysDown = {};

        // Handle keyboard controls.
        addEventListener("keydown", function (e) {this.keysDown[e.keyCode] = true;}.bind(this), false);
        addEventListener("keyup", function (e) {delete this.keysDown[e.keyCode];}.bind(this), false);
    }

    return Keyboard;
});