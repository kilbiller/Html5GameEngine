"use strict";

import uuid from 'node-uuid';

export default class Entity {
  constructor(type = "default") {
    this.id = uuid.v4();
    this.components = {};
    this.type = type;
    Entity.prototype.count++;
  }

  addComponent(component) {
    this.components[component.name] = component;
    return this;
  }

  removeComponent(name) {
    delete this.components[name];
    return this;
  }

  print() {
    console.log(JSON.stringify(this, null, 4));
    return this;
  }
}

// only way to get static variables for now
Entity.prototype.count = 0;
