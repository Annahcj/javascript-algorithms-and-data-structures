// 1745. Palindrome Partitioning IV
// Given a string s, return true if it is possible to split the string s into three non-empty palindromic substrings. Otherwise, return false.​​​​​
// A string is said to be palindrome if it the same string when reversed.


// Solution: Preprocessing Palindromes

// 1. Populate isPalindrome, where isPalindrome[i][j] indicates whether the substring between indexes i and j is a palindrome or not.
  // Expand from the center outwards.
  // Since palindromes can be even or odd-lengthed, account for both cases by starting from one center character and two center characters.
// 2. Loop through each pair of positions to split s into three substrings and check if they each are palindromes.
  // Go through each i, j to split into three substrings (both indices are inclusive):
    // 1st: 0 to i 
    // 2nd: i + 1 to j
    // 3rd: j + 1 to n - 1

// Time Complexity: O(n^2) 544ms
// Space Complexity: O(n^2) 98.2MB
var checkPartitioning = function(s) {
  let n = s.length, isPalindrome = Array(n).fill(0).map(() => Array(n).fill(false));
  isPalindrome[0][0] = true;
  for (let i = 1; i < n; i++) {
    expandPalindrome(i, i);
    expandPalindrome(i - 1, i);
  }
  for (let i = 0; i < n - 2; i++) { 
    for (let j = i + 1; j < n - 1; j++) { 
      if (isPalindrome[0][i] && isPalindrome[i + 1][j] && isPalindrome[j + 1][n - 1]) {
        return true;
      }
    }
  }
  return false;
  
  function expandPalindrome(start, end) {
    while (start >= 0 && end < n && s[start] === s[end]) {
      isPalindrome[start][end] = true;
      start--, end++;
    }
  }
};

// Two test cases to run function on
console.log(checkPartitioning("abcbdd")) // true
console.log(checkPartitioning("bcbddxy")) // false