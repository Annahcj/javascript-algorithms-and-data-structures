// 1262. Greatest Sum Divisible by Three
// Given an array nums of integers, we need to find the maximum possible sum of elements of the array such that it is divisible by three.


// Solution: Dynamic Programming & Modulo

// Try all combinations of numbers using dynamic programming.
// Use the modulo so that there are three situations:
  // remainder: 0
  // remainder: 1
  // remainder: 2

// Since we only need the previous values, we only need an array 'dp' of size 3.
// dp[0] = maximum sum with remainder of 0
// dp[1] = maximum sum with remainder of 1
// dp[2] = maximum sum with remainder of 2

// Time Complexity: O(3n) = O(n) 71ms
// Space Complexity: O(1) 50.1MB
var maxSumDivThree = function(nums) {
  let n = nums.length, dp = Array(3).fill(0);
  for (let i = 0; i < n; i++) {
    let next = [...dp];
    for (let j = 0; j < 3; j++) {
      let newMod = (nums[i] + dp[j]) % 3;
      next[newMod] = Math.max(next[newMod], dp[j] + nums[i]);
    }
    dp = next;
  }
  return dp[0];
};

// Three test cases 
console.log(maxSumDivThree([3,6,5,1,8])) // 18
console.log(maxSumDivThree([4])) // 0
console.log(maxSumDivThree([1,2,3,4,4])) // 12