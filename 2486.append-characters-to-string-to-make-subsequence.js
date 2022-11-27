// 2486. Append Characters to String to Make Subsequence
// You are given two strings s and t consisting of only lowercase English letters.
// Return the minimum number of characters that need to be appended to the end of s so that t becomes a subsequence of s.
// A subsequence is a string that can be derived from another string by deleting some or no characters without changing the order of the remaining characters.


// Solution: Greedy

// Since we can only add new characters at the end of s, 
// it is optimal to match as many characters in s as possible.
// Use two pointers to keep track of how many characters have been matched in s and t.
// We then need to append the last (t.length - j) characters of t onto s.

// n = length of s
// Time Complexity: O(n) 147ms
// Space Complexity: O(1) 45.2MB
var appendCharacters = function(s, t) {
  let j = 0;
  for (let i = 0; i < s.length && j < t.length; i++) {
    if (s[i] === t[j]) j++;
  }
  return t.length - j;
};

// Three test cases
console.log(appendCharacters("coaching", "coding")) // 4
console.log(appendCharacters("abcde", "a")) // 0
console.log(appendCharacters("z", "abcde")) // 5