// 2825. Make String a Subsequence Using Cyclic Increments
// You are given two 0-indexed strings str1 and str2.
// In an operation, you select a set of indices in str1, and for each index i in the set, increment str1[i] to the next character cyclically. That is 'a' becomes 'b', 'b' becomes 'c', and so on, and 'z' becomes 'a'.
// Return true if it is possible to make str2 a subsequence of str1 by performing the operation at most once, and false otherwise.
// Note: A subsequence of a string is a new string that is formed from the original string by deleting some (possibly none) of the characters without disturbing the relative positions of the remaining characters.


// Solution: Two Pointers

// Maintain two pointers, i for str1, j for str2.
// Greedily try to match str1[i] with str2[j].
// If str1[i] matches str2[j] OR incrementing str1[i] by 1 matches str2[j], match it and move both pointers up.
// It's always optimal to match as early on whenever we can.

// Time Complexity: O(n + m) 16ms
// Space Complexity: O(1) 56.3MB
function canMakeSubsequence(str1, str2) {
  let n = str1.length, m = str2.length;
  let j = 0;
  for (let i = 0; i < n && j < m; i++) {
    if (str1[i] === str2[j] || getCyclicNextChar(str1[i]) === str2[j]) {
      j++;
    }
  }
  return j === m;
};
  
function getCyclicNextChar(char) {
  const charcode = char.charCodeAt() - 97;
  const cyclicNextCharcode = (charcode + 1) % 26;
  return String.fromCharCode(cyclicNextCharcode + 97);
}

// Three test cases
console.log(canMakeSubsequence("abc", "ad")) // true
console.log(canMakeSubsequence("zc", "ad")) // true
console.log(canMakeSubsequence("ab", "d")) // false