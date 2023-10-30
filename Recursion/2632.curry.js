// 2632. Curry
// Given a function fn, return a curried version of that function.
// A curried function is a function that accepts fewer or an equal number of parameters as the original function and returns either another curried function or the same value the original function would have returned.
// In practical terms, if you called the original function like sum(1,2,3), you would call the curried version like csum(1)(2)(3), csum(1)(2,3), csum(1,2)(3), or csum(1,2,3). All these methods of calling the curried function should return the same value as the original.

 
// Solution: Recursion 

// fn.length is the number of parameters to be passed to the original function.
// If args.length is not equal to fn.length, return a new function that recursively calls curried with the combined arguments: curried(...args, ...newArgs).
// Do this until the number of combined arguments is equal to fn.length, then we call the original fn with the completed arguments.

// How currying works: We return a new function with the combined arguments. That function can now be called with more arguments, which in turn will return another new function with the combined arguments, and so on.

// d = depth of function chain
// Time Complexity: O(d) 75ms 
// Space Complexity: O(d) 49.2MB
var curry = function(fn) {
  return function curried(...args) {
    if (fn.length === args.length) return fn(...args);
    return (...newArgs) => curried(...args, ...newArgs);
  };
};

// Example test case
function sum(a, b) { return a + b; }
const csum = curry(sum);
console.log(csum(1)(2)) // 3