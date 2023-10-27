// 918. Maximum Sum Circular Subarray
// Given a circular integer array nums of length n, return the maximum possible sum of a non-empty subarray of nums.
// A circular array means the end of the array connects to the beginning of the array. Formally, the next element of nums[i] is nums[(i + 1) % n] and the previous element of nums[i] is nums[(i - 1 + n) % n].
// A subarray may only include each element of the fixed buffer nums at most once. Formally, for a subarray nums[i], nums[i + 1], ..., nums[j], there does not exist i <= k1, k2 <= j with k1 % n == k2 % n.


// Solution: Kadane's Algorithm

// We take the maximum sum out of:
  // 1. Maximum subarray sum (normal case, subarray within nums)
  // 2. Total sum - minimum subarray sum (circular case, with prefix and suffix subarrays combined)

// Use Kadane's Algorithm to find the maximum and minimum subarray sum.

// Special case: All numbers are negative (if all numbers are negative, max sum will be negative)
  // Since we can't take an empty array, the best case is to take the largest number in the array.

// Time Complexity: O(n) 102ms
// Space Complexity: O(1) 48.1MB
var maxSubarraySumCircular = function(nums) {
  let currMinSum = nums[0], currMaxSum = nums[0];
  let minSum = nums[0], maxSum = nums[0], totalSum = nums[0];
  for (let i = 1; i < nums.length; i++) {
    currMinSum = Math.min(currMinSum + nums[i], nums[i]);
    currMaxSum = Math.max(currMaxSum + nums[i], nums[i]);
    minSum = Math.min(minSum, currMinSum);
    maxSum = Math.max(maxSum, currMaxSum);
    totalSum += nums[i];
  }  
  return maxSum <= 0 ? maxSum : Math.max(maxSum, totalSum - minSum);
};

// Three test cases
console.log(maxSubarraySumCircular([1,-2,3,-2])) // 3
console.log(maxSubarraySumCircular([5,-3,5])) // 10
console.log(maxSubarraySumCircular([-3,-2,-3])) // -2