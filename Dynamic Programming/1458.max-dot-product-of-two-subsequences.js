// 1458. Max Dot Product of Two Subsequences
// Given two arrays nums1 and nums2.
// Return the maximum dot product between non-empty subsequences of nums1 and nums2 with the same length.
// A subsequence of a array is a new array which is formed from the original array by deleting some (can be none) of the characters without disturbing the relative positions of the remaining characters. (ie, [2,3,5] is a subsequence of [1,2,3,4,5] while [1,5,3] is not).


// Solution 1: DP - Recursion w/ Memoization 

// Two edge cases:
  // 1. nums1 has only negative numbers and nums2 has only positive numbers: return the smallest negative pair product.
  // 2. nums1 has only positive numbers and nums2 has only negative numbers: return the smallest negative pair product.

// Memoize each dp(i, j), where 
  // i = index in nums1
  // j = index in nums2

// For each dp(i, j), we have four choices:
  // 1. Take nums1[i] * nums2[j] and move both i and j forward
  // 2. Just move both i and j forward
  // 3. Move i forward only
  // 4. Move j forward only

// n = length of nums1, m = length of nums2
// Time Complexity: O(nm) 96ms
// Space Complexity: O(nm) 46MB
var maxDotProduct = function(nums1, nums2) {
  let n = nums1.length, m = nums2.length;
  let maxNums1 = -Infinity, minNums1 = Infinity;
  let maxNums2 = -Infinity, minNums2 = Infinity;
  for (let i = 0; i < n; i++) {
    maxNums1 = Math.max(maxNums1, nums1[i]);
    minNums1 = Math.min(minNums1, nums1[i]);
  }
  for (let i = 0; i < m; i++) {
    maxNums2 = Math.max(maxNums2, nums2[i]);
    minNums2 = Math.min(minNums2, nums2[i]);
  }
  if (maxNums1 < 0 && minNums2 > 0) {
    return maxNums1 * minNums2;
  }
  if (minNums1 > 0 && maxNums2 < 0) {
    return minNums1 * maxNums2;
  }
  let memo = Array(n).fill(0).map(() => Array(m).fill(null));
  return dp(0, 0);
  
  function dp(i, j) {
    if (i === n || j === m) return 0;
    if (memo[i][j] !== null) return memo[i][j];
    
    let takeBoth = nums1[i] * nums2[j] + dp(i + 1, j + 1);
    let skipI = dp(i + 1, j);
    let skipJ = dp(i, j + 1);
    return memo[i][j] = Math.max(takeBoth, skipI, skipJ);
  }
};


// Solution 2: Bottom Up DP

// Two edge cases:
  // 1. nums1 has only negative numbers and nums2 has only positive numbers: return the smallest negative pair product.
  // 2. nums1 has only positive numbers and nums2 has only negative numbers: return the smallest negative pair product.

// dp[i][j] = the maximum dot product where i = index in nums1 and j = index in nums2.
// For each dp[i][j], we have four choices:
  // 1. Take nums1[i] * nums2[j] and move both i and j forward
  // 2. Just move both i and j forward
  // 3. Move i forward only
  // 4. Move j forward only

// n = length of nums1, m = length of nums2
// Time Complexity: O(nm) 86ms
// Space Complexity: O(nm) 49.3MB
var maxDotProduct = function(nums1, nums2) {
  let n = nums1.length, m = nums2.length;
  let maxNums1 = -Infinity, minNums1 = Infinity;
  let maxNums2 = -Infinity, minNums2 = Infinity;
  for (let i = 0; i < n; i++) {
    maxNums1 = Math.max(maxNums1, nums1[i]);
    minNums1 = Math.min(minNums1, nums1[i]);
  }
  for (let i = 0; i < m; i++) {
    maxNums2 = Math.max(maxNums2, nums2[i]);
    minNums2 = Math.min(minNums2, nums2[i]);
  }
  if (maxNums1 < 0 && minNums2 > 0) {
    return maxNums1 * minNums2;
  }
  if (minNums1 > 0 && maxNums2 < 0) {
    return minNums1 * maxNums2;
  }
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