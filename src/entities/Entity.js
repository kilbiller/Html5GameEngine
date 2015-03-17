"use strict";

class Entity {
  constructor(game) {
    this.id = (+new Date()).toString(16) + (Math.random() * 100000000 | 0).toString(16) + Entity.prototype.count;
    this.game = game;
    this.components = [];
    Entity.prototype.count++;
  }

  addComponent(component) {
    this.components[component.name] = component;
    return this;
  }

  removeComponent(name) {
    for(var i = 0; i < this.components.length; i++) {
      if(this.components[i].name === name) {
        this.components.splice(i,1);
        break;
      }
    }

    return this;
  }

  print() {
    // Function to print / log information about the entity
    console.log(JSON.stringify(this, null, 4));
    return this;
  }
}

// only way to get static variables for now
Entity.prototype.count = 0;

module.exports = Entity;
