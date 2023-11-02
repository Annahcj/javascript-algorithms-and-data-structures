// 1746. Maximum Subarray Sum After One Operation


// Solution: Dynamic Programming

// For every index in nums, we need to find the maximum subarray sum that includes element index - 1 and the maximum subarray sum that includes element index + 1.
// To know this, we need need two passes to calculate from right to left, and left to right.

// First, traverse nums from right to left, keeping a dp array 'right'.
  // set right[i] to the max of right[i + 1] + nums[i], or 0. (if the subarray on the right + nums[i] is negative, we can reset the sum to 0)
// Then, traverse from left to right, this time calculating the maximum subarray sum 'left' as we go.
  // update max if left + (nums[i] * nums[i]) + right[i + 1] is bigger than it
  // set left to the max of left + nums[i], or 0.
// Return max.

// Time Complexity: O(n) 108ms
// Space Complexity: O(n) 49.8MB
var maxSumAfterOperation = function(nums) {
  let n = nums.length;
  let right = Array(n);
  for (var i = n - 1; i >= 0; i--) {
    let last = i < n - 1 ? right[i + 1] : 0;
    right[i] = Math.max(last + nums[i], 0);
  }

  let left = 0, max = -Infinity;
  for (i = 0; i < n; i++) {
    let after = i < n - 1 ? right[i + 1] : 0;
    max = Math.max(max, left + (nums[i] * nums[i]) + after);
    left = Math.max(left + nums[i], 0);
  }
  return max;
};

// Two test cases
console.log(maxSumAfterOperation([2,-1,-4,-3])) // 17
console.log(maxSumAfterOperation([1,-1,1,1,-1,-1,1])) // 4