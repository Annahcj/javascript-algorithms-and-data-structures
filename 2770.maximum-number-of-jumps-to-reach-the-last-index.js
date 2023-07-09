// 2770. Maximum Number of Jumps to Reach the Last Index
// You are given a 0-indexed array nums of n integers and an integer target.
// You are initially positioned at index 0. In one step, you can jump from index i to any index j such that:
  // 0 <= i < j < n
  // -target <= nums[j] - nums[i] <= target
// Return the maximum number of jumps you can make to reach index n - 1.
// If there is no way to reach index n - 1, return -1.


// Solution: DP

// Populate dp, where dp[i] = maximum number of jumps to reach nums[i] from nums[0].
// For each nums[j], go through each nums[i] where i < j, and if -target <= nums[j] - nums[i] <= target, then record dp[j] = Math.max(dp[j], 1 + dp[i]).
// At the end, return dp[n - 1].

// Time Complexity: O(n^2) 135ms
// Space Complexity: O(n) 48MB
var maximumJumps = function(nums, target) {
  let n = nums.length, dp = Array(n).fill(-Infinity); 
  dp[0] = 0;
  for (let j = 1; j < n; j++) {
    for (let i = 0; i < j; i++) {
      if (nums[j] - nums[i] <= target && nums[j] - nums[i] >= -target) {
        dp[j] = Math.max(dp[j], 1 + dp[i]);
      }
    }
  }
  return dp[n - 1] === -Infinity ? -1 : dp[n - 1];
};

// Three test cases
console.log(maximumJumps([1,3,6,4,1,2], 2)) // 3
console.log(maximumJumps([1,3,6,4,1,2], 3)) // 5
console.log(maximumJumps([1,3,6,4,1,2], 0)) // -1