(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
"use strict";

var Entity = require('./engine/Entity'),
    Rectangle = require('./engine/Rectangle'),
    Vector = require('./engine/Vector');

function Actor(game, x, y, width, height, assetPath) {
    Entity.call(this, game, x, y);
    this.width = width;
    this.height = height;
    this.assetPath = assetPath;

    this.anims = null;
    this.currentAnim = null;
    this.direction = "Down";
    this.hitbox = new Rectangle(0, 0, this.width, this.height);
    this.boundingbox = new Rectangle(0, 0, this.width, this.height);
    this.previousPos = new Vector(this.x, this.y);
    this.isAlive = true;
}

Actor.prototype = Object.create(Entity.prototype);

Actor.prototype.update = function (dt) {
    Entity.prototype.update.call(this, dt);
};

Actor.prototype.die = function () {
    var deathSound = this.game.assetManager.getSound("sounds/slime_death.wav");
    //deathSound.play();
    this.anims.setAnim("death");
    this.isAlive = false;
};

Actor.prototype.getCollisionBox = function () {
    return new Rectangle(this.x + this.boundingbox.x, this.y + this.boundingbox.y,
                         this.boundingbox.width, this.boundingbox.height);
};

Actor.prototype.getHitBox = function () {
    return new Rectangle(this.x + this.hitbox.x, this.y + this.hitbox.y,
                         this.hitbox.width, this.hitbox.height);
};

Actor.prototype.updateCollisions = function () {
    var i, entity, collisionBox;
    collisionBox = this.getCollisionBox();

    for (i = 0; i < this.game.entities.children.length; i += 1) {
        entity = this.game.entities.children[i];
        if (this !== entity && entity.boundingbox !== null && collisionBox.intersects(entity.getCollisionBox())) {
            this.x = this.previousPos.x;
            this.y = this.previousPos.y;
        }
    }
};

module.exports = Actor;

},{"./engine/Entity":12,"./engine/Rectangle":16,"./engine/Vector":21}],2:[function(require,module,exports){
"use strict";

var Actor = require('./Actor'),
    SpriteSheet = require('./engine/SpriteSheet'),
    Animations = require('./engine/Animations'),
    Rectangle = require('./engine/Rectangle'),
    Vector = require('./engine/Vector');

function Ennemy(game, x, y, width, height, assetPath) {
    Actor.call(this, game, x, y, width, height, assetPath);

    this.speed = 150;
    this.hp = 30;
    this.boundingbox = new Rectangle(6, 20, 20, 10);

    var spriteSheet = new SpriteSheet(this.assetPath, this.width, this.height);
    this.anims = new Animations(spriteSheet, {
        idle: {
            frames: [0],
            step: 0.15,
            loop: true
        },
        death: {
            frames: [36, 37, 38],
            step: 0.15,
            loop: false
        }
    });
    this.addChild(this.anims);
}

Ennemy.prototype = Object.create(Actor.prototype);

Ennemy.prototype.update = function (dt) {
    if (this.isAlive) {
        this.anims.setAnim("idle");
    }

    this.anims.getCurrent().update(dt);
    this.zIndex = this.y + this.height;
    this.previousPos = new Vector(this.x, this.y);
};

Ennemy.prototype.takeDamage = function (damage) {
    this.hp -= damage;
    if (this.hp <= 0) {this.die(); }
};

module.exports = Ennemy;

},{"./Actor":1,"./engine/Animations":9,"./engine/Rectangle":16,"./engine/SpriteSheet":17,"./engine/Vector":21}],3:[function(require,module,exports){
"use strict";

var GameEngine = require('./engine/GameEngine'),
    Camera = require('./engine/Camera'),
    Player = require('./Player'),
    StaticObject = require('./StaticObject'),
    Ennemy = require('./Ennemy'),
    StateManager = require('./engine/StateManager'),
    LevelState = require('./LevelState');

function Game(width, height) {
    GameEngine.call(this, width, height);
    this.entities = null;
    this.camera = new Camera(0, 0, width, height);
    this.stateManager = new StateManager();
}

Game.prototype = Object.create(GameEngine.prototype);

Game.prototype.init = function () {
    this.stateManager.push(new LevelState(this));
    this.gameloop();
};

Game.prototype.update = function (dt) {
    this.stateManager.update(dt);
};

module.exports = Game;

},{"./Ennemy":2,"./LevelState":4,"./Player":6,"./StaticObject":7,"./engine/Camera":11,"./engine/GameEngine":13,"./engine/StateManager":19}],4:[function(require,module,exports){
"use strict";

var State = require('./engine/State'),
    Camera = require('./engine/Camera'),
    Player = require('./Player'),
    Ennemy = require('./Ennemy'),
    StaticObject = require('./StaticObject');


function LevelState(game) {
    State.call(this, game);
}

LevelState.prototype = Object.create(State.prototype);

LevelState.prototype.onEnter = function () {
    var game = this.game;

    game.entities = new PIXI.DisplayObjectContainer();

    // Create the entities.
    game.entities.addChild(new StaticObject(game, 150, 150, 32, 32, "img/trunks.png"));
    game.entities.addChild(new StaticObject(game, 180, 230, 32, 32, "img/trunks.png"));
    game.entities.addChild(new StaticObject(game, 340, 200, 32, 32, "img/trunks.png"));

    game.entities.addChild(new Ennemy(game, 300, 300, 32, 32, "img/player.png"));
    game.entities.addChild(new Ennemy(game, 400, 300, 32, 32, "img/player.png"));
    game.entities.addChild(new Ennemy(game, 300, 20, 32, 32, "img/player.png"));
    game.entities.addChild(new Ennemy(game, 50, 300, 32, 32, "img/player.png"));
    game.entities.addChild(new Ennemy(game, 90, 300, 32, 32, "img/player.png"));

    game.entities.addChild(new Player(game, 50, 50, 32, 32, "img/player.png"));

    //Follow the player
    //game.camera.follow(game.entities.children[game.entities.children.length - 1]);

    game.stage.addChild(game.entities);
};

LevelState.prototype.update = function (dt) {
    State.prototype.update.call(this, dt);

    /*//Spawn a box each time left mouse button is clicked
    if (game.mouse.leftClick) {
        game.entities.push(new StaticObject(game, game.mouse.pos.x, game.mouse.pos.y, 32, 32, "img/trunks.png"));
    }*/

    var game = this.game;
    for (var i = 0; i < game.entities.children.length; i += 1) {
        if (!game.entities.children[i].removeFromWorld) {
            game.entities.children[i].update(dt);
        }
    }

    for (i = game.entities.children.length - 1; i >= 0;  i -= 1) {
        if (game.entities.children[i].removeFromWorld) {
            game.entities.children.splice(i, 1);
        }
    }

    game.entities.children.sort(function (a, b) { return a.zIndex - b.zIndex; });

    game.camera.update(game.stage);
};

LevelState.prototype.onExit = function () {};

module.exports = LevelState;

},{"./Ennemy":2,"./Player":6,"./StaticObject":7,"./engine/Camera":11,"./engine/State":18}],5:[function(require,module,exports){
"use strict";

var Game = require('./Game'),
    game;

game = new Game(800, 400);
game.run();

},{"./Game":3}],6:[function(require,module,exports){
"use strict";

var SpriteSheet = require('./engine/SpriteSheet'),
    Animations = require('./engine/Animations'),
    Rectangle = require('./engine/Rectangle'),
    Vector = require('./engine/Vector'),
    Actor = require('./Actor');

function Player(game, x, y, width, height, assetPath) {
    Actor.call(this, game, x, y, width, height, assetPath);

    this.speed = 150;
    this.isAttacking = false;
    this.attackRect = null;
    this.boundingbox = new Rectangle(6, 20, 20, 10);
    this.COOLDOWN_TIME = 0.5;
    this.attackCooldown = 0;

    var spriteSheet = new SpriteSheet(this.assetPath, this.width, this.height);
    this.anims = new Animations(spriteSheet, {
        idleDown: { frames: [0],  step: 0.15, loop: true },
        idleUp: { frames: [1], step: 0.15, loop: true },
        idleLeft: { frames: [2], step: 0.15, loop: true },
        idleRight: { frames: [3], step: 0.15, loop: true },
        moveDown: { frames: [4, 5, 6, 7], step: 0.15, loop: true },
        moveUp: { frames: [8, 9, 10, 11], step: 0.15, loop: true },
        moveLeft: { frames: [12, 13, 14, 15], step: 0.15, loop: true },
        moveRight: { frames: [16, 17, 18, 19], step: 0.15, loop: true },
        attackDown: { frames: [20, 21, 22], step: 0.1, loop: false },
        attackUp: { frames: [24, 25, 26], step: 0.1, loop: false },
        attackLeft: { frames: [28, 29, 30], step: 0.1, loop: false },
        attackRight: {  frames: [32, 33, 34], step: 0.1, loop: false },
        death: { frames: [36, 37, 38], step: 0.12, loop: false }
    });

    this.addChild(this.anims);
}

Player.prototype = Object.create(Actor.prototype);

Player.prototype.update = function (dt) {
    var kb = this.game.keyboard,
        ms = this.game.mouse;

    if (!this.isAttacking && this.isAlive) {
        this.anims.setAnim("idle" + this.direction);

        if (kb.keysDown.hasOwnProperty(90)) { // Player holding z
            this.direction = "Up";
            this.y -= this.speed * dt;
            this.anims.setAnim("moveUp");
        }
        if (kb.keysDown.hasOwnProperty(83)) { // Player holding s
            this.direction = "Down";
            this.y += this.speed * dt;
            this.anims.setAnim("moveDown");
        }
        if (kb.keysDown.hasOwnProperty(81)) { // Player holding q
            this.direction = "Left";
            this.x -= this.speed * dt;
            this.anims.setAnim("moveLeft");
        }
        if (kb.keysDown.hasOwnProperty(68)) { // Player holding d
            this.direction = "Right";
            this.x += this.speed * dt;
            this.anims.setAnim("moveRight");
        }

        // Prevent sub-pixel movements
        this.x = Math.round(this.x);
        this.y = Math.round(this.y);

        // Collision logic.
        this.updateCollisions();

        // Player attack if press space
        if (this.attackCooldown <= 0 && kb.keysDown.hasOwnProperty(32)) {
            this.attack();
        }
    }

    this.anims.getCurrent().update(dt);

    // If player has finished his attack.
    if (this.isAttacking && this.anims.getCurrent().isDone()) {
        this.anims.getCurrent().reset();
        this.isAttacking = false;
        this.attackRect = null;
    }

    if (this.attackCooldown > 0) {this.attackCooldown -= dt; }
    this.zIndex = this.y + this.height;
    this.previousPos = new Vector(this.x, this.y);
};

Player.prototype.attack = function () {
    var i, punchSound, entity;
    punchSound = this.game.assetManager.getSound("sounds/punch.wav");
    //punchSound.play();
    this.isAttacking = true;
    this.attackCooldown = this.COOLDOWN_TIME;

    if (this.direction === "Up") {
        this.attackRect = new Rectangle(this.x + 12, this.y - 1, 10, 1);
        this.anims.setAnim("attackUp");
    } else if (this.direction === "Down") {
        this.attackRect = new Rectangle(this.x + 8, this.y + 18, 20, 12);
        this.anims.setAnim("attackDown");
    } else if (this.direction === "Left") {
        this.attackRect = new Rectangle(this.x - 4, this.y + 13, 25, 12);
        this.anims.setAnim("attackLeft");
    } else if (this.direction === "Right") {
        this.attackRect = new Rectangle(this.x + 8, this.y + 13, 25, 12);
        this.anims.setAnim("attackRight");
    }

    for (i = 0; i < this.game.entities.children.length; i += 1) {
        entity = this.game.entities.children[i];
        if (this !== entity && entity.hitbox !== null && entity.isAlive && this.attackRect.intersects(entity.getHitBox())) {
            entity.takeDamage(10);
        }
    }
};

module.exports = Player;

},{"./Actor":1,"./engine/Animations":9,"./engine/Rectangle":16,"./engine/SpriteSheet":17,"./engine/Vector":21}],7:[function(require,module,exports){
"use strict";

var Entity = require('./engine/Entity'),
    SpriteSheet = require('./engine/SpriteSheet'),
    Animations = require('./engine/Animations'),
    Rectangle = require('./engine/Rectangle');

function StaticObject(game, x, y, width, height, assetPath) {
    Entity.call(this, game, x, y);
    this.width = width;
    this.height = height;
    this.assetPath = assetPath;
    this.anims = null;
    this.currentAnim = null;
    this.boundingbox = new Rectangle(0, 0, this.width, this.height);
    this.zIndex = this.y + this.height;

    var spriteSheet = new SpriteSheet(this.assetPath, this.width, this.height);
    this.anims = new Animations(spriteSheet, {
        idle: {
            frames: [0],
            step: 0.15,
            loop: true
        }
    });
    this.addChild(this.anims);
}

StaticObject.prototype = Object.create(Entity.prototype);

StaticObject.prototype.update = function (dt) {
    this.anims.setAnim("idle");
    this.anims.getCurrent().update(dt);
};

StaticObject.prototype.getCollisionBox = function () {
    return new Rectangle(this.x + this.boundingbox.x, this.y + this.boundingbox.y,
                         this.boundingbox.width, this.boundingbox.height);
};

module.exports = StaticObject;

},{"./engine/Animations":9,"./engine/Entity":12,"./engine/Rectangle":16,"./engine/SpriteSheet":17}],8:[function(require,module,exports){
"use strict";

var SpriteSheet = require('./SpriteSheet');

function Animation(spriteSheet, frameList, frameDuration, loop) {
    PIXI.Sprite.call(this, spriteSheet);
    this.frameList = frameList;
    this.frameDuration = frameDuration;
    this.totalTime = this.frameList.length * this.frameDuration;
    this.elapsedTime = 0;
    this.loop = loop;
    this.source = {};
}

Animation.prototype = Object.create(PIXI.Sprite.prototype);

Animation.prototype.update = function (dt) {
    this.elapsedTime += dt;

    if (this.isDone()) {
        if (this.loop) {
            this.reset();
        } else {
            return;
        }
    }

    var index = this.currentFrame();

    // Find frame position inside the spritesheet.
    this.source.x = (this.frameList[index] % this.texture.maxColumn) * this.texture.frameWidth;
    this.source.y = Math.floor(this.frameList[index] / this.texture.maxColumn) * this.texture.frameHeight;

    //Change the frame rectangle position inside the spritesheet
    this.texture.setFrame(new PIXI.Rectangle(this.source.x, this.source.y, this.texture.frameWidth, this.texture.frameHeight));
};

Animation.prototype.currentFrame = function () {
    if (this.elapsedTime <= this.totalTime) {
        return Math.floor(this.elapsedTime / this.frameDuration);
    } else {
        return this.frameList.length - 1;
    }
};

Animation.prototype.isDone = function () {
    return (this.elapsedTime >= this.totalTime);
};

Animation.prototype.reset = function () {
    this.elapsedTime = 0;
};

module.exports = Animation;

},{"./SpriteSheet":17}],9:[function(require,module,exports){
"use strict";

var Animation = require('./Animation');

function Animations(spriteSheet, animData) {
    PIXI.DisplayObjectContainer.call(this);
    this.anims = [];
    this.spriteSheet = spriteSheet;
    this.current = null;

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

Animations.prototype = Object.create(PIXI.DisplayObjectContainer.prototype);

Animations.prototype.addAnim = function (name, frames, step, loop) {
    this.anims[name] = new Animation(this.spriteSheet, frames, step, loop);
    this.addChild(this.anims[name]);
};

Animations.prototype.setAnim = function (name) {
    this.current = name;
    for (var anim in this.anims) {
        this.anims[anim].visible = false;
    }
    this.anims[anim].visible = true;
};

Animations.prototype.getCurrent = function () {
    return this.anims[this.current];
};

module.exports = Animations;

},{"./Animation":8}],10:[function(require,module,exports){
"use strict";

function AssetManager() {
    this.successCount = 0;
    this.errorCount = 0;
    this.cache = {};
    this.soundsQueue = [];
}

AssetManager.prototype.queueSound = function (path) {
    if (!this.soundsQueue.hasOwnProperty(path)) {
        this.soundsQueue.push(path);
    }
};

AssetManager.prototype.isDone = function () {
    return (this.soundsQueue.length === this.successCount + this.errorCount);
};

AssetManager.prototype.downloadAll = function () {
    var i, path, img, audio, onLoad;

    onLoad = function () {
        this.successCount += 1;
    };

    for (i = 0; i < this.soundsQueue.length; i += 1) {
        path = this.soundsQueue[i];
        audio = new Audio(path);
        this.successCount += 1;
        audio.src = path;
        this.cache[path] = audio;
    }
};

AssetManager.prototype.getSound = function (path) {
    return this.cache[path];
};

module.exports = AssetManager;

},{}],11:[function(require,module,exports){
"use strict";

var Rectangle = require('./Rectangle');

function Camera(x, y, width, height) {
    this.viewport = new Rectangle(x, y, width, height);
    // Entity that should be followed.
    this.followed = null;
}

Camera.prototype.offset = function (x, y) {
    this.viewport.offset(x, y);
};

Camera.prototype.follow = function (entity) {
    this.followed = entity;
};

Camera.prototype.update = function (stage) {
    // Keep following the entity.
    if (this.followed !== null) {
        this.offset((this.followed.pos.x  + this.followed.width / 2) - this.viewport.width / 2,
                    (this.followed.pos.y + this.followed.height / 2) - this.viewport.height / 2);
    }

    stage.getChildAt(0).position.x = -this.viewport.x;
    stage.getChildAt(0).position.y = -this.viewport.y;
};

module.exports = Camera;

},{"./Rectangle":16}],12:[function(require,module,exports){
"use strict";

function Entity(game, x, y) {
    PIXI.DisplayObjectContainer.call(this);
    this.game = game;
    this.x = x;
    this.y = y;
    this.zIndex = y;
    this.removeFromWorld = false;
}

Entity.prototype = Object.create(PIXI.DisplayObjectContainer.prototype);

Entity.prototype.update = function (dt) {};

module.exports = Entity;

},{}],13:[function(require,module,exports){
"use strict";
var Timer = require('./Timer'),
    AssetManager = require('./AssetManager'),
    Entity = require('./Entity'),
    Keyboard = require('./Keyboard'),
    Mouse = require('./Mouse');

function GameEngine(width, height) {
    this.stage = new PIXI.Stage(0x008000);
    this.renderer = PIXI.autoDetectRenderer(width, height);
    document.body.appendChild(this.renderer.view);

    this.timer = new Timer();
    this.assetManager = new AssetManager();
    this.keyboard = new Keyboard();
    //this.mouse = new Mouse(this);
}

GameEngine.prototype.gameloop = function () {
    var dt = this.timer.tick();
    this.update(dt);
    this.renderer.render(this.stage);
    requestAnimFrame(this.gameloop.bind(this));
};

GameEngine.prototype.run = function () {
    this.init();
};

module.exports = GameEngine;

},{"./AssetManager":10,"./Entity":12,"./Keyboard":14,"./Mouse":15,"./Timer":20}],14:[function(require,module,exports){
"use strict";

function Keyboard() {
    this.keysDown = {};

    // Handle keyboard controls.
    window.addEventListener("keydown", function (e) {this.keysDown[e.keyCode] = true; }.bind(this), false);
    window.addEventListener("keyup", function (e) {delete this.keysDown[e.keyCode]; }.bind(this), false);
}

module.exports = Keyboard;

},{}],15:[function(require,module,exports){
"use strict";

var Vector = require('./Vector');

function Mouse(game) {
    this.pos = new Vector(0, 0);
    this.leftClick = false;
    this.middleClick = false;
    this.rightClick = false;
    this.game = game;

    window.addEventListener("mousedown", function (e) {this.mouseDown(e); }.bind(this), false);
    window.addEventListener("mouseup", function (e) {this.mouseUp(e); }.bind(this), false);
}

Mouse.prototype.ScreenToWorld = function () {
    return new Vector(this.pos.x + this.game.camera.viewport.x, this.pos.y + this.game.camera.viewport.y);
};

Mouse.prototype.mouseDown = function (e) {
    var x, y;
    // Offset to canvas element.
    x = e.clientX - this.game.ctx.canvas.getBoundingClientRect().left;
    y = e.clientY - this.game.ctx.canvas.getBoundingClientRect().top;

    if (this.isOutsideCanvas(x, y)) {return; }

    this.pos.x = x;
    this.pos.y = y;

    this.pos.x += this.game.camera.viewport.x;
    this.pos.y += this.game.camera.viewport.y;

    if (e.button === 0) {
        this.leftClick = true;
    }
    if (e.button === 1) {
        this.middleClick = true;
    }
    if (e.button === 2) {
        this.rightClick = true;
    }
};

Mouse.prototype.mouseUp = function (e) {
    this.leftClick = false;
    this.middleClick = false;
    this.rightClick = false;
};

Mouse.prototype.isOutsideCanvas = function (x, y) {
    var canvas = this.game.ctx.canvas;
    if (x < 0 || y < 0 || x > canvas.width || y > canvas.height) {
        return true;
    }

    return false;
};

module.exports = Mouse;

},{"./Vector":21}],16:[function(require,module,exports){
"use strict";

function Rectangle(x, y, width, height) {
    this.x = x || 0;
    this.y = y || 0;
    this.width = width || 0;
    this.height = height || 0;
}

Rectangle.prototype.offset = function (x, y) {
    this.x = x || this.x;
    this.y = y || this.y;
};

Rectangle.prototype.draw = function (ctx, color, scaleBy) {
    scaleBy = scaleBy || 1;
    color = color || "#000000";

    ctx.save();
    ctx.strokeStyle = color;

    // Round the numbers to prevent sub-pixel drawing on canvas.
    // (prevent blurring and supposedly improve performance)
    var x, y;
    x = Math.round(this.x);
    y = Math.round(this.y);

    ctx.strokeRect(x, y, this.width * scaleBy, this.height * scaleBy);

    ctx.restore();
};

Rectangle.prototype.intersects = function (rect) {
    return (this.x <= rect.x + rect.width &&
            this.x + this.width >= rect.x &&
            this.y <= rect.y + rect.height &&
            this.y + this.height >= rect.y);
};

module.exports = Rectangle;

},{}],17:[function(require,module,exports){
"use strict";

function SpriteSheet(assetPath, frameWidth, frameHeight) {

    PIXI.Texture.call(this, PIXI.Texture.fromImage(assetPath));

    this.frameWidth = frameWidth;
    this.frameHeight = frameHeight;

    this.maxColumn = 128 / this.frameWidth;
    this.maxRow = 320 / this.frameHeight;
}

SpriteSheet.prototype = Object.create(PIXI.Texture.prototype);

module.exports = SpriteSheet;

},{}],18:[function(require,module,exports){
"use strict";

function State(game) {
    this.game = game;
}

State.prototype.onEnter = function () {

};

State.prototype.update = function (dt) {

};

State.prototype.onExit = function () {

};

State.prototype.onPause = function () {

};

State.prototype.onResume = function () {

};

module.exports = State;

},{}],19:[function(require,module,exports){
"use strict";

function StateManager() {
    this.states = [];
}

StateManager.prototype.update = function (dt) {
    var state = this.states[this.states.length - 1];
    if (state) {state.update(dt); }
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

module.exports = StateManager;

},{}],20:[function(require,module,exports){
"use strict";

/**
Timer class
@class Timer
**/
function Timer() {
    this.gameTime = 0;
    this.maxStep = 0.05;
    this.previousTime = 0;
}

/**
Update the timer.
@method tick
**/
Timer.prototype.tick = function () {
    var now, actualDelta, gameDelta;
    now = Date.now();
    actualDelta = (now - this.previousTime) / 1000;
    this.previousTime = now;

    gameDelta = Math.min(actualDelta, this.maxStep);
    this.gameTime += gameDelta;
    return gameDelta;
};

module.exports = Timer;

},{}],21:[function(require,module,exports){
"use strict";

function Vector(x, y) {
    this.x = x;
    this.y = y;
}

Vector.prototype.normalize = function () {
    var hyp = Math.sqrt(this.x * this.x + this.y * this.y);
    this.x /= hyp;
    this.y /= hyp;
};

Vector.moveTowards = function (origin, goal, step) {
    var dir = new Vector(goal.x - origin.x, goal.y - origin.y);
    dir.normalize();

    return new Vector(origin.x + dir.x * step, origin.y + dir.y * step);
};

module.exports = Vector;

},{}]},{},[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21])