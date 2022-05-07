// 456. 132 Pattern
// Given an array of n integers nums, a 132 pattern is a subsequence of three integers nums[i], nums[j] and nums[k] such that i < j < k and nums[i] < nums[k] < nums[j].
// Return true if there is a 132 pattern in nums, otherwise, return false.


// Solution: Decreasing Stack

// 1. Populate an array min, where min[i] = minimum number in nums in the range of [0, ..., i]
// 2. Keep a monotonic decreasing stack and loop from back to front.
  // Try each nums[i] as the middle number.
  // The 3rd number must be larger than the 1st number, so if nums[i] <= min[i], skip it.
  // Pop out numbers that are not valid as 3rd numbers (too small). 
    // This works because the values of min will only get bigger or stay the same as we continue to the left.
  // At this point, stack[top] will be the smallest possible number larger than min[i].
  // Check whether it is a valid 132 pattern: if stack[top] < nums[i]
    // We know that all values in the stack must be >= min[i]
    // So if stack[top] < nums[i], we have found a 132 pattern.

// Why the stack is always decreasing:
  // If a number is still in the stack, that means it is larger than min[i].
  // Otherwise it will be popped off.
  // Then, if the condition is satisfied, we will return true.
  // A smaller number 3rd that satisfies the condition of 1st < 3rd will always return first.

// Time Complexity: O(n) 122ms
// Space Complexity: O(n) 54.4MB
var find132pattern = function(nums) {
  let n = nums.length, min = Array(n);
  min[0] = nums[0];
  for (let i = 1; i < n; i++) {
    min[i] = Math.min(min[i - 1], nums[i]);
  }
  
  let stack = [];
  for (let i = n - 1; i > 0; i--) {
    if (nums[i] <= min[i]) continue; 
    while (stack.length && stack[stack.length - 1] <= min[i]) stack.pop();
    if (stack.length && stack[stack.length - 1] < nums[i]) return true;
    stack.push(nums[i]);
  }
  return false;
};

// Two test cases to run function on
console.log(find132pattern([1,2,3,4])) // false
console.log(find132pattern([3,1,4,2])) // true