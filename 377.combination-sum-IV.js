// 377. Combination Sum IV
// Given an array of distinct integers nums and a target integer target, return the number of possible combinations that add up to target.
// The answer is guaranteed to fit in a 32-bit integer.


// Solution 1: DP - Recursion w/ Memoization

// Memoize each dp(sum).
// For each dp(sum), try taking each nums[i] as the next number in the combination.
  // If sum is equal to the target, we have found a valid combination.
  // If the sum exceeds target, return early.

// The advantages of using recursion and memoization is that it only goes through possible scenarios, 
// whereas an iterative approach would go through every possible combination even though there are cases that are impossible to get to.

// Time Complexity: O(n * target) 46ms
// Space Complexity: O(target) 41.5MB
var combinationSum4 = function(nums, target) {
  let n = nums.length, memo = Array(target + 1).fill(-1);
  return dp(0);
  
  function dp(sum) {
    if (sum > target) return 0;
    if (sum === target) return 1;
    if (memo[sum] !== -1) return memo[sum];
    
    let ways = 0;
    for (let i = 0; i < n; i++) {
      ways += dp(sum + nums[i]);
    }
    return memo[sum] = ways;
  }  
};


// Solution 2: DP - Iterative & Bottom Up 

// Bottom up iterative version.
// dp[sum] = the number of combinations with sum equal to `sum` 

// Time Complexity: O(n * target) 54ms
// Space Complexity: O(target) 42.3MB
var combinationSum4 = function(nums, target) {
  let n = nums.length, dp = Array(target + 1).fill(0);
  dp[0] = 1;
  for (let sum = 1; sum <= target; sum++) {
    for (let i = 0; i < n; i++) {
      if (sum < nums[i]) continue;
      dp[sum] += dp[sum - nums[i]];
    }
  }
  return dp[target];
};

// Two test cases
console.log(combinationSum4([1,2,3], 4)) // 7
console.log(combinationSum4([9], 3)) // 0