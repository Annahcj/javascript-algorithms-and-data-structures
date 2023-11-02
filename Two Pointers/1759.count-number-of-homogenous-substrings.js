// 1759. Count Number of Homogenous Substrings
// Given a string s, return the number of homogenous substrings of s. Since the answer may be too large, return it modulo 109 + 7.
// A string is homogenous if all the characters of the string are the same.
// A substring is a contiguous sequence of characters within a string.


// Solution: Two Pointers

// Use two pointers to track consecutive characters.
// For each index, count the number of substrings ending at that index.

// e.g: "ccc"
  // "c": +1 substring ("c")
  // "cc": +2 substrings ("_c", "cc")
  // "ccc": +3 substrings ("__c", "_cc", "ccc")
// (The underscores indicate that the character isn't included in the substring)

// Time Complexity: O(n) 151ms
// Space Complexity: O(1) 45.9MB
var countHomogenous = function(s) {
  let i = 0, ans = 0, mod = 10 ** 9 + 7;
  while (i < s.length) {
    let char = s[i], start = i;
    while (s[i] === char) {
      ans = (ans + i - start + 1) % mod;
      i++;
    }
  }
  return ans;
};

// Three test cases
console.log(countHomogenous("abbcccaa")) // 13
console.log(countHomogenous("xy")) // 2
console.log(countHomogenous("zzzzz")) // 15