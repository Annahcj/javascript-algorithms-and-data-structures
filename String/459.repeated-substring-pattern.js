// 459. Repeated Substring Pattern
// Given a string s, check if it can be constructed by taking a substring of it and appending multiple copies of the substring together.


// Solution: Brute Force

// For a substring to be repeated, the length of s must be divisble by the substring length.

// The maximum number of divisors of n is at most 2 * sqrt(n).
// The reason for this is that divisors occur in pairs, and the smaller number in the pairs is at most sqrt(n).
  // e.g: n = 12 -> (2, 6), (3, 4).

// For each valid substring length, check if s is a repetition of the prefix of that length.

// Time Complexity: O(n * sqrt(n)) 73ms
// Space Complexity: O(1) 43.7MB
var repeatedSubstringPattern = function(s) {
  let n = s.length;
  for (let i = 1; i <= Math.floor(n / 2); i++) {
    if (n % i === 0 && isValid(s, i)) {
      return true;
    }
  }
  return false;
};

function isValid(s, substrLen) {
  let n = s.length;
  for (let i = substrLen; i < n; i++) {
    if (s[i] !== s[i % substrLen]) return false
  }
  return true;
}

// Three test cases
console.log(repeatedSubstringPattern("abab")) // true
console.log(repeatedSubstringPattern("aba")) // false
console.log(repeatedSubstringPattern("abcabcabcabc")) // true