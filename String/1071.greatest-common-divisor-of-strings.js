// 1071. Greatest Common Divisor of Strings
// For two strings s and t, we say "t divides s" if and only if s = t + ... + t (i.e., t is concatenated with itself one or more times).
// Given two strings str1 and str2, return the largest string x such that x divides both str1 and str2.


// Solution: 

// Go through every possible prefix in the shorter string.
// For every prefix (go from longest to shortest so we can early return when we find a match)
  // Check whether str1 and str2 is a concatenation of the prefix.
  // Compare each str[i] with prefixString[i % prefix length].

// n = length of str1, m = length of str2
// Time Complexity: O(min(n, m) * (n + m)) 67ms
// Space Complexity: O(1) 42.7MB
var gcdOfStrings = function(str1, str2) {
  if (str1.length > str2.length) return gcdOfStrings(str2, str1);
  let n = str1.length;
  for (let i = n; i >= 1; i--) {
    if (isMatch(str1, str1, i) && isMatch(str2, str1, i)) {
      return str1.slice(0, i);
    }
  }
  return "";  
};

function isMatch(str, prefixStr, prefixLen) {
  if (str.length % prefixLen) return false;
  for (let i = 0; i < str.length; i++) {
    if (str[i] !== prefixStr[i % prefixLen]) {
      return false;
    }
  }
  return true;
}

// Three test cases
console.log(gcdOfStrings("ABCABC", "ABC")) // "ABC"
console.log(gcdOfStrings("ABABAB", "ABAB")) // "AB"
console.log(gcdOfStrings("LEET", "CODE")) // ""