// 1749. Maximum Absolute Sum of Any Subarray
// You are given an integer array nums. The absolute sum of a subarray [numsl, numsl+1, ..., numsr-1, numsr] is abs(numsl + numsl+1 + ... + numsr-1 + numsr).
// Return the maximum absolute sum of any (possibly empty) subarray of nums.
// Note that abs(x) is defined as follows:
  // If x is a negative integer, then abs(x) = -x.
  // If x is a non-negative integer, then abs(x) = x.


// Solution: Kadane's Algorithm

// Use Kadane's Algorithm to find the maximum and minimum subarray sum.
// Take the maximum out of (maximum sum, abs(minimum sum)).

// Time Complexity: O(n) 81ms
// Space Complexity: O(1) 47.4MB
var maxAbsoluteSum = function(nums) {
  let currMinSum = nums[0], currMaxSum = nums[0];
  let minSum = nums[0], maxSum = nums[0];
  for (let i = 1; i < nums.length; i++) {
    currMinSum = Math.min(currMinSum + nums[i], nums[i]);
    currMaxSum = Math.max(currMaxSum + nums[i], nums[i]);
    minSum = Math.min(minSum, currMinSum);
    maxSum = Math.max(maxSum, currMaxSum);
  }
  return Math.max(maxSum, Math.abs(minSum));
};

// Three test cases
console.log(maxAbsoluteSum([1,-3,2,3,-4])) // 5
console.log(maxAbsoluteSum([2,-5,1,-4,3,-2])) // 8
console.log(maxAbsoluteSum([-2,-3,-4])) // 9