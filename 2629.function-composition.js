// 2629. Function Composition
// Given an array of functions [f1, f2, f3, ..., fn], return a new function fn that is the function composition of the array of functions.
// The function composition of [f(x), g(x), h(x)] is fn(x) = f(g(h(x))).
// The function composition of an empty list of functions is the identity function f(x) = x.
// You may assume each function in the array accepts one integer as input and returns one integer as output.


// Solution 1: Iteration

// Iterate through functions backwards and assign val = functions[i](val) as we go.

// Time Complexity: O(n) 72ms
// Space Complexity: O(1) 43.8MB
var compose = function(functions) {
  return function(x) {
    let val = x;
    for (let i = functions.length - 1; i >= 0; i--) {
      val = functions[i](val);
    }
    return val;  
  }
};

// Solution 2: reduceRight

// Time Complexity: O(n) 83ms
// Space Complexity: O(1) 43.7MB
var compose = function(functions) {
  return (x) => functions.reduceRight((res, fn) => fn(res), x);
};