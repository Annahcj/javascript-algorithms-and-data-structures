// 3202. Find the Maximum Length of Valid Subsequence II
// You are given an integer array nums and a positive integer k.
// A subsequence sub of nums with length x is called valid if it satisfies:
  // (sub[0] + sub[1]) % k == (sub[1] + sub[2]) % k == ... == (sub[x - 2] + sub[x - 1]) % k.
// Return the length of the longest valid subsequence of nums.


// Solution: DP

// For every value i from 0 to k - 1, use DP to count the longest subsequence where each adjacent pair (sub[i] + sub[i + 1]) % k === i.
// Each dp[mod] = the longest subsequence length ending with each mod value `mod`.

// Time Complexity: O(nk) 273ms
// Space Complexity: O(k) 57MB
function maximumLength(nums, k) {
  let maxLen = 0;
  for (let i = 0; i < k; i++) {
    let dp = Array(k).fill(0);
    for (let num of nums) {
      let mod = num % k;
      dp[mod] = Math.max(dp[mod], 1 + dp[(i - mod + k) % k]);
    }
    maxLen = Math.max(maxLen, Math.max(...dp));
  }
  return maxLen;
};

// Two test cases
console.log(maximumLength([1,2,3,4,5], 2)) // 5
console.log(maximumLength([1,4,2,3,1,4], 3)) // 4