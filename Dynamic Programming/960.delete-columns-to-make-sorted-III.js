// 960. Delete Columns to Make Sorted III
// You are given an array of n strings strs, all of the same length.
// We may choose any deletion indices, and we delete all the characters in those indices for each string.
// For example, if we have strs = ["abcdef","uvwxyz"] and deletion indices {0, 2, 3}, then the final array after deletions is ["bef", "vyz"].
// Suppose we chose a set of deletion indices answer such that after deletions, the final array has every string (row) in lexicographic order. (i.e., (strs[0][0] <= strs[0][1] <= ... <= strs[0][strs[0].length - 1]), and (strs[1][0] <= strs[1][1] <= ... <= strs[1][strs[1].length - 1]), and so on). Return the minimum possible value of answer.length.


// Solution: DP - Longest Increasing Subsequence

// The problem boils down to finding the longest increasing subsequence in each strs[i].
// The minimum columns to remove will be strs[i].length - length of longest increasing subsequence 

// Populate dp, where dp[j] = the longest increasing subsequence that ends at index j, for each strs[i].
// For each strs[i][j], populate dp[j] by getting the maximum of dp[k] + 1, where:
  // k < j
  // every strs[i][j] < strs[i][k] 

// n = strs.length, m = strs[i].length
// Time Complexity: O(nm^2) 73ms
// Space Complexity: O(m) 43.2MB
var minDeletionSize = function(strs) {
  let n = strs.length, m = strs[0].length;
  let dp = Array(m).fill(1), maxLen = 1;
  
  for (let j = 1; j < m; j++) { // index j in strs[i]
    for (let k = 0; k < j; k++) {
      let allStrsSmaller = true;
      for (let i = 0; i < n; i++) { // for each strs[i]
        if (strs[i][k] > strs[i][j]) {
          allStrsSmaller = false;
          break;
        }
      } 
      if (allStrsSmaller) {
        dp[j] = Math.max(dp[j], dp[k] + 1);
      }
    }
    maxLen = Math.max(maxLen, dp[j]);
  }
  return m - maxLen;
};

// Three test cases to run function on
console.log(minDeletionSize(["babca","bbazb"])) // 3
console.log(minDeletionSize(["edcba"])) // 4
console.log(minDeletionSize(["ghi","def","abc"])) // 0