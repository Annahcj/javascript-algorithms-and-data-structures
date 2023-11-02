// 1960. Maximum Product of the Length of Two Palindromic Substrings
// You are given a 0-indexed string s and are tasked with finding two non-intersecting palindromic substrings of odd length such that the product of their lengths is maximized.
// More formally, you want to choose four integers i, j, k, l such that 0 <= i <= j < k <= l < s.length and both the substrings s[i...j] and s[k...l] are palindromes and have odd lengths. s[i...j] denotes a substring from index i to index j inclusive.
// Return the maximum possible product of the lengths of the two non-intersecting palindromic substrings.
// A palindrome is a string that is the same forward and backward. A substring is a contiguous sequence of characters in a string.


// Solution: Manacher's Algorithm

// 1. Use Manacher's algorithm to find the longest odd-lengthed palindromes from each center i.
// 2. Use the Manacher's array to find the longest palindrome ending at each index i.
  // m[i] = the longest palindrome centered at index i, which means there are m[i] sub-palindromes within this palindrome.
  // Use end[i] = Math.max(end[i], end[i + 1] - 2) for sub-palindromes within the longer palindromes.
// 3. Use the Manacher's array to find the longest palindrome starting at each index i, in the same way as step 2.
// 4. Take each index i as the start of the second palindrome. Keep track of the longest palindrome ending at index before i.

// Time Complexity: O(n) 137ms
// Space Complexity: O(n) 55.3MB
var maxProduct = function(s) {
  let n = s.length, m = manacherOdd(s); 
  let end = Array(n).fill(1), start = Array(n).fill(1);
  for (let i = 0; i < n; i++) {
    end[i + m[i] - 1] = Math.max(end[i + m[i] - 1], m[i] * 2 - 1);
    start[i - m[i] + 1] = Math.max(start[i - m[i] + 1], m[i] * 2 - 1);
  }
  for (let i = n - 2; i >= 0; i--) {
    end[i] = Math.max(end[i], end[i + 1] - 2); 
  }
  for (let i = 1; i < n; i++) {
    start[i] = Math.max(start[i], start[i - 1] - 2);
  }
  let maxLen = 1, maxProduct = 0;
  for (let i = 1; i < n; i++) {
    maxProduct = Math.max(maxProduct, maxLen * start[i]);
    maxLen = Math.max(maxLen, end[i]);
  }
  return maxProduct;
};

function manacherOdd(s) {
  let n = s.length, m = Array(n).fill(1);
  for (let i = 1, l = 1, r = 1; i < n; i++) {
    if (i > r) {
      while (i - m[i] >= 0 && i + m[i] < n && s[i - m[i]] === s[i + m[i]]) m[i]++;
      l = i - m[i] + 1, r = i + m[i] - 1;
    } else {
      if (i + m[l + (r - i)] > r) {
        m[i] = r - i;
        while (i - m[i] >= 0 && i + m[i] < n && s[i - m[i]] === s[i + m[i]]) m[i]++;
        l = i - m[i] + 1, r = i + m[i] - 1;
      } else {
        m[i] = m[l + (r - i)];
        l = i - m[i] + 1, r = i + m[i] - 1;
      }
    }
  }
  return m;
}

// Two test cases
console.log(maxProduct("ababbb")) // 9
console.log(maxProduct("zaaaxbbby")) // 9