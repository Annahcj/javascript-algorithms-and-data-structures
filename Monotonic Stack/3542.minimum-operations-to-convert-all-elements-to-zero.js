// 3542. Minimum Operations to Convert All Elements to Zero
// You are given an array nums of size n, consisting of non-negative integers. Your task is to apply some (possibly zero) operations on the array so that all elements become 0.
// In one operation, you can select a subarray [i, j] (where 0 <= i <= j < n) and set all occurrences of the minimum non-negative integer in that subarray to 0.
// Return the minimum number of operations required to make all elements in the array 0.


// Solution: Monotonic Stack

// Maintain a monotonic increasing stack.
// Pop the top off the stack while it's greater than nums[i].
// If nums[i] is equal to the top of the stack, do nothing.
// Otherwise, add one operation when pushing a new element to the stack.

// Dry run: [1,1,3,2,3,3,2,1]
  // i = 0: stack = [1], operations = 1.
  // i = 1: stack = [1], operations = 1.
  // i = 2: stack = [1,3], operations = 2.
  // i = 3: stack = [1,2], operations = 3.
  // i = 4: stack = [1,2,3], operations = 4.
  // i = 5: stack = [1,2,3], operations = 4.
  // i = 6: stack = [1,2], operations = 4.
  // i = 7: stack = [1], operations = 4.
// Observe how we have grouped elements:
  // [1,1,3,2,3,3,2,1]
  // [3]
  // [2,3,3,2]
  // [3,3]

// Time Complexity: O(n) 13ms
// Space Complexity: O(n) 77MB
function minOperations(nums) {
  const stack = [];
  let operations = 0;
  for (let num of nums) {
    while (stack.length && stack[stack.length - 1] > num) {
      stack.pop();
    }
    if (!stack.length || stack[stack.length - 1] < num) {
      stack.push(num);
      if (num > 0) {
        operations++;
      }
    }
  }
  return operations;
};

// Three test cases
console.log(minOperations([0,2])) // 1
console.log(minOperations([3,1,2,1])) // 3
console.log(minOperations([1,2,1,2,1,2])) // 4