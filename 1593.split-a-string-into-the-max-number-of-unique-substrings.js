// 1593. Split a String Into the Max Number of Unique Substrings
// Given a string s, return the maximum number of unique substrings that the given string can be split into.
// You can split string s into any list of non-empty substrings, where the concatenation of the substrings forms the original string. However, you must split the substrings such that all of them are unique.
// A substring is a contiguous sequence of characters within a string.


// Solution: Backtracking & Hashset

// Use backtracking to find all the possible splits.
// Add the substrings used into a hashset so we can avoid revisiting them.
// Record the maximum number of substrings at one time.

// Time Complexity: O(2^n * n) 171ms
// Space Complexity: O(n) 48.3MB
var maxUniqueSplit = function(s) {
  let n = s.length, res = 0;
  backtrack(0, new Set());
  return res;
  
  function backtrack(start, unique) {
    if (start === n) {
      res = Math.max(res, unique.size);
      return;
    }
    for (let i = start; i < n; i++) {
      let substr = s.slice(start, i + 1);
      if (!unique.has(substr)) {
        unique.add(substr);
        backtrack(i + 1, unique);
        unique.delete(substr);
      }
    }
  }
};

// Three test cases to run function on
console.log(maxUniqueSplit("ababccc")) // 5
console.log(maxUniqueSplit("aba")) // 2
console.log(maxUniqueSplit("aa")) // 1