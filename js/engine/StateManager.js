/*global define*/
define(function (require) {

    "use strict";

    function StateManager() {
        this.states = [];
    }

    StateManager.prototype.update = function (dt) {
        var state = this.states[this.states.length - 1];
        if (state) {state.update(dt); }
    };

    StateManager.prototype.draw = function (ctx) {
        var state = this.states[this.states.length - 1];
        if (state) {state.draw(ctx); }
    };

    StateManager.prototype.push = function (state) {
        this.states.push(state);
        state.onEnter();
    };

    StateManager.prototype.pop = function () {
        var state = this.states[this.states.length - 1];
        state.onExit();
        return this.states[this.states.length - 1];
    };

    StateManager.prototype.pause = function () {
        var state = this.states[this.states.length - 1];
        if (state.onPause) {
            state.onPause();
        }
    };

    StateManager.prototype.resume = function () {
        var state = this.states[this.states.length - 1];
        if (state.onResume) {
            state.onResume();
        }
    };

    return StateManager;

});
