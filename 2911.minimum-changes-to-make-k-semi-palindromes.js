// 2911. Minimum Changes to Make K Semi-palindromes
// Given a string s and an integer k, partition s into k substrings such that the sum of the number of letter changes required to turn each substring into a semi-palindrome is minimized.
// Return an integer denoting the minimum number of letter changes required.
// Notes:
  // A string is a palindrome if it can be read the same way from left to right and right to left.
  // A string with a length of len is considered a semi-palindrome if there exists a positive integer d such that 1 <= d < len and len % d == 0, and if we take indices that have the same modulo by d, they form a palindrome. For example, "aa", "aba", "adbgad", and, "abab" are semi-palindrome and "a", "ab", and, "abca" are not.
  // A substring is a contiguous sequence of characters within a string.


// Solution: Preprocessing & DP

// Preprocess each substring and calculate the minimum cost to make it a semi-palindrome.
  // cost[i][j] = minimum cost to make substring(i, j) a semi-palindrome.
  // For each substring, go through each possible d.
  // Collect each letters per the same modulo and count the minimum cost to make them a palindrome.

// Use dp to find the minimum letter changes.
// Memoize each dp(i, k), where i is the index in s and k is the amount of substrings left.
// For each dp(i, k), try each possible substring starting from index i and use the precomputed changes matrix to find the cost.

// n = length of s
// Time Complexity: O(n^3 * sqrt(n)) 873ms
// Space Complexity: O(n^2 + nk) 63.5MB
var minimumChanges = function(s, k) {
  let n = s.length, cost = Array(n).fill(0).map(() => Array(n).fill(-1));
  for (let i = 0; i < n; i++) {
    for (let j = i + 1; j < n; j++) {
      let substring = s.slice(i, j + 1);
      cost[i][j] = getCost(substring);
    }
  }
  let memo = Array(n).fill(0).map(() => Array(k + 1).fill(-1));
  return dp(0, k);
  
  function dp(i, k) {
    if (i === n) return k === 0 ? 0 : Infinity;
    if (k === 0) return Infinity;
    if (memo[i][k] !== -1) return memo[i][k];
    
    let ans = Infinity;
    for (let j = i + 1; j < n; j++) {
      ans = Math.min(ans, cost[i][j] + dp(j + 1, k - 1));
    }
    return memo[i][k] = ans;
  }
};

function getCost(substring) {
  let n = substring.length, minCost = Infinity;
  for (let d = 1; d < n; d++) {
    if (n % d !== 0) continue;
    
    let cost = 0;
    for (let start = 0; start < d; start++) { 
      let chars = [];
      // collect each character sharing the same modulo and calculate the minimum cost to change it into a palindrome
      for (let i = start; i < n; i += d) { 
        chars.push(substring[i]);
      }
      cost += costForPalindrome(chars);
    }
    minCost = Math.min(minCost, cost);
  }
  return minCost;
}

function costForPalindrome(str) {
  let start = 0, end = str.length - 1;
  let cost = 0;
  while (start < end) {
    if (str[start] !== str[end]) cost++;
    start++, end--;
  }
  return cost;
}

// Three test cases
console.log(minimumChanges("abcac", 2)) // 1
console.log(minimumChanges("abcdef", 2)) // 2
console.log(minimumChanges("aabbaa", 3)) // 0