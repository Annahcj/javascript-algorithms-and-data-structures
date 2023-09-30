// 456. 132 Pattern
// Given an array of n integers nums, a 132 pattern is a subsequence of three integers nums[i], nums[j] and nums[k] such that i < j < k and nums[i] < nums[k] < nums[j].
// Return true if there is a 132 pattern in nums, otherwise, return false.


// Solution: Monotonic Decreasing Stack

// Find a pair (j, k) with maximum nums[j], where j < k and nums[j] > nums[k].
// Use a monotonic decreasing stack to keep track of potential nums[k]. 
  // Pop nums[k] from the top of the stack while nums[j] > nums[k].
  // Then we push the current nums[j] to the end of the stack as a future nums[k].
  // Record the largest nums[k] so far that we have popped from the stack.
// If the current maximum nums[k] > the current nums[i], we have found a 132 pattern and can return true.

// Time Complexity: O(n) 79ms
// Space Complexity: O(n) 54.1MB
var find132pattern = function(nums) {
  let n = nums.length, stack = [], maxK = -Infinity;
  for (let i = n - 1; i >= 0; i--) {
    if (maxK > nums[i]) return true; 
    // now we treat nums[i] as nums[j]
    while (stack.length && nums[i] > stack[stack.length - 1]) {
      maxK = Math.max(maxK, stack.pop());
    }
    stack.push(nums[i]); // now nums[i] is treated as a future nums[k]
  }
  return false;
};

// Two test cases 
console.log(find132pattern([1,2,3,4])) // false
console.log(find132pattern([3,1,4,2])) // true