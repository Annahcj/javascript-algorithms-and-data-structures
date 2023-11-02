// 2625. Flatten Deeply Nested Array
// Write a function that accepts a multi-dimensional array arr and a depth n, and returns a flattened version of that array.
// A multi-dimensional array is a recursive data structure that contains integers or other multi-dimensional arrays.
// A flattened array is a version of that array with some or all of the sub-arrays removed and replaced with the actual elements in that sub-array. This flattening operation should only be done if the current depth of nesting is greater than n. The depth of the elements in the first array are considered to be 0.
// Please solve it without the built-in Array.flat method.


// Solution: Recursion 

// We push to the result array on the fly instead of spreading to bring the time complexity to O(n).

// n = length of arr, d = depth of arr
// Time Complexity: O(n) 115ms
// Space Complexity: O(d) (not including output) 62.9MB
var flat = function (arr, n) {
  const res = [];
  flatten(arr, n);
  return res;
  
  function flatten(arr, n) {
    for (const element of arr) {
      if (n === 0 || !Array.isArray(element)) {
        res.push(element);
      } else {
        flatten(element, n - 1);
      } 
    }
  }
};

// Two test cases
console.log(flat([1,2,3,[4,5,6],[7,8,[9,10,11],12],[13,14,15]], 0)) // [1,2,3,[4,5,6],[7,8,[9,10,11],12],[13,14,15]]
console.log(flat([1,2,3,[4,5,6],[7,8,[9,10,11],12],[13,14,15]], 1)) // [1,2,3,4,5,6,7,8,[9,10,11],12,13,14,15]