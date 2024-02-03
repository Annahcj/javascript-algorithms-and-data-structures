// 1043. Partition Array for Maximum Sum
// Given an integer array arr, partition the array into (contiguous) subarrays of length at most k. After partitioning, each subarray has their values changed to become the maximum value of that subarray.
// Return the largest sum of the given array after partitioning. Test cases are generated so that the answer fits in a 32-bit integer.


// Solution 1: DP - Recursion w/ Memoization

// Memoize each dp(i), where dp(i) = maximum sum for the suffix from index i to index n - 1.
// For each dp(i), try each partition index j, where i <= j, while keeping track of the current maximum value so far.
// Record the maximum total sum out of each possible partition.

// n = length of arr
// Time Complexity: O(nk) 67ms
// Space Complexity: O(n) 49.5MB
var maxSumAfterPartitioning = function(arr, k) {
  let n = arr.length, memo = Array(n).fill(-1);
  return dp(0);
  
  function dp(i) {
    if (i === n) return 0;
    if (memo[i] !== -1) return memo[i];
    
    let maxSum = 0, currMax = 0;
    for (let j = i; j < Math.min(n, i + k); j++) {
      currMax = Math.max(currMax, arr[j]);
      maxSum = Math.max(maxSum, (j - i + 1) * currMax + dp(j + 1));
    }
    return memo[i] = maxSum;
  }
};


// Solution 2: DP - Bottom Up & Iterative

// Iterative, bottom-up DP.
// Each dp[i] = maximum sum for (arr[0], ..., arr[i]).

// Time Complexity: O(nk) 64ms
// Space Complexity: O(n) 48.3MB
var maxSumAfterPartitioning = function(arr, k) {
  let n = arr.length, dp = Array(n + 1).fill(0);  
  for (let i = 0; i < n; i++) {
    let currMax = 0;
    for (let j = i; j >= Math.max(0, i - k + 1); j--) {
      currMax = Math.max(currMax, arr[j]);
      dp[i + 1] = Math.max(dp[i + 1], (i - j + 1) * currMax + dp[j]);
    }
  }
  return dp[n];
};

// Three test cases 
console.log(maxSumAfterPartitioning([1,15,7,9,2,5,10], 3)) // 84
console.log(maxSumAfterPartitioning([1,4,1,5,7,3,6,1,9,9,3], 4)) // 83
console.log(maxSumAfterPartitioning([1], 1)) // 1