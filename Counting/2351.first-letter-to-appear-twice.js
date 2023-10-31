// 2351. First Letter to Appear Twice
// Given a string s consisting of lowercase English letters, return the first letter to appear twice.


// Solution: Count Occurances of Characters

// Count the number of occurances so far for each character.
// Return the first letter where the number of occurances are more than 0.

// Time Complexity: O(n) 93ms
// Space Complexity: O(1) 42MB
var repeatedCharacter = function(s) {
  let count = Array(26).fill(0);
  for (let i = 0; i < s.length; i++) {
    let charcode = s.charCodeAt(i) - 97;
    if (count[charcode]++ > 0) return s[i];
  }
};

// Two test cases
console.log(repeatedCharacter("abccbaacz")) // "c"
console.log(repeatedCharacter("abcdd")) // "d"