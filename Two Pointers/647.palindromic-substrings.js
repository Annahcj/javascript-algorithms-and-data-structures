// 647. Palindromic Substrings
// Given a string s, return the number of palindromic substrings in it.
// A string is a palindrome when it reads the same backward as forward.
// A substring is a contiguous sequence of characters within the string.


// Solution: Expand Around Center

// The idea is to basically expand outwards from the middle of a palindrome.
// For every letter in s (pointer = i), count the number of palindromes that have the center 
  // odd-lengthed: i 
  // even-lengthed: i and i + 1

// Time Complexity: O(n^2) 124ms
// Space Complexity: O(1) 39.5MB
var countSubstrings = function(s) {
  let ans = 0;
  for (var i = 0; i < s.length; i++) {
    ans += palindromes(i, i);
    if (i !== s.length - 1) ans += palindromes(i, i + 1);
  }
  return ans;

  function palindromes(start, end) {
    let count = 0;
    while (start >= 0 && end < s.length && s[start] === s[end]) {
      count++;
      start--, end++;
    }
    return count;
  }  
};

// Two test cases to run function on
console.log(countSubstrings("abc")) // 3
console.log(countSubstrings("aaa")) // 6