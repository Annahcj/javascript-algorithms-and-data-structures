// 3177. Find the Maximum Length of a Good Subsequence II
// You are given an integer array nums and a non-negative integer k. A sequence of integers seq is called good if there are at most k indices i in the range [0, seq.length - 2] such that seq[i] != seq[i + 1].
// Return the maximum possible length of a good subsequence of nums.


// Solution: DP

// Populate a 2D array dp, where dp[k][val] = longest subsequence length with k of (seq[i] != seq[i + 1]), where the subsequence ends with val.
// Go through nums from left to right, and go through each k.
// Keep track of the maximum subsequence length for each amount of different values, and for each state we either:
  // 1. Extend the subsequence with a matching value, or 
  // 2. Take a different value (seq[i] != seq[i + 1]) using the maximum subsequence length from k - 1

// n = length of nums
// Time Complexity: O(nk) 302ms
// Space Complexity: O(nk) 75.2MB
function maximumLength(nums, k) {
  let dp = Array(k + 1).fill(0).map(() => ({})), n = nums.length;
  let maxLen = Array(k + 1).fill(0), ans = 0;
  for (let i = 0; i < n; i++) {
    for (let j = k; j >= 0; j--) { // need to go backwards to avoid using values from same round
      let sameVal = dp[j][nums[i]] ?? 0;
      let diffVal = j > 0 ? maxLen[j - 1] : 0;
      dp[j][nums[i]] = Math.max(sameVal, diffVal) + 1;
      maxLen[j] = Math.max(maxLen[j], dp[j][nums[i]]);
      ans = Math.max(ans, maxLen[j]);
    }
  }
  return ans;
};

// Two test cases
console.log(maximumLength([1,2,1,1,3], 2)) // 4
console.log(maximumLength([1,2,3,4,5,1], 0)) // 2