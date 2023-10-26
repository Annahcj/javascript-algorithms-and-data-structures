// 516. Longest Palindromic Subsequence
// Given a string s, find the longest palindromic subsequence's length in s.
// A subsequence is a sequence that can be derived from another sequence by deleting some or no elements without changing the order of the remaining elements.


// Solution 1: Recursion w/ Memoization

// set two pointers at 0 and s.length - 1.
// if letters are equal, move both pointers.
// otherwise move the start only, and the end only.
// get the best length.

// recurse: (start pointer, end pointer)
// base case 1: if start is equal to end, return 1
// base case 2: if start is bigger than end, return 0.
// if memo already contains [start][end], return memo[start][end].
// if s[start] and s[end] are equal, set ans to 2 + recurse(start + 1, end - 1)
// otherwise, set ans to max(recurse(start + 1, end), recurse(start, end - 1))
// save ans to memo[start][end]
// return ans.

// Time Complexity: O(n^2) 220ms
// Space Complexity: O(n^2) 68.4MB
var longestPalindromeSubseq = function(s) {
  let memo = Array(s.length);
  for (var i = 0; i < s.length; i++) memo[i] = Array(s.length);
  return recurse(0, s.length - 1);
  function recurse(start, end) {
    if (start === end) return 1;
    if (start > end) return 0;
    if (memo[start][end] !== undefined) return memo[start][end];
    let ans;
    if (s[start] === s[end]) ans = 2 + recurse(start + 1, end - 1);
    else ans = Math.max(recurse(start + 1, end), recurse(start, end - 1));
    memo[start][end] = ans;
    return ans;
  }  
};

// Two test cases to run function on
console.log(longestPalindromeSubseq("bbbab")) // 4
console.log(longestPalindromeSubseq("cbbd")) // 2