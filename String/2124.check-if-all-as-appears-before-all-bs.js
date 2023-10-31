// 2124. Check if All A's Appears Before All B's
// Given a string s consisting of only the characters 'a' and 'b', return true if every 'a' appears before every 'b' in the string. Otherwise, return false.


// Solution: Check adjacent characters

// Check whether the string contains 'ba'.

// Time Complexity: O(n) 99ms
// Space Complexity: O(1) 38.9MB
var checkString = function(s) {
  if (s.length === 1) return true;
  for (let i = 1; i < s.length; i++) {
    if (s[i - 1] === 'b' && s[i] === 'a') return false;
  }
  return true;
};

// Three test cases
console.log(checkString("aaabbb")) // true
console.log(checkString("abab")) // false
console.log(checkString("bbb")) // true