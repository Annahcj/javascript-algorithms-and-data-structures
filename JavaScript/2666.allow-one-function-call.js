// 2666. Allow One Function Call
// Given a function fn, return a new function that is identical to the original function except that it ensures fn is called at most once.
  // The first time the returned function is called, it should return the same result as fn.
  // Every subsequent time it is called, it should return undefined.


// Solution: Boolean Flag

// Use a boolean flag to keep track of whether we have called the function before.

var once = function(fn) {
  let hasBeenCalled = false;
  return function(...args){
    if (!hasBeenCalled) {
      hasBeenCalled = true;
      return fn(...args);
    }
  }
};