// 2547. Minimum Cost to Split an Array
// You are given an integer array nums and an integer k.
// Split the array into some number of non-empty subarrays. The cost of a split is the sum of the importance value of each subarray in the split.
// Let trimmed(subarray) be the version of the subarray where all numbers which appear only once are removed.
  // For example, trimmed([3,1,2,4,3,4]) = [3,4,3,4].
// The importance value of a subarray is k + trimmed(subarray).length.
  // For example, if a subarray is [1,2,3,3,3,4,4], then trimmed([1,2,3,3,3,4,4]) = [3,3,3,4,4].The importance value of this subarray will be k + 5.
// Return the minimum possible cost of a split of nums.
// A subarray is a contiguous non-empty sequence of elements within an array.


// Solution 1: DP - Recursion w/ Memoization

// Memoize each dp(i), where dp(i) = the minimum cost to split the subarray from index i to the end of nums.
// For each dp(i),
  // Go through every possible index j from i to n - 1. Try to take the subarray of range [i, j].
  // To calculate the number of length of the trimmed subarray:
    // Count the number of unique numbers. Get the trimmed length by: length of subarray - number of unique numbers.
    // Keep track of the count of each number in a hashmap.
    // If the current count is 0, add to the uniqueCount. (It is the first time we see this number, so it is unique)
    // If the current count is 1, subtract from uniqueCount. (Was previously a unique number)

// Time Complexity: O(n^2) 688ms
// Space Complexity: O(n) 70.9MB
var minCost = function(nums, k) {
  let n = nums.length, memo = Array(n).fill(-1);
  return dp(0);
  
  function dp(i) {
    if (i === n) return 0;
    if (memo[i] !== -1) return memo[i];
    
    let ans = Infinity, count = new Map(), uniqueCount = 0;
    for (let j = i; j < n; j++) {
      let currCount = count.get(nums[j]) || 0;
      if (currCount === 0) {
        uniqueCount++;
      } else if (currCount === 1) {
        uniqueCount--;
      }
      count.set(nums[j], currCount + 1);
      let nonUnique = (j - i + 1) - uniqueCount;
      let cost = k + nonUnique;
      ans = Math.min(ans, cost + dp(j + 1));
    }
    return memo[i] = ans;
  }  
};


// Solution 2: DP - Bottom Up

// Same idea as solution 1, except using iteration and going bottom-up instead of top-down.

// Time Complexity: O(n^2) 874ms
// Space Complexity: O(n) 48.1MB
var minCost = function(nums, k) {
  let n = nums.length, dp = Array(n + 1).fill(Infinity);
  dp[0] = 0;
  for (let i = 0; i < n; i++) {
    let count = new Map(), uniqueCount = 0;
    for (let j = i; j >= 0; j--) {
      let currCount = count.get(nums[j]) || 0;
      if (currCount === 0) {
        uniqueCount++;
      } else if (currCount === 1) {
        uniqueCount--;
      }
      count.set(nums[j], currCount + 1);
      let nonUnique = (i - j + 1) - uniqueCount;
      let cost = k + nonUnique;
      dp[i + 1] = Math.min(dp[i + 1], cost + dp[j]);
    }
  }
  return dp[n];
};

// Three test cases
console.log(minCost([1,2,1,2,1,3,3], 2)) // 8
console.log(minCost([1,2,1,2,1], 2)) // 6
console.log(minCost([1,2,1,2,1], 5)) // 10