// 2693. Call Function with Custom Context
// Enhance all functions to have the callPolyfill method. The method accepts an object obj as it's first parameter and any number of additional arguments. The obj becomes the this context for the function. The additional arguments are passed to the function (that the callPolyfill method belongs on).


// Solution 1: Symbol

// Use a symbol as a key to store `this` on the context object, essentially binding `this` to be inside the context.
// Symbols are unique and symbol keys are hidden from any mechanisms other code will typically use to access the object.

Function.prototype.callPolyfill = function(context, ...args) {
  const symbol = Symbol();
  context[symbol] = this;
  return context[symbol](...args);
}

// Solution 2: Apply

// This can be solved using bind, call, or apply.
// Using apply will bind the Function's `this` context to be the passed context.

Function.prototype.callPolyfill = function(context, ...args) {
  return this.apply(context, args);
}

function increment() { this.count++; return this.count; }
console.log(increment.callPolyfill({count: 1})); // 2