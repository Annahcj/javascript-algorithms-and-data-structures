// 2637. Promise Time Limit
// Given an asyncronous function fn and a time t in milliseconds, return a new time limited version of the input function.
// A time limited function is a function that is identical to the original unless it takes longer than t milliseconds to fullfill. In that case, it will reject with "Time Limit Exceeded".  Note that it should reject with a string, not an Error.


// Solution 1: Timeout & Async/Await

// Use setTimeout to set a timer.
// If the async function resolves before the callback function in the timeout runs, resolve with the returned result and cancel the timeout using clearTimeout.
// Otherwise, reject when the timeout finishes.

var timeLimit = function(fn, t) {
	return async function(...args) {
    return new Promise(async (resolve, reject) => {
      const timer = setTimeout(() => reject('Time Limit Exceeded'), t);
      
      try {
        const result = await fn(...args);
        resolve(result);
      } catch (err) {
        reject(err);
      } finally {
        clearTimeout(timer);
      }
    });
  };
};

// Solution 2: Promise.race

// Promise.race settles with the eventual state of the first promise that settles.
// Use Promise.race to return the first that settles out of the timeout promise and the main function.

var timeLimit = function(fn, t) {
	return async function(...args) {
    const timeoutPromise = new Promise((_resolve, reject) => {
      setTimeout(() => reject('Time Limit Exceeded'), t);
    });
    return Promise.race([fn(...args), timeoutPromise]);
  };
};