// 1911. Maximum Alternating Subsequence Sum
// The alternating sum of a 0-indexed array is defined as the sum of the elements at even indices minus the sum of the elements at odd indices.
  // For example, the alternating sum of [4,2,5,3] is (4 + 5) - (2 + 3) = 4.
// Given an array nums, return the maximum alternating sum of any subsequence of nums (after reindexing the elements of the subsequence).
// A subsequence of an array is a new array generated from the original array by deleting some elements (possibly none) without changing the remaining elements' relative order. For example, [2,7,4] is a subsequence of [4,2,3,7,2,1,4] (the underlined elements), while [2,4,2] is not.


// Solution 1: DP - Recursion w/ Memoization

// Memoize each dp(i, oddIndex), where
  // i = index in nums
  // oddIndex = 1 if the next number is at an odd index, 0 for even index.

// For each dp(i, oddIndex), we have two choices:
  // 1. Take nums[i] as part of the subsequence.  
    // If oddIndex is 1, we should subtract nums[i] from the sum. 
    // If oddIndex is 0, we should add nums[i] to the sum.
  // 2. Skip nums[i].

// Time Complexity: O(n) 317ms
// Space Complexity: O(n) 108.5MB
var maxAlternatingSum = function(nums) {
  let n = nums.length, memo = Array(n).fill(0).map(() => Array(2).fill(null));
  return dp(0, 0);
  
  function dp(i, oddIndex) {
    if (i === n) return 0;
    if (memo[i][oddIndex] !== null) return memo[i][oddIndex];
    
    let skip = dp(i + 1, oddIndex);
    let take = dp(i + 1, oddIndex ^ 1) + (oddIndex ? -nums[i] : nums[i]);
    return memo[i][oddIndex] = Math.max(skip, take);
  }
};


// Solution 2: Bottom Up DP

// Populate each dp[i][oddIndex], where 
  // i = index in nums
  // oddIndex = 0 if the last number is at an even indice, 1 if the last number is at an odd indice

// For each nums[i], we have two states to populate:
  // dp[i][1] (maximum subsequence sum ending at an odd index) = maximum out of:
    // Skip nums[i]: dp[i - 1][1]
    // Take nums[i]: dp[i - 1][0] - nums[i] (now we're at an odd index)
  // dp[i][0] (maximum subsequence sum ending at an even index) = maximum out of:
    // Skip nums[i]: dp[i - 1][0]
    // Take nums[i]: dp[i - 1][1] + nums[i] (now we're at an even index)

// Time Complexity: O(n) 251ms
// Space Complexity: O(n) 114.3MB 
var maxAlternatingSum = function(nums) {
  let n = nums.length, dp = Array(n).fill(0).map(() => Array(2).fill(0));
  dp[0][1] = 0, dp[0][0] = nums[0]; // skip nums[0] or take nums[0] as the first element
  for (let i = 1; i < n; i++) {
    dp[i][1] = Math.max(dp[i - 1][1], dp[i - 1][0] - nums[i]); // skip nums[i] or take result from previous even index (now we're at an odd index)
    dp[i][0] = Math.max(dp[i - 1][0], dp[i - 1][1] + nums[i]); // skip nums[i] or take result from previous odd index (now we're at an even index)
  }
  return Math.max(dp[n - 1][0], dp[n - 1][1]);
};


// Solution 3: Constant Space

// From the previous solution, we can notice that we only ever access the results from the previous index (dp[i - 1]).
// That means we can reduce the space complexity to O(1) by keeping track of the results from the previous index.

// Time Complexity: O(n) 89ms
// Space Complexity: O(1) 53.9MB
var maxAlternatingSum = function(nums) {
  let n = nums.length, prevOdd = 0, prevEven = nums[0]; // skip nums[0] or take nums[0] as the first element
  for (let i = 1; i < n; i++) {
    let currOdd = Math.max(prevOdd, prevEven - nums[i]); // skip nums[i] or take result from previous even index (now we're at an odd index)
    let currEven = Math.max(prevEven, prevOdd + nums[i]); // skip nums[i] or take result from previous odd index (now we're at an even index)
    prevOdd = currOdd;
    prevEven = currEven;
  }
  return Math.max(prevOdd, prevEven);
};

// Three test cases
console.log(maxAlternatingSum([4,2,5,3])) // 7
console.log(maxAlternatingSum([5,6,7,8])) // 8
console.log(maxAlternatingSum([6,2,1,2,4,5])) // 10