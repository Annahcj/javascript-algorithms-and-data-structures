// 2694. Event Emitter
// Design an EventEmitter class. This interface is similar (but with some differences) to the one found in Node.js or the Event Target interface of the DOM. The EventEmitter should allow for subscribing to events and emitting them.
// Your EventEmitter class should have the following two methods:
  // subscribe - This method takes in two arguments: the name of an event as a string and a callback function. This callback function will later be called when the event is emitted.
  // An event should be able to have multiple listeners for the same event. When emitting an event with multiple callbacks, each should be called in the order in which they were subscribed. An array of results should be returned. You can assume no callbacks passed to subscribe are referentially identical.
  // The subscribe method should also return an object with an unsubscribe method that enables the user to unsubscribe. When it is called, the callback should be removed from the list of subscriptions and undefined should be returned.
  // emit - This method takes in two arguments: the name of an event as a string and an optional array of arguments that will be passed to the callback(s). If there are no callbacks subscribed to the given event, return an empty array. Otherwise, return an array of the results of all callback calls in the order they were subscribed.


// Solution 1: Hashmap & Array

// Keep a map of an array of callbacks for each event name: { eventName: [callback, callback, ...], ... }

// Time Complexity:
  // subscribe: O(1)
  // unsubscribe: O(n) 
  // emit: O(n)
// Space Complexity: O(n)
class EventEmitter {
  constructor() {
    this.callbacks = {};
  }
  subscribe(event, cb) {
    if (!this.callbacks[event]) this.callbacks[event] = [];
    this.callbacks[event].push(cb);
    
    return {
      unsubscribe: () => {
        this.callbacks[event] = this.callbacks[event].filter((callback) => callback !== cb);
        if (this.callbacks[event].length === 0) delete this.callbacks[event];
      }
    };
  }

  emit(event, args = []) {
    const callbacks = this.callbacks[event] ?? [];
    return callbacks.map((callback) => callback(...args));
  }
}

// Solution 2: Hashmap & Set

// Use a set instead of an array to bring the time complexity of unsubscribe down to O(1).
// Note: The JS Set iterates over the elements by the order of insertion.

// Time Complexity: 
  // subscribe: O(1)
  // unsubscribe: O(1)
  // emit: O(n)
// Space Complexity: O(n)
class EventEmitter {
  constructor() {
    this.callbacks = {};
  }
  subscribe(event, cb) {
    if (!this.callbacks[event]) this.callbacks[event] = new Set();
    this.callbacks[event].add(cb);
    
    return {
      unsubscribe: () => {
        this.callbacks[event].delete(cb);
        if (this.callbacks[event].size === 0) delete this.callbacks[event];
      }
    };
  }

  emit(event, args = []) {
    const callbacks = this.callbacks[event] ?? [];
    const results = [];
    for (const callback of callbacks) {
      results.push(callback(...args));
    }
    return results;
  }
}

const emitter = new EventEmitter();
function onClickCallback() { return 99 }
const sub = emitter.subscribe('onClick', onClickCallback);
console.log(emitter.emit('onClick')); // [99]
sub.unsubscribe(); 
console.log(emitter.emit('onClick')); // []