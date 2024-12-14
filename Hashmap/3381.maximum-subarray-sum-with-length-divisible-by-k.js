// 3381. Maximum Subarray Sum With Length Divisible by K
// You are given an array of integers nums and an integer k.
// Return the maximum sum of a subarray of nums, such that the size of the subarray is divisible by k.


// Solution: Prefix Sum & Hashmap

// Keep track of a running prefix sum.
// Store the minimum prefix sum for every modulo index: i % k.
// minSum[mod index] = minimum prefix sum ending at an index where index % k = mod index.

// Get the maximum out of every: prefix sum - minSum[i % k].

// n = length of nums
// Time Complexity: O(n) 71ms
// Space Complexity: O(k) 78.9MB
function maxSubarraySum(nums, k) {
  const n = nums.length, minSum = {[k - 1]: 0};
  let sum = 0, maxSum = -Infinity;
  for (let i = 0; i < n; i++) {
    sum += nums[i];
    if (minSum[i % k] !== undefined) {
      maxSum = Math.max(maxSum, sum - minSum[i % k]);
    }
    minSum[i % k] = Math.min((minSum[i % k] ?? Infinity), sum);
  }
  return maxSum;
};

// Three test cases
console.log(maxSubarraySum([1,2], 1)) // 3
console.log(maxSubarraySum([-1,-2,-3,-4,-5], 4)) // -10
console.log(maxSubarraySum([-5,1,2,-3,4], 2)) // 4