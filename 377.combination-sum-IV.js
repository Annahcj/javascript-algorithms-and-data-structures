// 377. Combination Sum IV
// Given an array of distinct integers nums and a target integer target, return the number of possible combinations that add up to target.
// The answer is guaranteed to fit in a 32-bit integer.


// Solution: Dynamic Programming

// n = nums.length, m = target
// Time Complexity: O(nm) 80ms
// Space Complexity: O(m) 41MB
var combinationSum4 = function(nums, target) {
  let dp = Array(target + 1).fill(0);
  dp[0] = 1; // there is one way to get 0
  for (var i = 1; i <= target; i++) { // loop from 1 to target
    for (var num of nums) { // loop through each num
      dp[i] += (dp[i - num] || 0); // add number of combinations to get to i - num
    }
  }  
  return dp[target];
};

// Two test cases to run function on
console.log(combinationSum4([1,2,3], 4)) // 7
console.log(combinationSum4([9], 3)) // 0