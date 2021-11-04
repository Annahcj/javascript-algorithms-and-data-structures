// 673. Number of Longest Increasing Subsequence
// Given an integer array nums, return the number of longest increasing subsequences.
// Notice that the sequence has to be strictly increasing.


// Solution: Dynamic Programming

// Keep track of two arrays -> 
  // dp (dp[i] denotes the longest increasing subsequence ending at i)
  // freq (freq[i] denotes the number of longest increasing subsequences (at that point) ending at i)
// Fill dp with 1's initially, in case of numbers being equal.
// Fill freq with 0's.

// Loop through nums from 0 to n (pointer = i)
  // loop backwards from i - 1 to 0 (pointer = j)
    // find the longest subsequence ending at a number bigger than nums[i].
  // now that we know the longest subsequence ending at i, 
  // loop backwards again from i - 1 to 0, (pointer = i)
    // find the number of subsequences with a longest subsequence of dp[i] - 1.
    // add the frequency of all these subsequences to freq[i].
// Get the maximum length in dp.
// Loop through dp (pointer = i)
  // if dp[i] is equal to max length, add freq[i] to the answer.
// Return answer.

// Time Complexity: O(n^2) 120ms
// Space Complexity: O(n) 41.2MB
var findNumberOfLIS = function(nums) {
  let n = nums.length;
  let dp = Array(n).fill(1);
  let freq = Array(n).fill(0);
  for (var i = 0; i < n; i++) {
    for (var j = i - 1; j >= 0; j--) {
      if (nums[j] < nums[i]) {
        dp[i] = Math.max(dp[i], dp[j] + 1);
      } 
    }
    for (j = i - 1; j >= 0; j--) {
      if (nums[j] < nums[i] && dp[j] + 1 === dp[i]) freq[i] += freq[j];
    }
    if (!freq[i]) freq[i] = 1;
  }
  let maxLen = Math.max(...dp), ans = 0;
  for (i = 0; i < n; i++) {
    if (dp[i] === maxLen) ans += freq[i];
  }
  return ans;
};

// Four test cases to run function on
console.log(findNumberOfLIS([1,3,5,4,7])) // 2
console.log(findNumberOfLIS([2,2,2,2,2])) // 5