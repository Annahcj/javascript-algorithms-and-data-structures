// 2930. Number of Strings Which Can Be Rearranged to Contain Substring
// You are given an integer n.
// A string s is called good if it contains only lowercase English characters and it is possible to rearrange the characters of s such that the new string contains "leet" as a substring.
// For example:
  // The string "lteer" is good because we can rearrange it to form "leetr" .
  // "letl" is not good because we cannot rearrange it to contain "leet" as a substring.
// Return the total number of good strings of length n.
// Since the answer may be large, return it modulo 10^9 + 7.
// A substring is a contiguous sequence of characters within a string.

 
// Solution: DP w/ Bitmasks

// Memoize each dp(i, mask), where 
  // i = length of the string so far
  // mask = bitmask of characters we have taken in "leet"

// For each dp(i, mask), we have 26 characters that can be used in this position.
  // Excluding "l", "e", "t": 23 characters.
  // "l": 1 way
  // "t": 1 way
  // "ee": 1 way 
    // we need to ensure there is only 1 way for "ee", to avoid duplicates.
    // If the first "e" hasn't been taken yet, take the first "e".
    // If the first "e" has already been taken, take the second "e".

// Time Complexity: O(n * 2^4) 283ms
// Space Complexity: O(n * 2^4) 111.3MB
var stringCount = function(n) {
  if (n < 4) return 0;
  const memo = Array(n).fill(0).map(() => Array(1 << 4).fill(-1)), MOD = 10 ** 9 + 7;
  const STATE = {
    full: 15, // full mask: 1111
    l: 8, // 1000
    firstE: 4, // 100
    secondE: 2, // 10
    t: 1
  };
  return dp(0, 0);
  
  function dp(i, mask) {
    if (i === n) return mask === STATE.full ? 1 : 0;
    if (memo[i][mask] !== -1) return memo[i][mask];
    
    let ways = (23 * dp(i + 1, mask)) % MOD; // all characters excluding "l", "e", and "t".
    ways = (ways + dp(i + 1, mask | STATE.l)) % MOD;
    ways = (ways + dp(i + 1, mask | STATE.t)) % MOD;
    if (!(mask & STATE.firstE)) { 
      // no "e" in the string yet
      ways = (ways + dp(i + 1, mask | STATE.firstE)) % MOD;
    } else {
      // at least one "e" in the string already
      ways = (ways + dp(i + 1, mask | STATE.secondE)) % MOD;
    }
    return memo[i][mask] = ways;
  }
};

// Two test cases
console.log(stringCount(4)) // 12
console.log(stringCount(10)) // 83943898