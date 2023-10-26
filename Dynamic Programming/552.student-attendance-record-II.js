// 552. Student Attendance Record II
// An attendance record for a student can be represented as a string where each character signifies whether the student was absent, late, or present on that day. The record only contains the following three characters:
  // 'A': Absent.
  // 'L': Late.
  // 'P': Present.
// Any student is eligible for an attendance award if they meet both of the following criteria:
  // The student was absent ('A') for strictly fewer than 2 days total.
  // The student was never late ('L') for 3 or more consecutive days.
// Given an integer n, return the number of possible attendance records of length n that make a student eligible for an attendance award. The answer may be very large, so return it modulo 10^9 + 7.


// Solution 1: DP - Recursion w/ Memoization

// Only passed 52/59 test cases (too much memory).

// Memoize each dp(i, absentUsed, l)
  // i = number of days
  // absentUsed = boolean value of whether 'A' has been used (we can only use it at most 1 time)
  // l = number of consecutive 'L's we currently have, to make sure we don't use 'L' more than two times in a row.
  
// Time Complexity: O(n * 2 * 3) = O(n)
// Space Complexity: O(n * 2 * 3) = O(n)
var checkRecord = function(n) {
  let memo = Array(n).fill(0).map(() => Array(2).fill(0).map(() => Array(3).fill(-1))), mod = 10 ** 9 + 7;
  return dp(0, 0, 0);
  
  function dp(i, absentUsed, l) {
    if (i === n) return 1;
    if (memo[i][absentUsed][l] !== -1) return memo[i][absentUsed][l];
    
    let ans = dp(i + 1, absentUsed, 0); // Present
    if (!absentUsed) ans = (ans + dp(i + 1, 1, 0)) % mod; // Absent
    if (l < 2) ans = (ans + dp(i + 1, absentUsed, l + 1)) % mod; // Late
  
    return memo[i][absentUsed][l] = ans;
  }
};

// Solution 2: [Accepted] DP - Tabulation

// Populate each dp[i][j][k], where
  // i = the ith record
  // j = 0 ('A' has not been used) or 1 ('A' has been used)
  // k = the number of consecutive 'L's we currently have

// For each record i, there can be 3 situations:
  // 1. 'P' -> dp2[j][0] += dp[j][k]
    // 'P' can come after 0, 1, or 2 'L's.

  // 2. 'A' -> dp2[1][0] += dp[0][k]
    // 'A' can come after 0, 1, or 2 'L's.
    // 'A' can only appear once.

  // 3. 'L' -> dp2[j][k] += dp[j][k - 1]
    // 'L' can come after 0 or 1 'L's.

// Time Complexity: O(n * 2 * 3) = O(n) 622ms
// Space Complexity: O(1) 49.7MB
var checkRecord = function(n) {
  let dp = Array(2).fill(0).map(() => Array(3).fill(0)), mod = 10 ** 9 + 7;
  dp[1][0] = 1, dp[0][0] = 1, dp[0][1] = 1; // 'A', 'P', 'L'

  for (let i = 1; i < n; i++) {
    let dp2 = Array(2).fill(0).map(() => Array(3).fill(0));
    for (let j = 0; j < 2; j++) { // 0 = 'A' not used, 1 = 'A' used
      for (let k = 0; k < 3; k++) { // number of consecutive 'L's
        dp2[j][0] = (dp2[j][0] + dp[j][k]) % mod; // 'P'
        if (j === 1) dp2[j][0] = (dp2[j][0] + dp[0][k]) % mod; // 'A'
        if (k > 0) dp2[j][k] = (dp2[j][k] + dp[j][k - 1]) % mod; // 'L'
      }
    }
    dp = dp2;
  }
  
  let ways = 0;
  for (let j = 0; j < 2; j++) {
    for (let k = 0; k < 3; k++) {
      ways = (ways + dp[j][k]) % mod;
    }
  }
  return ways;
};

// Three test cases to run function on
console.log(checkRecord(2)) // 8
console.log(checkRecord(1)) // 3
console.log(checkRecord(10101)) // 183236316