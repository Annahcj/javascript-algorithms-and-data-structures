// 1930. Unique Length-3 Palindromic Subsequences
// Given a string s, return the number of unique palindromes of length three that are a subsequence of s.
// Note that even if there are multiple ways to obtain the same subsequence, it is still only counted once.
// A palindrome is a string that reads the same forwards and backwards.
// A subsequence of a string is a new string generated from the original string with some characters (can be none) deleted without changing the relative order of the remaining characters.
  // For example, "ace" is a subsequence of "abcde".


// Solution: Counting 

// There can only be at most 26 * 26 unique length-3 palindromes.
  // 26 possibilities for the middle character.
  // 26 possibilities for the outer two characters (since the two outer characters must be equal).
// Keep track of each palindrome we have already taken in a 2D matrix seen, where seen[i][j] = boolean for whether we have already counted the palindrome with inner character i and outer characters j. 

// Take each s[i] as the middle character,
// Keep track of the count of occurances of each character on the left and right of s[i].
// Go through each lowercase letter and check whether it exists on the left and right of s[i].
// If it does, add to the count of palindromes and mark it as seen.
// As we move i forward, update the counts on the left and right.

// Time Complexity: O(n * 26) 198ms
// Space Complexity: O(26 * 26) 45.4MB
var countPalindromicSubsequence = function(s) {
  let n = s.length, seen = Array(26).fill(0).map(() => Array(26)); // seen[i][j] = boolean for whether we have already counted the palindrome with inner character i and outer characters j.
  let left = Array(26).fill(0), right = Array(26).fill(0);
  for (let i = 1; i < n; i++) {
    right[s.charCodeAt(i) - 97]++;
  }
  left[s.charCodeAt(0) - 97]++;
  
  let count = 0;
  for (let i = 1; i < n - 1; i++) { // take each s[i] as the middle of palindrome
    let charcode = s.charCodeAt(i) - 97;
    right[charcode]--;
    for (let j = 0; j < 26; j++) { // check whether character j exists on the left and right of s[i]
      if (left[j] > 0 && right[j] > 0 && !seen[charcode][j]) {
        seen[charcode][j] = 1;
        count++;
      }
    }
    left[charcode]++;
  }
  return count;
};

// Three test cases
console.log(countPalindromicSubsequence("aabca")) // 3
console.log(countPalindromicSubsequence("adc")) // 0
console.log(countPalindromicSubsequence("bbcbaba")) // 4