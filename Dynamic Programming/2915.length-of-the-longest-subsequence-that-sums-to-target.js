// 2915. Length of the Longest Subsequence That Sums to Target
// You are given a 0-indexed array of integers nums, and an integer target.
// Return the length of the longest subsequence of nums that sums up to target. If no such subsequence exists, return -1.
// A subsequence is an array that can be derived from another array by deleting some or no elements without changing the order of the remaining elements.
 

// Solution: Knapsack DP

// Memoize each dp(i, remaining), where dp(i, remaining) = the maximum length of a subsequence from index i onwards, and `remaining` sum left in target.

// For each dp(i, remaining), we can either take nums[i] or skip it. 
// Record the maximum subsequence length.

// Time Complexity: O(n * target) 644ms
// Space Complexity: O(n * target) 125.4MB
var lengthOfLongestSubsequence = function(nums, target) {
  let n = nums.length, memo = Array(n).fill(0).map(() => Array(target + 1).fill(-1));
  let res = dp(0, target);
  return res === -Infinity ? -1 : res;
  
  function dp(i, remaining) {
    if (remaining === 0) return 0;
    if (i === n || remaining < 0) return -Infinity;
    if (memo[i][remaining] !== -1) return memo[i][remaining];
    
    return memo[i][remaining] = Math.max(1 + dp(i + 1, remaining - nums[i]), dp(i + 1, remaining));
  }
};

// Three test cases
console.log(lengthOfLongestSubsequence([1,2,3,4,5], 9)) // 3
console.log(lengthOfLongestSubsequence([4,1,3,2,1,5], 7)) // 4
console.log(lengthOfLongestSubsequence([1,1,5,4,5], 3)) // -1
