// 2721. Execute Asynchronous Functions in Parallel
// Given an array of asynchronous functions functions, return a new promise promise. Each function in the array accepts no arguments and returns a promise.
// promise resolves:
  // When all the promises returned from functions were resolved successfully. The resolved value of promise should be an array of all the resolved values of promises in the same order as they were in the functions.
// promise rejects:
  // When any of the promises returned from functions were rejected. promise should also reject with the reason of the first rejection.
// Please solve it without using the built-in Promise.all function.


// Solution: 

// Use .then() to resolve each promise and .catch() to catch any errors.
// By looping through each function and using .then(), we will process them in parallel.
// Keep track of the count of resolved promises and only resolve with the array of results when the count is equal to the number of functions.

var promiseAll = async function(functions) {
  return new Promise((resolve, reject) => {
    let results = Array(functions.length), finished = 0;
    for (let i = 0; i < functions.length; i++) {
      functions[i]()
        .then((result) => {
          results[i] = result;
          if (++finished === functions.length) {
            resolve(results);
          }
        })
        .catch((err) => {
          reject(err);
        })
    }
  })
};