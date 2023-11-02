// 2002. Maximum Product of the Length of Two Palindromic Subsequences
// Given a string s, find two disjoint palindromic subsequences of s such that the product of their lengths is maximized. The two subsequences are disjoint if they do not both pick a character at the same index.
// Return the maximum possible product of the lengths of the two palindromic subsequences.
// A subsequence is a string that can be derived from another string by deleting some or no characters without changing the order of the remaining characters. A string is palindromic if it reads the same forward and backward.


// Solution 1: Backtracking 

// For each s[i] we have three choices:
  // 1. Skip it.
  // 2. Add it to subsequence1
  // 3. Add it to subsequence2
// When we reach the end of s, check if both subsequences are valid palindromes and record the maximum product of the subsequence lengths.

// n = length of s
// Time Complexity: O(3^n * n) 892ms
// Space Complexity: O(n) 50.2MB
var maxProduct = function(s) {
  let res = 0;
  backtrack(0, "", "");
  return res;
  
  function backtrack(i, s1, s2) {
    if (i === s.length) {
      if (isPalindrome(s1) && isPalindrome(s2)) {
        res = Math.max(res, s1.length * s2.length); 
      } 
      return;
    }
    backtrack(i + 1, s1, s2);
    backtrack(i + 1, s1 + s[i], s2);
    backtrack(i + 1, s1, s2 + s[i]);
  }
  
  function isPalindrome(s) {
    let start = 0, end = s.length - 1;
    while (start < end) {
      if (s[start] !== s[end]) return false;
      start++, end--;
    }
    return true;
  }
};


// Solution 2: Generate Bitmasks

// Generate all possible bitmasks up to 2^n.
// Save the bitmasks that represent a palindrome.
// Go through each pair of bitmasks, if the two bitmasks have no overlap, record the maximum product of lengths.

// Time Complexity: O(2^n * 2^n) 131ms
// Space Complexity: O(2^n) 50MB
var maxProduct = function(s) {
  let n = s.length, validMasks = [], maxPalinLen = 0;
  for (let mask = 1; mask < (1 << n); mask++) {
    let str = buildStr(mask);
    if (isPalindrome(str)) {
      validMasks.push([mask, str.length]);
      maxPalinLen = Math.max(maxPalinLen, str.length);
    }
  }
  
  let maxProduct = 0;
  for (let i = 0; i < validMasks.length; i++) {
    if (validMasks[i][1] * maxPalinLen <= maxProduct) continue;
    for (let j = i + 1; j < validMasks.length; j++) {
      if ((validMasks[i][0] & validMasks[j][0]) === 0) {
        maxProduct = Math.max(maxProduct, validMasks[i][1] * validMasks[j][1]);
      }
    }
  }
  return maxProduct;
  
  function buildStr(mask) {
    let str = "";
    for (let i = 0; i < n; i++) {
      if ((mask >> i) & 1) {
        str += s[i];
      }
    }
    return str;
  }
  
  function isPalindrome(str) {
    let start = 0, end = str.length - 1;
    while (start < end) {
      if (str[start] !== str[end]) {
        return false;
      }
      start++, end--;
    }
    return true;
  }
};

// Three test cases
console.log(maxProduct("leetcodecom")) // 9
console.log(maxProduct("bb")) // 1
console.log(maxProduct("accbcaxxcxx")) // 25