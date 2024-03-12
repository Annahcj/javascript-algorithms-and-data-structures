// 3077. Maximum Strength of K Disjoint Subarrays
// You are given a 0-indexed array of integers nums of length n, and a positive odd integer k.
// The strength of x subarrays is defined as strength = sum[1] * x - sum[2] * (x - 1) + sum[3] * (x - 2) - sum[4] * (x - 3) + ... + sum[x] * 1 where sum[i] is the sum of the elements in the ith subarray. Formally, strength is sum of (-1)i+1 * sum[i] * (x - i + 1) over all i's such that 1 <= i <= x.
// You need to select k disjoint subarrays from nums, such that their strength is maximum.
// Return the maximum possible strength that can be obtained.
// Note that the selected subarrays don't need to cover the entire array.


// Solution: DP

// Memoize each dp(i, k, isEmpty), where
  // i = index in nums
  // k = number of subarrays left to create
  // isEmpty = boolean indicating whether the current subarray is empty

// Note: We don't need to store the sum of the subarray before multiplying by x. We can multiply each number individually and sum them together for a subarray.

// For each dp(i, k, isEmpty), we have three choices:
  // 1. Include nums[i] in the current subarray and continue on the same subarray.
  // 2. Include nums[i] in the current subarray and create a new subarray.
  // 3. Skip nums[i]. If the current subarray is empty, we don't need to create a new subarray. If not, create a new subarray.

// Record and return the minimum total strength.

// Note:
  // The memo is ordered as [n][2][k] instead of [n][k][2] due to cache locality.
  // When accessing an array element, a chunk of contiguous elements are cached together and will therefore be much quicker for look-up for uncoming calls.
  // The inner/last level ([k]) will be ordered as a "flat" array, which means contiguous elements in that level will be cached together.
  // k can be much larger than 2, so having k as the last element will improve the performance due to more cache hits.

// Time Complexity: O(nk) 1234ms
// Space Complexity: O(nk) 91.4MB
var maximumStrength = function(nums, k) {
  let n = nums.length, memo = Array(n).fill(0).map(() => Array(2).fill(0).map(() => Array(k + 1).fill(-1)));
  return dp(0, k, 1);
  
  function dp(i, k, isEmpty) {
    if (k === 0) return 0;
    if (i === n) return -Infinity;
    if (memo[i][isEmpty][k] !== -1) return memo[i][isEmpty][k];
    
    let skip = isEmpty ? dp(i + 1, k, isEmpty) : dp(i + 1, k - 1, 1);
    let value = (k % 2 === 1) ? k * nums[i] : -(k * nums[i]);
    let takeAndContinue = value + dp(i + 1, k, 0);
    let takeAndCreateNew = value + dp(i + 1, k - 1, 1);
    return memo[i][isEmpty][k] = Math.max(skip, takeAndContinue, takeAndCreateNew);
  }  
};

// Three test cases
console.log(maximumStrength([1,2,3,-1,2], 3)) // 22
console.log(maximumStrength([12,-2,-2,-2,-2], 5)) // 64
console.log(maximumStrength([-1,-2,-3], 1)) // -1