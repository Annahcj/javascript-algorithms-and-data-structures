// 1458. Max Dot Product of Two Subsequences
// Given two arrays nums1 and nums2.
// Return the maximum dot product between non-empty subsequences of nums1 and nums2 with the same length.
// A subsequence of a array is a new array which is formed from the original array by deleting some (can be none) of the characters without disturbing the relative positions of the remaining characters. (ie, [2,3,5] is a subsequence of [1,2,3,4,5] while [1,5,3] is not).


// Solution 1: DP - Recursion w/ Memoization

// Memoize each dp(i, j), where 
  // i = index in nums1
  // j = index in nums2

// For each dp(i, j), we have four choices:
  // 1. Take nums1[i] * nums2[j] and move both i and j forward
  // 2. Just move both i and j forward
  // 3. Move i forward only
  // 4. Move j forward only

// To deal with the case where the final answer will be negative, we take nums1[i] * nums2[j] if there are no better scores.
  // If moving i or j forward results in 0, we don't take that path.
  // You may think: What happens if the result is 0 but the subsequences are not empty? In that case, we would have at least one pair with a positive product, in which case taking only the positive products will result in a non-negative/non-zero score.

// n = length of nums1, m = length of nums2
// Time Complexity: O(nm) 103ms
// Space Complexity: O(nm) 48.2MB
var maxDotProduct = function(nums1, nums2) {
  let n = nums1.length, m = nums2.length;
  let memo = Array(n).fill(0).map(() => Array(m).fill(-1));
  return dp(0, 0);
  
  function dp(i, j) {
    if (i === n || j === m) return 0;
    if (memo[i][j] !== -1) return memo[i][j];
    
    let ans = nums1[i] * nums2[j] + Math.max(0, dp(i + 1, j + 1));
    let moveI = dp(i + 1, j), moveJ = dp(i, j + 1);
    if (moveI !== 0) ans = Math.max(ans, moveI);
    if (moveJ !== 0) ans = Math.max(ans, moveJ);
    return memo[i][j] = ans;
  } 
};


// Solution 2: Bottom Up DP

// dp[i][j] = the maximum dot product where i = index in nums1 and j = index in nums2.
// For each dp[i][j], we have four choices:
  // 1. Take nums1[i] * nums2[j] and move both i and j forward
  // 2. Just move both i and j forward
  // 3. Move i forward only
  // 4. Move j forward only

// n = length of nums1, m = length of nums2
// Time Complexity: O(nm) 105ms
// Space Complexity: O(nm) 49.4MB
var maxDotProduct = function(nums1, nums2) {
  let n = nums1.length, m = nums2.length;
  let dp = Array(n).fill(0).map(() => Array(m).fill(0));
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < m; j++) {
      let moveBoth = i === 0 || j === 0 ? 0 : dp[i - 1][j - 1];
      dp[i][j] = nums1[i] * nums2[j] + Math.max(0, moveBoth);
      if (i > 0) dp[i][j] = Math.max(dp[i][j], dp[i - 1][j]);
      if (j > 0) dp[i][j] = Math.max(dp[i][j], dp[i][j - 1]);
    }
  }
  return dp[n - 1][m - 1];
};

// Three test cases
console.log(maxDotProduct([2,1,-2,5], [3,0,-6])) // 18
console.log(maxDotProduct([3,-2], [2,-6,7])) // 21
console.log(maxDotProduct([-1,-1], [1,1])) // -1