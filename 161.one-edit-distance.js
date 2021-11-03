// 161. One Edit Distance
// Given two strings s and t, return true if they are both one edit distance apart, otherwise return false.
// A string s is said to be one distance apart from a string t if you can:
    // Insert exactly one character into s to get t.
    // Delete exactly one character from s to get t.
    // Replace exactly one character of s with a different character to get t.


// Solution: Two Pointers

// Set two pointers, 
  // i: pointer for s
  // j: pointer for t
// Loop while i is within s.length AND j is within t.length
  // if s[i] is not equal to t[j]
    // return true if 
      // 1. adding a character results in equal strings
      // 2. deleting a character results in equal strings
      // 3. replacing a character results in equal strings
  // otherwise if s[i] is equal to t[j],
    // move i and j forward by one.
// if i is equal to s.length, return true if there is only one character left to match in t.
// if j is equal to t.length, return true if there is only one character left to match in s.

// Time Complexity: O(n) 72ms
// Space Complexity: O(n) (space for substring) 39.3MB
var isOneEditDistance = function(s, t) {
  let i = 0, j = 0;
  while (i < s.length && j < t.length) {
    if (s[i] !== t[j]) {
      return s.substring(i) === t.substring(j + 1) || s.substring(i + 1) === t.substring(j) || s.substring(i + 1) === t.substring(j + 1);
    } else {
      i++, j++;
    }
  }
  if (i === s.length) return j === t.length - 1;
  if (j === t.length) return i === s.length - 1;
};

// Four test cases to run function on
console.log(isOneEditDistance("ab", "acb")) // true
console.log(isOneEditDistance("", "")) // false
console.log(isOneEditDistance("a", "")) // true
console.log(isOneEditDistance("", "A")) // true