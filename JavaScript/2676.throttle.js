// 2676. Throttle
// Given a function fn and a time in milliseconds t, return a throttled version of that function.
// A throttled function is first called without delay and then, for a time interval of t milliseconds, can't be executed but should store the latest function arguments provided to call fn with them after the end of the delay.
// For instance, t = 50ms, and the function was called at 30ms, 40ms, and 60ms. The first function call would block calling functions for the following t milliseconds. The second function call would save arguments, and the third call arguments should overwrite currently stored arguments from the second call because the second and third calls are called before 80ms. Once the delay has passed, the throttled function should be called with the latest arguments provided during the delay period, and it should also create another delay period of 80ms + t.


// Solution: setInterval

// Keep track of:
  // the id of the current setInterval
  // the arguments from the latest function call

// For each interval, we only call the function at most once, with the arguments from the latest function call.
// If there were no function calls within an interval (if the latest function arguments are not defined at the end of an interval), clear the setInterval using clearInterval.
// Otherwise, call the function immediately and create a new setInterval.

var throttle = function(fn, t) {
  let interval = null;
  let latestArgs = null;
  return function(...args) {
    if (interval) latestArgs = args;
    else {
      fn(...args);
      interval = setInterval(() => {
        if (!latestArgs) {
          clearInterval(interval);
          interval = null;
          return;
        } 
        fn(...latestArgs);
        latestArgs = null;
      }, t);
    }
  }
};
