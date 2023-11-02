// 44. Wildcard Matching
// Given an input string (s) and a pattern (p), implement wildcard pattern matching with support for '?' and '*' where:
// '?' Matches any single character.
// '*' Matches any sequence of characters (including the empty sequence).
// The matching should cover the entire input string (not partial).


// Solution 1: Recursion w/ Memoization

// recurse: (index in string, index in pattern)
    // base case: if pattern is fully matched, return true if string is also fully matched, otherwise return false.
    // base case: if memo already contains [sIdx][pIdx], return memo[sIdx][pIdx]
    // if pattern is ?
      // if sIdx is less than s.length, set memo and return recurse(sIdx + 1, pIdx + 1) (move both pointers forward)
    // if pattern is *
      // (try both possibilities -> 1. match empty string, 2. match one character)
      // if any of the two situations return true, return true.
    // if pattern is a normal character,
      // if string character matches pattern character, set memo to true and return recurse(sIdx + 1, pIdx + 1) (move both pointers forward)
    // return memo[sIdx][pIdx] (for earlier calls)

// Time Complexity: O(nm) 168ms
// Space Complexity: O(nm) 54.2MB
var isMatch = function(s, p) {
  // set length to be s.length + 1 to avoid errors
  let memo = Array(s.length + 1);
  for (var i = 0; i <= s.length; i++) memo[i] = Array(p.length);
  return recurse(0, 0);

  function recurse(sIdx, pIdx) {
    if (pIdx === p.length) return sIdx === s.length;
    if (memo[sIdx][pIdx] !== undefined) return memo[sIdx][pIdx];
    memo[sIdx][pIdx] = false;
    if (p[pIdx] === '?') {
      if (sIdx < s.length) return memo[sIdx][pIdx] = recurse(sIdx + 1, pIdx + 1);
    } else if (p[pIdx] === '*') {
      if (recurse(sIdx, pIdx + 1)) return memo[sIdx][pIdx] = true;
      if (sIdx < s.length) return memo[sIdx][pIdx] = recurse(sIdx + 1, pIdx);
    } else {
      if (s[sIdx] === p[pIdx]) return memo[sIdx][pIdx] = recurse(sIdx + 1, pIdx + 1);
    }
    return memo[sIdx][pIdx];
  } 
};

// Five test cases to run function on
console.log(isMatch("aa", "a")) // false
console.log(isMatch("aa", "*")) // true
console.log(isMatch("cb", "?a")) // false
console.log(isMatch("adceb", "*a*b")) // true
console.log(isMatch("acdcb", "a*c?b")) // false