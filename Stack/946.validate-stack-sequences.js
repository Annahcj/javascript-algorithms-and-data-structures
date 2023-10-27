// 946. Validate Stack Sequences
// Given two integer arrays pushed and popped each with distinct values, return true if this could have been the result of a sequence of push and pop operations on an initially empty stack, or false otherwise.


// Solution: Stack Simulation 

// Simulate the stack using the values in pushed.
// Wait for each value of pushed[i] to turn up as the last element in the stack, then pop it off.

// Keep a pointer for the index we are up to in popped.

// Time Complexity: O(n) 68ms
// Space Complexity: O(n) 42.8MB
var validateStackSequences = function(pushed, popped) {
  let stack = [], j = 0, n = pushed.length;
  for (let i = 0; i < n; i++) {
    stack.push(pushed[i]);
    while (stack.length && stack[stack.length - 1] === popped[j]) {
      stack.pop();
      j++;
    } 
  }
  return j === n;
};

// Two test cases
console.log(validateStackSequences([1,2,3,4,5], [4,5,3,2,1])) // true
console.log(validateStackSequences([1,2,3,4,5], [4,3,5,1,2])) // false