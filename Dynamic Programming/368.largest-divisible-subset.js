// 368. Largest Divisible Subset
// Given a set of distinct positive integers nums, return the largest subset answer such that every pair (answer[i], answer[j]) of elements in this subset satisfies:
//   answer[i] % answer[j] == 0, or
//   answer[j] % answer[i] == 0
// If there are multiple solutions, return any of them.


// Solution: Dynamic Programming

// 1. Sort nums in asc order
// 2. Use dynamic programming to record the longest subset lengths at each position.
// 3. Find the longest subset backwards, then reverse.

// Time Complexity: O(n^2 + n log(n)) 100ms
// Space Complexity: O(n) 40.5MB
var largestDivisibleSubset = function(nums) {
  let n = nums.length;
  nums.sort((a, b) => a - b);
  let maxLen = 1;
  let dp = Array(n).fill(1);
  for (var i = 0; i < n; i++) {
    for (var j = i - 1; j >= 0; j--) {
      if (nums[i] % nums[j] === 0) {
        dp[i] = Math.max(dp[i], dp[j] + 1);
        // record max length
        maxLen = Math.max(maxLen, dp[i]);
      }
    }
  }
  let res = [];
  for (var i = n - 1; i >= 0; i--) {
    // if length is maxLen so far, and res is empty or last item is divisible by nums[i], push into res and decrement maxLen.
    if (dp[i] === maxLen && (!res.length || res[res.length - 1] % nums[i] === 0)) {
      res.push(nums[i]);
      maxLen--;
    }
    if (maxLen === 0) break;
  }
  return res.reverse();
};

// Three test cases to run function on
console.log(largestDivisibleSubset([2,3,4,8])) // [2,4,8]
console.log(largestDivisibleSubset([1,2,3])) // [1,2]
console.log(largestDivisibleSubset([1,2,4,8])) // [1,2,4,8]