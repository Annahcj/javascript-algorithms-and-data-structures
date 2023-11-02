// 2627. Debounce
// Given a function fn and a time in milliseconds t, return a debounced version of that function.
// A debounced function is a function whose execution is delayed by t milliseconds and whose execution is cancelled if it is called again within that window of time. The debounced function should also recieve the passed parameters.
// For example, let's say t = 50ms, and the function was called at 30ms, 60ms, and 100ms. The first 2 function calls would be cancelled, and the 3rd function call would be executed at 150ms. If instead t = 35ms, The 1st call would be cancelled, the 2nd would be executed at 95ms, and the 3rd would be executed at 135ms.


// Solution: setTimeout

// Keep track of the timeout from the latest call.
// When the function is called while a timeout still exists, then we clear the timeout using clearTimeout.
// Then, we create a new timeout and set the reference.
// When the timeout finishes, we call the function.

var debounce = function(fn, t) {
  let timeout = null;
  return function(...args) {
    clearTimeout(timeout);
    timeout = setTimeout(() => {
      fn(...args);
    }, t);
  }
};