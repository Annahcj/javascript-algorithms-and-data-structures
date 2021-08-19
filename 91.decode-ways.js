// 91. Decode Ways
// Given a string s containing only digits, return the number of ways to decode it.


// Solution 1: Recursive w/ DP

// Logic:
// At any point in s, check whether we can use the first digit, and the first and second digit combined. 
// If we can, recursively call backtrack for the next indexes.
// Since we will end up at the same positions more than once, save the number of ways in an array 'dp', so that we can re-use the values.

// Create a dp array the size of s.length, fill it with 0's.
// return backtrack(0)
// backtrack: (takes in an index (index in s))
  // Base case: If i is equal to length (we have reached the end of s), return 1 
  // Base case: If we have already been to index i before, return dp[i]
  // If s[i] is '0' (invalid), return 0
  // Let ways = 0 (number of ways)
  // call backtrack(i + 1) and add it to ways (if it's not 0, it will always be valid)
  // Grab s[i] and s[i + 1], turn them into a number, save it in a variable twoDigit.
  // If twoDigit < 27
    // call backtrack(i + 2), add it to ways.
  // Save ways in dp[i] (so that we don't keep doing the same index)
  // Return ways

// Time Complexity: O(n) 112ms
// Space Complexity: O(n) 40.7MB
  var numDecodings = function(s) {
    let length = s.length;
    let dp = new Array(length).fill(0);
    return backtrack(0);
    function backtrack(i) {
      if (i === length) {
        return 1;
      }
      if (dp[i]) return dp[i];
      if (s[i] === '0') return 0;
      let ways = 0;
      ways += backtrack(i + 1);
      let twoDigit = +s[i] * 10 + +s[i + 1];
      if (twoDigit < 27) {
        ways += backtrack(i + 2);
      }
      dp[i] = ways;
      return ways;
    }  
  };
  
  // Solution 2: Iterative w/ DP
  
  // Bottom-up dp
  
  // Algorithm:
  // Create an array 'dp' the length of s.length + 1, fill it with 0's.
  // Set dp[0] to 1, dp[1] to 1 (first num of s will always be valid as long as it's not 0)
  // Edge case: If s[0] is '0', return 0 (invalid)
  // Loop through s from 2 to s.length (pointer = i) *
    // (we will always be working on the previous number (i - 1), which is why we loop to s.length)
    // if s[i - 1] is not '0'
      // set dp[i] to dp[i - 1]
    // Grab s[i] and s[i + 1], turn them into a number, save it in a variable twoDigit.
    // If twoDigit is between 10-26, 
      // Increment dp[i] by dp[i - 2]
  // *
  // Return dp[s.length]
  
  // Time Complexity: O(n) 76ms
  // Space Complexity: O(n) 40.3MB
  var numDecodings = function(s) {
    let length = s.length;
    let dp = new Array(length + 1).fill(0);
    dp[0] = 1, dp[1] = 1;
    if (s[0] === '0') return 0;
    for (var i = 2; i <= length; i++) {
      if (s[i - 1] !== '0') {
        dp[i] = dp[i - 1];
      } 
      let twoDigit = +s[i - 2] * 10 + +s[i - 1];
      if (twoDigit > 9 && twoDigit < 27) {
        dp[i] += dp[i - 2];
      }
    }
    return dp[length];
  };
  
  // Four test cases to run function on
  console.log(numDecodings("1233")) // 3
  console.log(numDecodings("226")) // 3
  console.log(numDecodings("0")) // 0
  console.log(numDecodings("06")) // 0