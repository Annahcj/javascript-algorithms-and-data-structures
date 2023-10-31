// 2369. Check if There is a Valid Partition For The Array
// You are given a 0-indexed integer array nums. You have to partition the array into one or more contiguous subarrays.
// We call a partition of the array valid if each of the obtained subarrays satisfies one of the following conditions:
  // The subarray consists of exactly 2 equal elements. For example, the subarray [2,2] is good.
  // The subarray consists of exactly 3 equal elements. For example, the subarray [4,4,4] is good.
  // The subarray consists of exactly 3 consecutive increasing elements, that is, the difference between adjacent elements is 1. For example, the subarray [3,4,5] is good, but the subarray [1,3,5] is not.
// Return true if the array has at least one valid partition. Otherwise, return false.


// Solution 1: DP - Recursion w/ Memoization

// Memoize each dp(i), where dp(i) = whether it is possible to have a valid partition from index i to n.
// For each index i, try to make it part of a valid partition (one of the three cases):
  // 1. Two equal elements
  // 2. Three equal elements
  // 3. Three consecutive elements

// Time Complexity: O(n) 158ms
// Space Complexity: O(n) 59.9MB
var validPartition = function(nums) {
  let n = nums.length, memo = Array(n).fill(-1);
  return dp(0);

  function dp(i) {
    if (i === n) return true;
    if (i === n - 1) return false;
    if (memo[i] !== -1) return memo[i];

    if (nums[i] === nums[i + 1] && dp(i + 2)) return memo[i] = true;
    if (i < n - 2) {
      if (!dp(i + 3)) return memo[i] = false;
      let hasThreeEqual = nums[i] === nums[i + 1] && nums[i + 1] === nums[i + 2];
      let hasThreeConsecutive = nums[i] + 1 === nums[i + 1] && nums[i + 1] + 1 === nums[i + 2];
      if (hasThreeEqual || hasThreeConsecutive) return memo[i] = true;
    }
    return memo[i] = false;
  }  
};


// Solution 2: DP - Tabulation

// We can save a bit of space by using iteration instead of recursion.

// Time Complexity: O(n) 122ms
// Space Complexity: O(n) 54.3MB
var validPartition = function(nums) {
  let n = nums.length, dp = Array(n + 1).fill(false);
  dp[n] = true;
  for (let i = n - 2; i >= 0; i--) {
    if (nums[i] === nums[i + 1] && dp[i + 2]) dp[i] = true;
    else if (i < n - 2) {
      if (!dp[i + 3]) continue;
      let hasThreeEqual = nums[i] === nums[i + 1] && nums[i + 1] === nums[i + 2];
      let hasThreeConsecutive = nums[i] + 1 === nums[i + 1] && nums[i + 1] + 1 === nums[i + 2];
      if (hasThreeEqual || hasThreeConsecutive) dp[i] = true;
    }
  }
  return dp[0];
};

// Two test cases
console.log(validPartition([4,4,4,5,6])) // true
console.log(validPartition([1,1,1,2])) // false