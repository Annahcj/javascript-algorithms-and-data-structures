// 1027. Longest Arithmetic Subsequence
// Given an array nums of integers, return the length of the longest arithmetic subsequence in nums.
// Recall that a subsequence of an array nums is a list nums[i1], nums[i2], ..., nums[ik] with 0 <= i1 < i2 < ... < ik <= nums.length - 1, and that a sequence seq is arithmetic if seq[i+1] - seq[i] are all the same value (for 0 <= i < seq.length - 1).


// Solution: Dynamic Programming w/ Hashmap

// Use a hashmap to record the length of the sequence for each diff ending at each index.
// dp[i][diff] = Length of subsequence with the difference of diff ending at index i.

// Time Complexity: O(n^2) 836ms
// Space Complexity: O(n^2) 78.3MB
var longestArithSeqLength = function(nums) {
  let n = nums.length, dp = Array(n).fill(0).map(() => new Map());
  let res = 0;
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < i; j++) {
      let diff = nums[i] - nums[j];
      dp[i].set(diff, (dp[j].get(diff) || 1) + 1); // start a new sequence or add onto an ongoing one
      res = Math.max(res, dp[i].get(diff));
    }
  }
  return res;
};

// Three test cases to run function on
console.log(longestArithSeqLength([3,6,9,12])) // 4
console.log(longestArithSeqLength([9,4,7,2,10])) // 3
console.log(longestArithSeqLength([20,1,15,3,10,5,8])) // 4