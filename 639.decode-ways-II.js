// 639.decode-ways-II.js
// 639. Decode Ways II
// A message containing letters from A-Z can be encoded into numbers using the following mapping:
  // 'A' -> "1"
  // 'B' -> "2"
  // ...
  // 'Z' -> "26"
// To decode an encoded message, all the digits must be grouped then mapped back into letters using the reverse of the mapping above (there may be multiple ways). For example, "11106" can be mapped into:
  // "AAJF" with the grouping (1 1 10 6)
  // "KJF" with the grouping (11 10 6)
// Note that the grouping (1 11 06) is invalid because "06" cannot be mapped into 'F' since "6" is different from "06".
// In addition to the mapping above, an encoded message may contain the '*' character, which can represent any digit from '1' to '9' ('0' is excluded). For example, the encoded message "1*" may represent any of the encoded messages "11", "12", "13", "14", "15", "16", "17", "18", or "19". Decoding "1*" is equivalent to decoding any of the encoded messages it can represent.
// Given a string s consisting of digits and '*' characters, return the number of ways to decode it.
// Since the answer may be very large, return it modulo 10^9 + 7.


// Solution 1: DP 

// Populate dp, where dp[i] = number of ways for string at index i to n - 1.
// For each index i, we can either take one digit or two digits.

// There are three cases for one character:
  // *: 9 ways (1-9).
  // 0: 0 ways
  // else: 1 way

// There are four cases for two characters:
  // *1 = char2 > 6 ? 1 : 2
    // We can do 11, 21 if char2 <= 6
    // Otherwise, if char2 > 6, we can only do 17 (27 exceeds 26)

  // 1* = char1 === 1 ? 9 : (char1 === 2 ? 6 : 0)
    // If char1 is 1, we can do 11,12,13,14,... up to 19.
    // If char1 is 2, we can only do 21,22,23,24,25,26
    // Otherwise if char1 is 0 or > 2, there are no possible numbers.

  // ** = 15 (11 to 19, then 21 to 26)

  // 11 = Check if >= 10 && <= 26 

// Time Complexity: O(n) 233ms
// Space Complexity: O(n) 56.6MB
var numDecodings = function(s) {
  let n = s.length, dp = Array(n + 1).fill(0), MOD = 10 ** 9 + 7;
  dp[n] = 1;
  for (let i = n - 1; i >= 0; i--) {
    dp[i] = dp[i + 1] * getWaysOneDigit(s[i]);
    if (i < n - 1) {
      let ways = dp[i + 2] * getWaysTwoDigits(s[i], s[i + 1]);
      dp[i] = (dp[i] + ways) % MOD;
    }
  }
  return dp[0];
  
  function getWaysOneDigit(char) {
    if (char === '0') return 0;
    return char === '*' ? 9 : 1;
  }
  
  function getWaysTwoDigits(char1, char2) {
    if (char1 === '*' && char2 === '*') return 15;
    if (char1 === '*') return Number(char2) > 6 ? 1 : 2;
    if (char2 === '*') return char1 === '1' ? 9 : (char1 === '2' ? 6 : 0);
    let num = Number(char1 + char2);
    return num >= 10 && num <= 26 ? 1 : 0; 
  }
};


// Solution 2: DP - Constant Space

// Since we only need to access the next two dp values, we can store them in two variables.

// Time Complexity: O(n) 218ms
// Space Complexity: O(1) 50.6MB
var numDecodings = function(s) {
  let n = s.length, MOD = 10 ** 9 + 7;
  let next = 1, nextNext = 0;
  for (let i = n - 1; i >= 0; i--) {
    let ways = next * getWaysOneDigit(s[i]);
    if (i < n - 1) {
      ways = (ways + nextNext * getWaysTwoDigits(s[i], s[i + 1])) % MOD;
    }
    nextNext = next;
    next = ways;
  }
  return next;
  
  function getWaysOneDigit(char) {
    if (char === '0') return 0;
    return char === '*' ? 9 : 1;
  }
  
  function getWaysTwoDigits(char1, char2) {
    if (char1 === '*' && char2 === '*') return 15;
    if (char1 === '*') return Number(char2) > 6 ? 1 : 2;
    if (char2 === '*') return char1 === '1' ? 9 : (char1 === '2' ? 6 : 0);
    let num = Number(char1 + char2);
    return num >= 10 && num <= 26 ? 1 : 0; 
  }
};

// Three test cases
console.log(numDecodings("*")) // 9
console.log(numDecodings("1*")) // 18
console.log(numDecodings("2*")) // 15