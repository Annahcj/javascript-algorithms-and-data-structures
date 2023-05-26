// 2649. Nested Array Generator
// Given a multi-dimensional array of integers, return a generator object which yields integers in the same order as inorder traversal.
// A multi-dimensional array is a recursive data structure that contains both integers and other multi-dimensional arrays.
// inorder traversal iterates over each array from left to right, yielding any integers it encounters or applying inorder traversal to any arrays it encounters.


// Solution: Recursion

// Recursively call inorderTraversal if the element is an array.
// Use yield* to iterate over and yield each value that is recursively returned by inorderTraversal(element).

// Time Complexity: O(n)
// Space Complexity: O(n)
var inorderTraversal = function*(arr) {
  for (const element of arr) {
    if (Array.isArray(element)) {
      yield* inorderTraversal(element);
    } else {
      yield element;
    }
  }  
};