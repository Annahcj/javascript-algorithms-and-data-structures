// 1035. Uncrossed Lines
// You are given two integer arrays nums1 and nums2. We write the integers of nums1 and nums2 (in the order they are given) on two separate horizontal lines.
// We may draw connecting lines: a straight line connecting two numbers nums1[i] and nums2[j] such that:
// nums1[i] == nums2[j], and
// the line we draw does not intersect any other connecting (non-horizontal) line.
// Note that a connecting line cannot intersect even at the endpoints (i.e., each number can only belong to one connecting line).
// Return the maximum number of connecting lines we can draw in this way.


// Solution: LCS

// Find the longest common subsequence in nums1 and nums2.
// Two situations: 
  // 1. nums1[i] matches nums2[j] -> take dp[i - 1][j - 1] + 1
  // 2. doesn't match -> take best (max) of dp[i - 1][j], dp[i][j - 1].

// Time Complexity: O(nm) 80ms
// Space Complexity: O(nm) 42.9MB
var maxUncrossedLines = function(nums1, nums2) {
  let n = nums1.length, m = nums2.length;
  let dp = Array(n);
  for (var i = 0; i < n; i++) dp[i] = Array(m);
  for (i = 0; i < n; i++) {
    for (var j = 0; j < m; j++) {
      let prev = i > 0 && j > 0 ? dp[i - 1][j - 1] : 0;
      let up = i > 0 ? dp[i - 1][j] : 0;
      let left = j > 0 ? dp[i][j - 1] : 0;
      if (nums1[i] === nums2[j]) dp[i][j] = prev + 1;
      else dp[i][j] = Math.max(up, left);
    }
  }  
  return dp[n - 1][m - 1];
};

// Three test cases to run function on
console.log(maxUncrossedLines([1,4,2], [1,2,4])) // 2
console.log(maxUncrossedLines([2,5,1,2,5], [10,5,2,1,5,2])) // 3
console.log(maxUncrossedLines([1,3,7,1,7,5], [1,9,2,5,1])) // 2