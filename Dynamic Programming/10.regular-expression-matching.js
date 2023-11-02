// 10. Regular Expression Matching
// Given an input string s and a pattern p, implement regular expression matching with support for '.' and '*' where:
  // '.' Matches any single character.​​​​
  // '*' Matches zero or more of the preceding element.
// The matching should cover the entire input string (not partial).


// Solution: DP - Recursion w/ Memoization

// Filter pattern -> * matches the character before it any number of times, 
  // so for a string "c*a*b", we can filter it to be
    // [["c", true], ["a", true], ["b", false]]
    // the first parameter is the character, and the second parameter is whether or not it has a *.
    // if the second parameter is true, this means we can match it 0 or any number of times.
    // if the second parameter is false, this means we must match it exactly once.

// Time Complexity: O(nm) 84ms
// Space Complexity: O(nm) 42.7MB
var isMatch = function(s, p) {
  let filtered = [];
  for (let i = 0; i < p.length; i++) {
    if (p[i] !== '*') filtered.push([p[i], false]);
    else filtered[filtered.length - 1][1] = true;
  }
  p = filtered;
  let memo = Array(s.length + 1);
  for (let i = 0; i <= s.length; i++) memo[i] = Array(p.length);
  return recurse(0, 0);

  function recurse(i, j) {
    if (j === p.length) return i === s.length;
    if (memo[i][j] !== undefined) return memo[i][j];
    memo[i][j] = false;
    if (p[j][1]) {
      // match 0 or more of p[j][0]
      // match 0
      if (recurse(i, j + 1)) return memo[i][j] = true;
      // match 1
      if (i < s.length) {
        if (p[j][0] === '.') return memo[i][j] = recurse(i + 1, j);
        else if (s[i] === p[j][0]) return memo[i][j] = recurse(i + 1, j);
      }
    } else {
      // must match p[j][0]
      // . matches any character
      if (p[j][0] === '.') {
        if (i < s.length) return memo[i][j] = recurse(i + 1, j + 1);
      } else {
        // must match character
        if (i < s.length && s[i] === p[j][0]) return memo[i][j] = recurse(i + 1, j + 1);
      }
    }
    return memo[i][j];
  }  
};

// Four test cases
console.log(isMatch("aab", "c*a*b")) // true
console.log(isMatch("aaaaa", ".*")) // true
console.log(isMatch("aa", "..")) // true
console.log(isMatch("mississippi", "mis*is*p*.")) // false