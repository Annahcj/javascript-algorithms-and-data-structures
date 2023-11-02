// 2472. Maximum Number of Non-overlapping Palindrome Substrings
// You are given a string s and a positive integer k.
// Select a set of non-overlapping substrings from the string s that satisfy the following conditions:
  // The length of each substring is at least k.
  // Each substring is a palindrome.
// Return the maximum number of substrings in an optimal selection.
// A substring is a contiguous sequence of characters within a string.


// Solution: DP & Greedy 

// For a palindrome longer than size k + 1, that means we there is always an inner palindrome with size k or k + 1. 
// Therefore, we only need to consider palindromes with size k or k + 1 (for even and odd lengths).

// Memoize each dp(i), where i = index in s.
// For each dp(i), check whether there is a palindrome of size k or k + 1 starting at index i. Return the maximum result.

// Time Complexity: O(nk) 104ms
// Space Complexity: O(n) 44.8MB
var maxPalindromes = function(s, k) {
  let n = s.length, memo = Array(n).fill(-1);
  return dp(0);
  
  function dp(i) {
    if (i === n) return 0;
    if (memo[i] !== -1) return memo[i];
    
    let ans = dp(i + 1); // skip index i
    if (isPalindrome(i, i + k - 1)) ans = Math.max(ans, 1 + dp(i + k)); // take palindrome of size k
    if (isPalindrome(i, i + k)) ans = Math.max(ans, 1 + dp(i + k + 1)); // take palindrome of size k + 1
    return memo[i] = ans;
  }  

  function isPalindrome(i, j) {
    let start = i, end = j;
    while (start < end) {
      if (s[start] !== s[end]) return false;
      start++, end--;
    }
    return true;
  }
};

// Two test cases
console.log(maxPalindromes("abaccdbbd", 3)) // 2
console.log(maxPalindromes("adbcda", 2)) // 0