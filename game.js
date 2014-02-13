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
    this.previousPos = new Vector(this.pos.x, this.pos.y);
    this.isAlive = true;
}

Actor.prototype = new Entity();

Actor.prototype.update = function (dt) {
    Entity.prototype.update.call(this, dt);
};

Actor.prototype.draw = function (ctx) {
    Entity.prototype.draw.call(this, ctx);
    this.currentAnim.draw(ctx, this.pos.x, this.pos.y);
};

Actor.prototype.die = function () {
    var deathSound = this.game.assetManager.getSound("sounds/slime_death.wav");
    deathSound.play();
    this.currentAnim = this.anims.getAnim("death");
    this.isAlive = false;
};

Actor.prototype.getCollisionBox = function () {
    return new Rectangle(this.pos.x + this.boundingbox.x, this.pos.y + this.boundingbox.y,
                         this.boundingbox.width, this.boundingbox.height);
};

Actor.prototype.getHitBox = function () {
    return new Rectangle(this.pos.x + this.hitbox.x, this.pos.y + this.hitbox.y,
                         this.hitbox.width, this.hitbox.height);
};

Actor.prototype.updateCollisions = function () {
    var i, entity, collisionBox;
    collisionBox = this.getCollisionBox();

    for (i = 0; i < this.game.entities.length; i += 1) {
        entity = this.game.entities[i];
        if (this !== entity && entity.boundingbox !== null && collisionBox.intersects(entity.getCollisionBox())) {
            this.pos = new Vector(this.previousPos.x, this.previousPos.y);
        }
    }
};

module.exports = Actor;

},{"./engine/Entity":11,"./engine/Rectangle":15,"./engine/Vector":20}],2:[function(require,module,exports){
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
}

Ennemy.prototype = new Actor();

Ennemy.prototype.loadContent = function (assetManager) {
    var spriteSheet = new SpriteSheet(assetManager.getAsset(this.assetPath), this.width, this.height);
    this.anims = new Animations(spriteSheet, {
        idle: {
            frames: [0],
            step: 0.15,
            loop: false
        },
        death: {
            frames: [36, 37, 38],
            step: 0.15,
            loop: false
        }
    });
};

Ennemy.prototype.update = function (dt) {
    Actor.prototype.update.call(this, dt);

    if (this.isAlive) {
        this.currentAnim = this.anims.getAnim("idle");
    }

    this.currentAnim.update(dt);
    this.zIndex = this.pos.y + this.height;
    this.previousPos = new Vector(this.pos.x, this.pos.y);
};

Ennemy.prototype.draw = function (ctx) {
    Actor.prototype.draw.call(this, ctx);

    this.getHitBox().draw(ctx);
    this.getCollisionBox().draw(ctx);
};

Ennemy.prototype.takeDamage = function (damage) {
    this.hp -= damage;
    if (this.hp <= 0) {this.die(); }
};

module.exports = Ennemy;

},{"./Actor":1,"./engine/Animations":8,"./engine/Rectangle":15,"./engine/SpriteSheet":16,"./engine/Vector":20}],3:[function(require,module,exports){
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
    this.entities = [];
    this.camera = new Camera(0, 0, width, height);
    this.stateManager = new StateManager();
}

Game.prototype = new GameEngine();

Game.prototype.init = function () {
    var wait;
    GameEngine.prototype.init.call(this);

    // Add assets to the queue
    this.assetManager.queueDownload("img/player.png");
    this.assetManager.queueSound("sounds/slime_death.wav");
    this.assetManager.queueSound("sounds/punch.wav");
    this.assetManager.queueDownload("img/trunks.png");

    this.assetManager.downloadAll();

    wait = setInterval(function () {
        if (this.assetManager.isDone()) {
            clearInterval(wait);
            // Start the game.
            this.stateManager.push(new LevelState(this));
            this.gameloop();
        }
    }.bind(this), 100);
};

Game.prototype.update = function (dt) {
    GameEngine.prototype.update.call(this, dt);
    this.stateManager.update(dt);
};

Game.prototype.draw = function (ctx) {
    GameEngine.prototype.draw.call(this, ctx);
    this.stateManager.draw(ctx);
};

module.exports = Game;

},{"./Ennemy":2,"./LevelState":4,"./Player":5,"./StaticObject":6,"./engine/Camera":10,"./engine/GameEngine":12,"./engine/StateManager":18}],4:[function(require,module,exports){
"use strict";
var State = require('./engine/State'),
    Camera = require('./engine/Camera'),
    Player = require('./Player'),
    Ennemy = require('./Ennemy'),
    StaticObject = require('./StaticObject');


function LevelState(game) {
    State.call(this, game);
}

LevelState.prototype = new State();

LevelState.prototype.onEnter = function () {
    var i, game;
    game = this.game;

    // Create the entities.
    game.entities.push(new StaticObject(game, 150, 150, 32, 32, "img/trunks.png"));
    game.entities.push(new StaticObject(game, 180, 230, 32, 32, "img/trunks.png"));
    game.entities.push(new StaticObject(game, 340, 200, 32, 32, "img/trunks.png"));

    game.entities.push(new Ennemy(game, 300, 300, 32, 32, "img/player.png"));
    game.entities.push(new Ennemy(game, 400, 300, 32, 32, "img/player.png"));
    game.entities.push(new Ennemy(game, 300, 20, 32, 32, "img/player.png"));
    game.entities.push(new Ennemy(game, 50, 300, 32, 32, "img/player.png"));
    game.entities.push(new Ennemy(game, 90, 300, 32, 32, "img/player.png"));

    game.entities.push(new Player(game, 50, 50, 32, 32, "img/player.png"));

    for (i = 0; i < game.entities.length; i += 1) {
        game.entities[i].loadContent(game.assetManager);
    }

    //Follow the player
    game.camera.follow(game.entities[game.entities.length - 1]);
};

LevelState.prototype.update = function (dt) {
    State.prototype.update.call(this, dt);

    var i, game;
    game = this.game;

    //Spawn a box each time left mouse button is clicked
    if (game.mouse.leftClick) {
        game.entities.push(new StaticObject(game, game.mouse.pos.x, game.mouse.pos.y, 32, 32, "img/trunks.png"));
        game.entities[game.entities.length - 1].loadContent(game.assetManager);
    }

    for (i = 0; i < game.entities.length; i += 1) {
        if (!game.entities[i].removeFromWorld) {
            game.entities[i].update(dt);
        }
    }

    for (i = game.entities.length - 1; i >= 0;  i -= 1) {
        if (game.entities[i].removeFromWorld) {
            game.entities.splice(i, 1);
        }
    }

    // Basic Depth sorting.
    // TODO : Upgrade and implement in the engine.
    game.entities.sort(function (a, b) { return a.zIndex - b.zIndex; });

    game.camera.update();
};

LevelState.prototype.draw = function (ctx) {
    State.prototype.draw.call(this, ctx);

    var i, game;
    game = this.game;

    // Clear the canvas.
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    //this.ctx.canvas.width = this.ctx.canvas.width;

    // Save context before camera translation.
    ctx.save();
    game.camera.transform(ctx);

    //Draw entities
    for (i = 0; i < game.entities.length; i += 1) {
        game.entities[i].draw(ctx);
    }

    // Restore the canvas.
    ctx.restore();
};

LevelState.prototype.onExit = function () {};

module.exports = LevelState;
},{"./Ennemy":2,"./Player":5,"./StaticObject":6,"./engine/Camera":10,"./engine/State":17}],5:[function(require,module,exports){
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
    //this.isMoving = false;
    this.COOLDOWN_TIME = 0.5;
    this.attackCooldown = 0;
}

Player.prototype = new Actor();

Player.prototype.loadContent = function (assetManager) {
    var spriteSheet = new SpriteSheet(assetManager.getAsset(this.assetPath), this.width, this.height);
    this.anims = new Animations(spriteSheet, {
        idleDown: { frames: [0],  step: 0.15, loop: false },
        idleUp: { frames: [1], step: 0.15, loop: false },
        idleLeft: { frames: [2], step: 0.15, loop: false },
        idleRight: { frames: [3], step: 0.15, loop: false },
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
};

Player.prototype.update = function (dt) {
    Actor.prototype.update.call(this, dt);

    var kb = this.game.keyboard,
        ms = this.game.mouse;

    if (!this.isAttacking && this.isAlive) {
        this.currentAnim = this.anims.getAnim("idle" + this.direction);

        if (kb.keysDown.hasOwnProperty(90)) { // Player holding z
            this.direction = "Up";
            this.pos.y -= this.speed * dt;
            this.currentAnim = this.anims.getAnim("moveUp");
        }
        if (kb.keysDown.hasOwnProperty(83)) { // Player holding s
            this.direction = "Down";
            this.pos.y += this.speed * dt;
            this.currentAnim = this.anims.getAnim("moveDown");
        }
        if (kb.keysDown.hasOwnProperty(81)) { // Player holding q
            this.direction = "Left";
            this.pos.x -= this.speed * dt;
            this.currentAnim = this.anims.getAnim("moveLeft");
        }
        if (kb.keysDown.hasOwnProperty(68)) { // Player holding d
            this.direction = "Right";
            this.pos.x += this.speed * dt;
            this.currentAnim = this.anims.getAnim("moveRight");
        }

        /*
        // Mouse movement.
        if (ms.leftClick) {
            this.isMoving = true;
        }
        if (this.isMoving) {
            this.pos = Vector.moveTowards(this.pos, ms.pos, this.speed * dt);
            if (Math.abs(ms.pos.x - this.pos.x) <=  this.speed * dt && Math.abs(ms.pos.y - this.pos.y) <= this.speed * dt) {
                this.isMoving = false;
            }
        }
        */

        // Collision logic.
        this.updateCollisions();

        // Player attack if press space
        if (this.attackCooldown <= 0 && kb.keysDown.hasOwnProperty(32)) {
            this.attack();
        }
    }

    this.currentAnim.update(dt);

    // If player has finished his attack.
    if (this.isAttacking && this.currentAnim.isDone()) {
        this.currentAnim.reset();
        this.isAttacking = false;
        this.attackRect = null;
    }

    if (this.attackCooldown > 0) {this.attackCooldown -= dt; }
    this.zIndex = this.pos.y + this.height;
    this.previousPos = new Vector(this.pos.x, this.pos.y);
};

Player.prototype.draw = function (ctx) {
    Actor.prototype.draw.call(this, ctx);

    this.getHitBox().draw(ctx);
    this.getCollisionBox().draw(ctx);
    if (this.attackRect !== null) {this.attackRect.draw(ctx); }
};

Player.prototype.attack = function () {
    var i, punchSound, entity;
    punchSound = this.game.assetManager.getSound("sounds/punch.wav");
    punchSound.play();
    this.isAttacking = true;
    this.attackCooldown = this.COOLDOWN_TIME;

    if (this.direction === "Up") {
        this.attackRect = new Rectangle(this.pos.x + 12, this.pos.y - 1, 10, 1);
        this.currentAnim = this.anims.getAnim("attackUp");
    } else if (this.direction === "Down") {
        this.attackRect = new Rectangle(this.pos.x + 8, this.pos.y + 18, 20, 12);
        this.currentAnim = this.anims.getAnim("attackDown");
    } else if (this.direction === "Left") {
        this.attackRect = new Rectangle(this.pos.x - 4, this.pos.y + 13, 25, 12);
        this.currentAnim = this.anims.getAnim("attackLeft");
    } else if (this.direction === "Right") {
        this.attackRect = new Rectangle(this.pos.x + 8, this.pos.y + 13, 25, 12);
        this.currentAnim = this.anims.getAnim("attackRight");
    }

    for (i = 0; i < this.game.entities.length; i += 1) {
        entity = this.game.entities[i];
        if (this !== entity && entity.hitbox !== null && entity.isAlive && this.attackRect.intersects(entity.getHitBox())) {
            entity.takeDamage(10);
        }
    }
};

module.exports = Player;

},{"./Actor":1,"./engine/Animations":8,"./engine/Rectangle":15,"./engine/SpriteSheet":16,"./engine/Vector":20}],6:[function(require,module,exports){
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
    this.zIndex = this.pos.y + this.height;
}

StaticObject.prototype = new Entity();

StaticObject.prototype.loadContent = function (assetManager) {
    var spriteSheet = new SpriteSheet(assetManager.getAsset(this.assetPath), this.width, this.height);
    this.anims = new Animations(spriteSheet, {
        idle: {
            frames: [0],
            step: 0.15,
            loop: false
        }
    });
};

StaticObject.prototype.update = function (dt) {
    Entity.prototype.update.call(this, dt);
    this.currentAnim = this.anims.getAnim("idle");
    this.currentAnim.update(dt);
};

StaticObject.prototype.draw = function (ctx) {
    Entity.prototype.draw.call(this, ctx);
    this.currentAnim.draw(ctx, this.pos.x, this.pos.y);

    if (this.boundingbox !== null) {this.getCollisionBox().draw(ctx); }
};

StaticObject.prototype.getCollisionBox = function () {
    return new Rectangle(this.pos.x + this.boundingbox.x, this.pos.y + this.boundingbox.y,
                         this.boundingbox.width, this.boundingbox.height);
};

module.exports = StaticObject;

},{"./engine/Animations":8,"./engine/Entity":11,"./engine/Rectangle":15,"./engine/SpriteSheet":16}],7:[function(require,module,exports){
"use strict";

var SpriteSheet = require('./SpriteSheet');

function Animation(spriteSheet, frameList, frameDuration, loop) {
    this.spriteSheet = spriteSheet;
    this.frameList = frameList;
    this.frameDuration = frameDuration;
    this.totalTime = this.frameList.length * this.frameDuration;
    this.elapsedTime = 0;
    this.loop = loop;
    this.source = {};
}

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
    this.source.x = (this.frameList[index] % this.spriteSheet.maxColumn) * this.spriteSheet.frameWidth;
    this.source.y = Math.floor(this.frameList[index] / this.spriteSheet.maxColumn) * this.spriteSheet.frameHeight;
};

/**
Draw the current frame on the screen at the specified location.
@method drawFrame
**/
Animation.prototype.draw = function (ctx, x, y, scaleBy) {
    scaleBy = scaleBy || 1;

    // Round the numbers to prevent sub-pixel drawing on canvas.
    // (prevent blurring and supposedly improve performance)
    x = Math.round(x);
    y = Math.round(y);

    ctx.drawImage(this.spriteSheet.image,
                 this.source.x, this.source.y,
                 this.spriteSheet.frameWidth, this.spriteSheet.frameHeight,
                 x, y,
                 this.spriteSheet.frameWidth * scaleBy, this.spriteSheet.frameHeight * scaleBy);
};

/**
Return the index of the frame to draw.
@method currentFrame
**/
Animation.prototype.currentFrame = function () {
    if (this.elapsedTime <= this.totalTime) {
        return Math.floor(this.elapsedTime / this.frameDuration);
    } else {
        return this.frameList.length - 1;
    }
};

/**
Check if the animation loop is done.
@method isDone
**/
Animation.prototype.isDone = function () {
    return (this.elapsedTime >= this.totalTime);
};

/**
Reset the animation loop.
@method reset
**/
Animation.prototype.reset = function () {
    this.elapsedTime = 0;
};

module.exports = Animation;
},{"./SpriteSheet":16}],8:[function(require,module,exports){
"use strict";

var Animation = require('./Animation');

/**
Animations class
@class Animations
**/
function Animations(spriteSheet, animData) {
    this.anims = [];
    this.spriteSheet = spriteSheet;


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

Animations.prototype.addAnim = function (name, frames, step, loop) {
    this.anims[name] = new Animation(this.spriteSheet, frames, step, loop);
};

Animations.prototype.getAnim = function (name) {
    return this.anims[name];
};

module.exports = Animations;

},{"./Animation":7}],9:[function(require,module,exports){
"use strict";

/**
AssetManager class
@class AssetManager
**/
function AssetManager() {
    this.successCount = 0;
    this.errorCount = 0;
    this.cache = {};
    this.downloadQueue = [];
    this.soundsQueue = [];
}

/**
Add images to the queue.
@method queueDownload
**/
AssetManager.prototype.queueDownload  = function (path) {
    if (!this.downloadQueue.hasOwnProperty(path)) {
        this.downloadQueue.push(path);
    }
};

/**
Add sounds to the queue.
@method queueSound
**/
AssetManager.prototype.queueSound = function (path) {
    if (!this.soundsQueue.hasOwnProperty(path)) {
        this.soundsQueue.push(path);
    }
};

/**
Check if all assets in the queue are loaded.
@method isDone
**/
AssetManager.prototype.isDone = function () {
    return ((this.downloadQueue.length + this.soundsQueue.length) === this.successCount + this.errorCount);
};

/**
Load all of the assets.
@method downloadAll
**/
AssetManager.prototype.downloadAll = function () {
    var i, path, img, audio, onLoad;

    onLoad = function () {
        this.successCount += 1;
    };

    for (i = 0; i < this.downloadQueue.length; i += 1) {
        path = this.downloadQueue[i];
        img = new Image();
        img.addEventListener("load", onLoad.bind(this), false);
        img.src = path;
        this.cache[path] = img;
    }
    for (i = 0; i < this.soundsQueue.length; i += 1) {
        path = this.soundsQueue[i];
        audio = new Audio(path);
        this.successCount += 1;
        audio.src = path;
        this.cache[path] = audio;
    }
};

/**
Return the specified audio.
@method getSound
**/
AssetManager.prototype.getSound = function (path) {
    return this.cache[path];
};

/**
Return the specified asset.
@method getAsset
**/
AssetManager.prototype.getAsset = function (path) {
    return this.cache[path];
};

module.exports = AssetManager;

},{}],10:[function(require,module,exports){
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

Camera.prototype.update = function () {
    // Keep following the entity.
    if (this.followed !== null) {
        this.offset((this.followed.pos.x  + this.followed.width / 2) - this.viewport.width / 2,
                    (this.followed.pos.y + this.followed.height / 2) - this.viewport.height / 2);
    }
};

Camera.prototype.transform = function (ctx) {
    var x, y;
    // Round the numbers to prevent sub-pixel drawing on canvas.
    // (prevent blurring and supposedly improve performance)
    x = Math.round(this.viewport.x);
    y = Math.round(this.viewport.y);
    ctx.translate(-x, -y);
};

module.exports = Camera;

},{"./Rectangle":15}],11:[function(require,module,exports){
"use strict";
var Vector = require('./Vector');

/**
Entity class
@class Entity
**/
function Entity(game, x, y) {
    this.game = game;
    this.pos = new Vector(x, y);
    this.zIndex = y;
    this.removeFromWorld = false;
}

/**
Update entity's data.
@method update
**/
Entity.prototype.update = function (dt) { };

/**
Draw the entity on screen.
@method draw
**/
Entity.prototype.draw = function (dt, ctx) {
    /*if (this.game.showOutlines && this.radius) {
        ctx.beginPath();
        ctx.strokeStyle = "green";
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI*2, false);
        ctx.stroke();
        ctx.closePath();
    }*/
};

/*Entity.prototype.outsideScreen = function() {
    return (this.x > this.game.halfSurfaceWidth || this.x < -(this.game.halfSurfaceWidth) ||
    this.y > this.game.halfSurfaceHeight || this.y < -(this.game.halfSurfaceHeight));
}*/

module.exports = Entity;

},{"./Vector":20}],12:[function(require,module,exports){
"use strict";
var Timer = require('./Timer'),
    AssetManager = require('./AssetManager'),
    Entity = require('./Entity'),
    Keyboard = require('./Keyboard'),
    Mouse = require('./Mouse');

/**
GameEngine class
@class GameEngine
**/
function GameEngine(width, height) {
    // Create the canvas.
    var canvas = document.createElement("canvas");
    canvas.width = width;
    canvas.height = height;
    document.body.appendChild(canvas);

    this.ctx = canvas.getContext("2d");
    this.timer = new Timer();
    this.assetManager = new AssetManager();
    this.keyboard = new Keyboard();
    this.mouse = new Mouse(this);
}

/**
Init will be called once per game and is the place to load all of your content.
@method init
**/
GameEngine.prototype.init = function () {
};

/**
Run logic such as updating the world, checking for collisions, gathering input, and playing audio.
@method update
**/
GameEngine.prototype.update = function (dt) {
};

/**
This is called when the game should draw itself.
@method draw
**/
GameEngine.prototype.draw = function (ctx) {
};

/**
Actual gameloop.
@method gameloop
**/
GameEngine.prototype.gameloop = function () {
    var dt = this.timer.tick();
    this.update(dt);
    this.draw(this.ctx);
    window.requestAnimationFrame(this.gameloop.bind(this));
};

/**
Call this method to start the game.
@method run
**/
GameEngine.prototype.run = function () {
    this.init();
};

module.exports = GameEngine;

},{"./AssetManager":9,"./Entity":11,"./Keyboard":13,"./Mouse":14,"./Timer":19}],13:[function(require,module,exports){
"use strict";

function Keyboard() {
    this.keysDown = {};

    // Handle keyboard controls.
    window.addEventListener("keydown", function (e) {this.keysDown[e.keyCode] = true; }.bind(this), false);
    window.addEventListener("keyup", function (e) {delete this.keysDown[e.keyCode]; }.bind(this), false);
}

module.exports = Keyboard;

},{}],14:[function(require,module,exports){
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

},{"./Vector":20}],15:[function(require,module,exports){
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

},{}],16:[function(require,module,exports){
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

module.exports = SpriteSheet;

},{}],17:[function(require,module,exports){
"use strict";

function State(game) {
    this.game = game;
}

State.prototype.onEnter = function () {

};

State.prototype.update = function (dt) {

};

State.prototype.draw = function (ctx) {

};

State.prototype.onExit = function () {

};

State.prototype.onPause = function () {

};

State.prototype.onResume = function () {

};

module.exports = State;

},{}],18:[function(require,module,exports){
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

module.exports = StateManager;

},{}],19:[function(require,module,exports){
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

},{}],20:[function(require,module,exports){
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
},{}],21:[function(require,module,exports){
"use strict";
var Game = require('./Game'),
    game;

game = new Game(800, 400);
game.run();
},{"./Game":3}]},{},[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21])
