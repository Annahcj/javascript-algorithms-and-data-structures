// 1526. Minimum Number of Increments on Subarrays to Form a Target Array
// You are given an integer array target. You have an integer array initial of the same size as target with all elements initially zeros.
// In one operation you can choose any subarray from initial and increment each value by one.
// Return the minimum number of operations to form a target array from initial.
// The test cases are generated so that the answer fits in a 32-bit integer.


// Solution: Monotonic Increasing Stack

// The greedy approach will yield the minimum number of operations.
// Use a monotonic increasing stack.
// As we remove larger numbers from the top of the stack, the number of operations will be: the number at the top of the stack - target[i]
  // The maximum number for each "group" will indicate the minimum number of operations we will need.
// At the end, return the current operations + stack[stack.length - 1].

// Time Complexity: O(n) 86ms
// Space Complexity: O(n) 52MB
var minNumberOperations = function(target) {
  let n = target.length, stack = [], operations = 0;
  for (let i = 0; i < n; i++) {
    if (stack.length && stack[stack.length - 1] > target[i]) {
      operations += stack[stack.length - 1] - target[i];
    }
    while (stack.length && stack[stack.length - 1] >= target[i]) {
      stack.pop();
    }
    stack.push(target[i]);
  }
  return operations + stack[stack.length - 1];
};

// Three test cases
console.log(minNumberOperations([1,2,3,2,1])) // 3
console.log(minNumberOperations([3,1,1,2])) // 4
console.log(minNumberOperations([3,1,5,4,2])) // 7