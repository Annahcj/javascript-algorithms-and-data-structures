// 2750. Ways to Split Array Into Good Subarrays
// You are given a binary array nums.
// A subarray of an array is good if it contains exactly one element with the value 1.
// Return an integer denoting the number of ways to split the array nums into good subarrays. As the number may be too large, return it modulo 10^9 + 7.
// A subarray is a contiguous non-empty sequence of elements within an array.


// Solution: Multiply Index Differences

// 1. Collect the indexes of all 1's.
// 2. Multiply the index difference between each adjacent pair of 1's.

// e.g: 010001

// The difference between the first pair of 1's = 4
// This indicates 4 different places to split:
  // 01|0001
  // 010|001
  // 0100|01
  // 01000|1

// We do the same for each other adjacent pair of 1's and multiply the differences together to get the total combinations.

// Time Complexity: O(n) 133ms
// Space Complexity: O(n) 60MB
var numberOfGoodSubarraySplits = function(nums) {
  let n = nums.length, MOD = 10 ** 9 + 7, oneIndexes = [];
  for (let i = 0; i < n; i++) {
    if (nums[i] === 1) oneIndexes.push(i);
  }
  if (oneIndexes.length === 0) return 0;
  let ans = 1;
  for (let i = 1; i < oneIndexes.length; i++) {
    let ways = oneIndexes[i] - oneIndexes[i - 1];
    ans = (ans * ways) % MOD;
  }
  return ans;
};

// Two test cases
console.log(numberOfGoodSubarraySplits([0,1,0,0,1])) // 3
console.log(numberOfGoodSubarraySplits([0,1,0])) // 1