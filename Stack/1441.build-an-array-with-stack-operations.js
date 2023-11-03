// 1441. Build an Array With Stack Operations
// You are given an integer array target and an integer n.
// You have an empty stack with the two following operations:
  // "Push": pushes an integer to the top of the stack.
  // "Pop": removes the integer on the top of the stack.
// You also have a stream of the integers in the range [1, n].
// Use the two stack operations to make the numbers in the stack (from the bottom to the top) equal to target. You should follow the following rules:
  // If the stream of the integers is not empty, pick the next integer from the stream and push it to the top of the stack.
  // If the stack is not empty, pop the integer at the top of the stack.
  // If, at any moment, the elements in the stack (from the bottom to the top) are equal to target, do not read new integers from the stream and do not do more operations on the stack.
// Return the stack operations needed to build target following the mentioned rules. If there are multiple valid answers, return any of them.


// Solution: Compare Adjacent

// Compare the numbers between each pair of adjacent elements in target.
// Count the numbers missing between the adjacent elements: target[i] - target[i - 1] - 1.
// If there are k numbers missing, we can do k push + pop operations.
  // Note: There are other ways to do this, but this way only needs one loop.
// Then, we can push target[i] to the stack with just one push operation.

// Time Complexity: O(n) 51ms
// Space Complexity: O(1) (not including output) 42MB
var buildArray = function(target, n) {
  target = [0, ...target];
  let stack = [];
  for (let i = 1; i < target.length; i++) {
    let missing = target[i] - target[i - 1] - 1;
    for (let k = 0; k < missing; k++) {
      stack.push('Push');
      stack.push('Pop');
    }
    stack.push('Push');
  }
  return stack;
};

// Three test cases
console.log(buildArray([1,3], 3)) // ["Push","Push","Pop","Push"]
console.log(buildArray([1,2,3], 3)) // ["Push","Push","Push"]
console.log(buildArray([1,2], 4)) // ["Push","Push"]