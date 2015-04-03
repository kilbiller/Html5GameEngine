// TODO: an Event class, handle multiple events of the same type, events that can only be launched/reacted to ONCE
// TODO: find a way to not create function inside for loops to deal with events

export default class EventList {
  constructor() {
    this.events = [];
  }

  dispatch(eventName, data) {
    this.events.push({
      name: eventName,
      data: data
    });
  }

  on(eventName, cb) {
    for(let event of this.events) {
      if(event.name === eventName) {
        cb(event.data);
      }
    }
  }

  reset() {
    this.events = [];
  }

  print() {
    console.log(this.events);
  }
}
