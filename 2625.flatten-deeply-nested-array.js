// 2625. Flatten Deeply Nested Array
// Write a function that accepts a multi-dimensional array arr and a depth n, and returns a flattened version of that array.
// A multi-dimensional array is a recursive data structure that contains integers or other multi-dimensional arrays.
// A flattened array is a version of that array with some or all of the sub-arrays removed and replaced with the actual elements in that sub-array. This flattening operation should only be done if the current depth of nesting is greater than n. The depth of the elements in the first array are considered to be 0.
// Please solve it without the built-in Array.flat method.


// Solution: Recursion

// Recursively traverse the arr while keeping track of the depth (using n).
// Recursively flatten the array level by level while n > 0. By using the spread operator, we flatten the array by 1 level.

// Time Complexity: O(n) 209ms
// Space Complexity: O(n) 73.1MB
var flat = function (arr, n) {
  if (n === 0) return arr;
  let flattened = [];
  for (let el of arr) {
    if (Array.isArray(el)) flattened.push(...flat(el, n - 1));
    else flattened.push(el);
  }
  return flattened;
};

// Two test cases
console.log(flat([1,2,3,[4,5,6],[7,8,[9,10,11],12],[13,14,15]], 0)) // [1,2,3,[4,5,6],[7,8,[9,10,11],12],[13,14,15]]
console.log(flat([1,2,3,[4,5,6],[7,8,[9,10,11],12],[13,14,15]], 1)) // [1,2,3,4,5,6,7,8,[9,10,11],12,13,14,15]