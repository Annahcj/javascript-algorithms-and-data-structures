// 3409. Longest Subsequence With Decreasing Adjacent Difference
// You are given an array of integers nums.
// Your task is to find the length of the longest subsequence seq of nums, such that the absolute differences between consecutive elements form a non-increasing sequence of integers. In other words, for a subsequence seq0, seq1, seq2, ..., seqm of nums, |seq1 - seq0| >= |seq2 - seq1| >= ... >= |seqm - seqm - 1|.
// Return the length of such a subsequence.

 
// Solution: DP

// dp[i][j] = maximum subsequence length ending at value i, with last absolute difference j
// For every nums[i],
  // Go through every possible previous value (1 to 300), and get the maximum dp[prev value][j] where j >= abs(nums[i] - prev value).
  // Precompute every dp[nums[i]][diff] = Math.max(dp[nums[i]][diff], dp[nums[i]][diff + 1]) for upcoming numbers.

// n = length of nums, m = max(nums[i])
// Time Complexity: O(nm) 669ms
// Space Complexity: O(m^2) 58.64MB
function longestSubsequence(nums) {
  const max = Math.max(...nums);
  const dp = Array(max + 1).fill(0).map(() => Array(max).fill(0));
  let maxLen = 0;
  for (let num of nums) {
    for (let prev = 1; prev <= max; prev++) {
      const diff = Math.abs(num - prev);
      dp[num][diff] = Math.max(dp[num][diff], dp[prev][diff] + 1);
      maxLen = Math.max(maxLen, dp[num][diff]);
    }
    for (let diff = max - 2; diff >= 0; diff--) {
      dp[num][diff] = Math.max(dp[num][diff], dp[num][diff + 1]);
    }
  }
  return maxLen;
};

// Three test cases
console.log(longestSubsequence([16,6,3])) // 3
console.log(longestSubsequence([6,5,3,4,2,1])) // 4
console.log(longestSubsequence([10,20,10,19,10,20])) // 5