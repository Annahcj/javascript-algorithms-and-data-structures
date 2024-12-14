// 3381. Maximum Subarray Sum With Length Divisible by K
// You are given an array of integers nums and an integer k.
// Return the maximum sum of a subarray of nums, such that the size of the subarray is divisible by k.


// Solution: Prefix Sum & Enumeration

// Go through every start index i from 0 to k.
// For every start index, go through each subarray segment of size k up to the end of the array. Segments of k so that the subarray size is divisible by k.
// Keep track of the prefix sum for every subarray segment, and record the maximum: prefix sum - minimum recorded prefix sum for this start index.

// n = length of nums
// Time Complexity: O(n) 33ms
// Space Complexity: O(n) 83.4MB
function maxSubarraySum(nums, k) {
  const n = nums.length, pSum = [0, ...nums];
  for (let i = 1; i <= n; i++) {
    pSum[i] += pSum[i - 1];
  }
  let maxSum = -Infinity;
  for (let i = 0; i < k; i++) {
    let minSum = 0, sum = 0;
    for (let j = i; j + k - 1 < n; j += k) {
      sum += pSum[j + k] - pSum[j];
      maxSum = Math.max(maxSum, sum - minSum);
      minSum = Math.min(minSum, sum);
    }
  }
  return maxSum;
};

// Three test cases
console.log(maxSubarraySum([1,2], 1)) // 3
console.log(maxSubarraySum([-1,-2,-3,-4,-5], 4)) // -10
console.log(maxSubarraySum([-5,1,2,-3,4], 2)) // 4