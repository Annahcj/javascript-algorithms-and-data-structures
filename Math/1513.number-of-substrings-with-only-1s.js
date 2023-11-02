// 1513. Number of Substrings With Only 1s
// Given a binary string s, return the number of substrings with all characters 1's. Since the answer may be too large, return it modulo 109 + 7.


// Solution: Counting & Math

// Keep track of the length of the current substring of '1's.
// Count how many substrings end at each index i.

// e.g: "111"
// i = 0: "1" (1 substring ending at index 0)
// i = 1: "1", "11" (2 substrings ending at index 1)
// i = 2: "1", "11", "111" (3 substrings ending at index 2)
// In total, 1 + 2 + 3 = 6 substrings with only 1s

// Time Complexity: O(n) 91ms
// Space Complexity: O(1) 43.3MB
var numSub = function(s) {
  let n = s.length, count = 0;
  let ans = 0, MOD = 10 ** 9 + 7;
  for (let i = 0; i < n; i++) {
    if (s[i] === '1') count++;
    else count = 0;
    ans = (ans + count) % MOD;
  }
  return ans;
};

// Three test cases
console.log(numSub("0110111")) // 9
console.log(numSub("101")) // 2
console.log(numSub("111111")) // 21