/*global define*/
/*jslint browser: true*/
define(function () {

    "use strict";
    function Keyboard() {
        this.keysDown = {};

        // Handle keyboard controls.
        window.addEventListener("keydown", function (e) {this.keysDown[e.keyCode] = true; }.bind(this), false);
        window.addEventListener("keyup", function (e) {delete this.keysDown[e.keyCode]; }.bind(this), false);
    }

    return Keyboard;
});
