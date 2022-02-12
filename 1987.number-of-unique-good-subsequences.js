// 1987. Number of Unique Good Subsequences
// You are given a binary string binary. A subsequence of binary is considered good if it is not empty and has no leading zeros (with the exception of "0").
// Find the number of unique good subsequences of binary.
  // For example, if binary = "001", then all the good subsequences are ["0", "0", "1"], so the unique good subsequences are "0" and "1". Note that subsequences "00", "01", and "001" are not good because they have leading zeros.
// Return the number of unique good subsequences of binary. Since the answer may be very large, return it modulo 109 + 7.
// A subsequence is a sequence that can be derived from another sequence by deleting some or no elements without changing the order of the remaining elements.


// Solution: Dynamic Programming

// Count subsequences ending with 0 and 1. Build them up from left to right.
// Key: dp[0] = number of subsequences ending with zero, dp[1] = number of subsequences ending with 1

// Ending with 0: 0 can follow 1, but can't follow a 0 itself. 
  // So if dp[0] is 1, that means it's just '0', so we can't follow it with another 0.
  // If dp[0] is 0, we can create the subsequence '0'.
  // 0 can follow 1, so add dp[1] to dp[0]. 111 can become 10, 110, 1110. 
  // Conclusion: We add these values to dp[0], accumlating the subsequences.

// Ending with 1: 1 can follow 1, 1 can only follow 0 if 0 is not by itself.
  // If dp[0] is 0 or 1, meaning nothing or '0', we can't follow it with 1.
  // Otherwise, we can follow all ending with 0 except '0' itself. Like if dp[0] is 2, with '0', '10', we can do '101' but not '01'.
  // Add these values to dp[0], plus an extra 1 for the new subsequence ending with 1.

// Time Complexity: O(n) 120ms
// Space Complexity: O(1) 45.5MB
var numberOfUniqueGoodSubsequences = function(binary) {
  let dp = Array(2).fill(0), mod = 10 ** 9 + 7;
  for (let bit of binary) {
    if (bit === '0') {
      let zero = dp[0] === 0 ? 1 : 0; // if there are no 0's so far, 0 itself can be one subseq.
      dp[0] = (dp[0] + zero + dp[1]) % mod; 
    } else {
      let zeros = dp[0] <= 1 ? 0 : dp[0] - 1; // 1 can't follow a 0. It can follow any other sequences including 0.
      dp[1] = (dp[1] + 1 + zeros) % mod; // sequences ending with 1, an extra sequence, and sequences ending with 0.
    }
  }
  return (dp[0] + dp[1]) % mod;
};

// Four test cases to run function on
console.log(numberOfUniqueGoodSubsequences("001")) // 2
console.log(numberOfUniqueGoodSubsequences("11")) // 2
console.log(numberOfUniqueGoodSubsequences("101")) // 5
console.log(numberOfUniqueGoodSubsequences("1110001")) // 23