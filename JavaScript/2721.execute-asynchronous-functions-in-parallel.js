// 2721. Execute Asynchronous Functions in Parallel
// Given an array of asynchronous functions functions, return a new promise promise. Each function in the array accepts no arguments and returns a promise.
// promise resolves:
  // When all the promises returned from functions were resolved successfully. The resolved value of promise should be an array of all the resolved values of promises in the same order as they were in the functions.
// promise rejects:
  // When any of the promises returned from functions were rejected. promise should also reject with the reason of the first rejection.
// Please solve it without using the built-in Promise.all function.


// Solution 1: forEach loop and async/await
 
// Use a forEach loop to run each function in parallel.
// Count the number of promises that have been resolved and return the array of results if all have been resolved.
// Use async/await together with try/catch.

var promiseAll = function(functions) {
  return new Promise((resolve, reject) => {
    let n = functions.length, results = Array(n);
    let resolved = 0;
    
    functions.forEach(async (fn, index) => {
      try {
        const result = await fn();
        results[index] = result;
        resolved++;
        if (resolved === n) resolve(results);
      } catch (error) {
        reject(error);
      }
    })
  })
};


// Solution 2: .then()/.catch()
 
// Use .then() to resolve each promise and .catch() to catch any errors.
// By looping through each function using a forEach and using .then(), we will process them in parallel.
// Keep track of the count of resolved promises and only resolve with the array of results when the count is equal to the number of functions.

var promiseAll = function(functions) {
  return new Promise((resolve, reject) => {
    let n = functions.length, results = Array(n);
    let resolved = 0;
    
    functions.forEach(async (fn, index) => {
      fn
        .then((result) => {
        results[index] = result;
        resolved++;
        if (resolved === n) resolve(results);
      })
        .catch((error) => reject(error))
    })
  })
};