// 1278. Palindrome Partitioning III
// You are given a string s containing lowercase letters and an integer k. You need to:
  // First, change some characters of s to other lowercase English letters.
  // Then divide s into k non-empty disjoint substrings such that each substring is a palindrome.
// Return the minimal number of characters that you need to change to divide the string.


// Solution: DP - Recursion w/ Memoization

// 1. Populate costs, where costs[i][j] = the minimum cost of turning the substring from index i to j into a palindrome.
// 2. Memoize each dp(i, k): the minimum cost to split substring from index i onwards into k different palindromes.

// Time Complexity: O(n^3 + n^2 * k) 89ms
  // n^3: populating costs[i][j]
  // n^2 * k: dp
// Space Complexity: O(n^2 + nk) 46.5MB
var palindromePartition = function(s, k) {
  let n = s.length, costs = Array(n).fill(0).map(() => Array(n));
  for (let i = 0; i < n; i++) {
    for (let j = i; j < n; j++) {
      costs[i][j] = getMinCostToPalindrome(i, j);
    }
  }
  let memo = Array(n).fill(0).map(() => Array(k + 1).fill(-1));
  return dp(0, k);
  
  function dp(i, k) {
    if (i === n || k === 0) return i === n && k === 0 ? 0 : Infinity;
    if (memo[i][k] !== -1) return memo[i][k];
    let ans = Infinity;
    for (let j = i; j < n; j++) {
      ans = Math.min(ans, dp(j + 1, k - 1) + costs[i][j]);
    }
    return memo[i][k] = ans;
  }
  
  function getMinCostToPalindrome(start, end) { // minimum cost to change substring from start to end into a palindrome
    let cost = 0;
    while (start < end) {
      if (s[start] !== s[end]) cost++;
      start++, end--;
    }
    return cost;
  }
};

// Three test cases 
console.log(palindromePartition("abc", 2)) // 1
console.log(palindromePartition("aabbc", 3)) // 0
console.log(palindromePartition("leetcode", 8)) // 0