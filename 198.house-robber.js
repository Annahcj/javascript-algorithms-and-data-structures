 // 198. House Robber
// You are a professional robber planning to rob houses along a street. Each house has a certain amount of money stashed, the only constraint stopping you from robbing each of them is that adjacent houses have security systems connected and it will automatically contact the police if two adjacent houses were broken into on the same night.
// Given an integer array nums representing the amount of money of each house, return the maximum amount of money you can rob tonight without alerting the police.


// Overview:
// At any given position, we can either rob the house and rob the next next house, or just rob the next house and NOT rob the current house.
// We can use dynamic programming to store the sum of the optimal choices at each point
// We can populate a dp array/object going as deep as possible (to the right).
// The last house will always have an optimal sum of itself, and the second to last house will also have an optimal sum of itself.


// Solution 1: Recursion w/ Dynamic Programming

// Logic:
// Set memo to an empty object 
// Call robFrom(0)
// robFrom: (idx) (index in nums)
  // base case: if idx is out of range (bigger than or equal to nums.length), return 0.
  // if we have been to this house/idx before, return memo[idx]
  // let ans be Math.max(robFrom(idx + 1) OR robFrom(idx + 2) + nums[idx])
  // set memo[idx] to ans
  // return ans.

// Time Complexity: O(n) 103MB
// Space Complexity: O(n) (memo + call stack) 38.7MB
var rob = function(nums) {
  let memo = {};
  return robFrom(0);
  function robFrom(idx) {
    if (idx >= nums.length) {
      return 0;
    }
    if (memo[idx] !== undefined) return memo[idx];
    let ans = Math.max(robFrom(idx + 1), robFrom(idx + 2) + nums[idx]);
    memo[idx] = ans;
    return ans;
  }  
};

// Solution 2: Tabular Approach / Iterative w/ Dynamic Programming

// In the recursive approach, we are technically computing the optimal choices from right to left, since it goes as far right as possible, then comes back to the left.
// Instead of using recursion and taking up more space, we can simply loop from right to left.
// We can use an array 'dp' with a length of nums.length + 1.
// We need an extra spot at the end with 0 (since nums could have a length of 1)
// n = nums.length
// Set dp[n] to 0, and set dp[n - 1] to nums[n - 1]
// Then, loop through nums from n - 2 to 0 (pointer = i)
  // set dp[i] to Math.max(dp[i + 1] OR dp[i + 2] + nums[i])
// Return dp[0]

// Time Complexity: O(n) 77ms
// Space Complexity: O(n) 38.5MB
var rob = function(nums) {
  let n = nums.length;
  if (!n) return 0;
  let dp = Array(n + 1);
  dp[n] = 0;
  dp[n - 1] = nums[n - 1];
  for (var i = n - 2; i >= 0; i--) {
    dp[i] = Math.max(dp[i + 1], dp[i + 2] + nums[i]);
  }
  return dp[0];
};

// Solution 3: Further Space Optimization 

// Notice that we are only comparing two adjacent variables at a time.
// Instead of using an array, we can simply use two variables (robNextNext and robNext) 
// Set robNextNext to 0, and set robNext to nums[n - 1]
// Loop through nums from n - 2 to 0 (pointer = i)
  // Let curr to Math.max(robNext OR robNextNext + nums[i])
  // update robNextNext to robNext
  // update robNext to curr
// Return robNext

// Time Complexity: O(n) 102ms
// Space Complexity: O(1) 38.3MB
var rob = function(nums) {
  let n = nums.length;
  if (!n) return 0;
  let robNextNext = 0, robNext = nums[n - 1];
  for (var i = n - 2; i >= 0; i--) {
    let curr = Math.max(robNext, robNextNext + nums[i]);
    robNextNext = robNext;
    robNext = curr;
  }
  return robNext;
};

// Two test cases to run function on
console.log(rob([1,2,3,1])) // 4
console.log(rob([2,7,9,3,1])) // 12