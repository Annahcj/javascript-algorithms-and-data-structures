// 1392. Longest Happy Prefix
// A string is called a happy prefix if is a non-empty prefix which is also a suffix (excluding itself).
// Given a string s, return the longest happy prefix of s. Return an empty string "" if no such prefix exists.


// Solution 1: LPS table from KMP Algorithm

// Use the lps table from the kmp algorithm.
// e.g: "ababab"
// lps = [0,0,1,2,3,4]
// lps[lps.length - 1] indicates the length of the longest prefix which is a suffix.

// Time Complexity: O(n) 117ms
// Space Complexity: O(n) 50.1MB
var longestPrefix = function(s) {
  let n = s.length, lps = getLPS(s);
  let lastIdx = lps[lps.length - 1];
  return s.slice(0, lastIdx);
  
  function getLPS(str) {
    let lps = Array(n).fill(0);
    let i = 0;
    for (let j = 1; j < n; j++) {
      while (i > 0 && str[i] !== str[j]) i = lps[i - 1]; // rollback
      if (str[i] === str[j]) {
        i++;
        lps[j] = i;
      }
    }
    return lps;
  }
};


// Solution 2: Rolling Hash

// Note: This solution does not handle collisions. Comparing the matching strings resulted in TLE.

// Create rolling hashes for the prefix and suffix.
// When the hashes match, record the largest index.

// Time Complexity: O(n) 126ms
// Space Complexity: O(1) 45.8MB
var longestPrefix = function(s) {
  let n = s.length, mod = 10 ** 9 + 7, base = 128, p = 1;
  let pre = 0, suf = 0, res = 0;
  for (let i = 0; i < n - 1; i++) {
    let preCharCode = s.charCodeAt(i) - 97, sufCharCode = s.charCodeAt(n - i - 1) - 97;
    pre = (pre * base + preCharCode) % mod;
    suf = (suf + p * sufCharCode) % mod;
    if (pre === suf) res = i + 1;
    p = (p * base) % mod;
  }
  return s.slice(0, res);
};

// Two test cases to run function on
console.log(longestPrefix("level")) // "l"
console.log(longestPrefix("ababab")) // "abab"