// 1759. Count Number of Homogenous Substrings
// Given a string s, return the number of homogenous substrings of s. Since the answer may be too large, return it modulo 109 + 7.
// A string is homogenous if all the characters of the string are the same.
// A substring is a contiguous sequence of characters within a string.


// Solution: Counting

// For each s[i], the number of homogenous substrings ending at s[i] is equal to the count of consecutively same characters up to s[i].

// Time Complexity: O(n) 65ms
// Space Complexity: O(1) 45.3MB
var countHomogenous = function(s) {
  let n = s.length, count = 0;
  let homogenous = 0, MOD = 10 ** 9 + 7;
  for (let i = 0; i < n; i++) {
    if (i === 0 || s[i] !== s[i - 1]) count = 1;
    else count++;
    homogenous = (homogenous + count) % MOD;
  }
  return homogenous;
};

// Three test cases
console.log(countHomogenous("abbcccaa")) // 13
console.log(countHomogenous("xy")) // 2
console.log(countHomogenous("zzzzz")) // 15