// 1770. Maximum Score from Performing Multiplication Operations
// You are given two integer arrays nums and multipliers of size n and m respectively, where n >= m. The arrays are 1-indexed.
// You begin with a score of 0. You want to perform exactly m operations. On the ith operation (1-indexed), you will:
  // Choose one integer x from either the start or the end of the array nums.
  // Add multipliers[i] * x to your score.
  // Remove x from the array nums.
// Return the maximum score after performing m operations.


// Solution: DP - Recursion w/ Memoization

// Memoize each dp(left, right), where
  // left = the left pointer in nums
  // right = the right pointers in nums

// For each dp(left, right), take the maximum out of two choices:
  // 1. Take the start of the array (dp(left + 1, right) + leftScore)
  // 2. Take the end of the array (dp(left, right - 1) + rightScore)

// Since we can take maximum m elements, both left and right are limited to m possibilities.
// We use a map instead of a 2D array because the value of right will be in the range (0, ..., n - 1), whereas we know that right will always be in the range (n - m, ..., n - 1).

// Time Complexity: O(m^2) 4443ms
// Space Complexity: O(m^2) 102.4MB
var maximumScore = function(nums, multipliers) {
  let n = nums.length, m = multipliers.length;
  let memo = new Map();
  return dp(0, n - 1);
  
  function dp(left, right) {
    let index = left + n - right - 1;
    if (index === m) return 0;
    let key = `${left},${right}`;
    if (memo.has(key)) return memo.get(key);
    
    let leftScore = nums[left] * multipliers[index];
    let rightScore = nums[right] * multipliers[index];
    let ans = Math.max(dp(left + 1, right) + leftScore, dp(left, right - 1) + rightScore);
    memo.set(key, ans);
    return ans;
  }
};

// Two test cases
console.log(maximumScore([1,2,3], [3,2,1])) // 14
console.log(maximumScore([-5,-3,-3,-2,7,1], [-10,-5,3,4,6])) // 102