// 1312. Minimum Insertion Steps to Make a String Palindrome
// Given a string s. In one step you can insert any character at any index of the string.
// Return the minimum number of steps to make s palindrome.
// A Palindrome String is one that reads the same backward as well as forward.


// Solution 1: Recursion w/ Memoization

// Dynamic programming using recursion and memoization.
// memo[start][end] = minimum cost to turn s[start] - s[end] into a palindrome.

// Two situations:
  // 1. s[start] and s[end] are equal
    // we don't need to add any extra characters, move start up and end down.
  // 2. They are not equal
    // a. Add s[end] before index start (just a count, not actually adding)
    // b. Add s[start] after index end 
    // (get the minimum of the two situations)

// Time Complexity: O(n^2) 418ms
// Space Complexity: O(n^2) 53MB
var minInsertions = function(s) {
  let n = s.length, memo = Array(n);
  for (let i = 0; i < n; i++) memo[i] = Array(n).fill(-1);
  return dfs(0, n - 1);
  
  function dfs(start, end) {
    if (start >= end) return 0; // base case, when start and end overlap.
    if (memo[start][end] !== -1) return memo[start][end];
    
    if (s[start] === s[end]) return memo[start][end] = dfs(start + 1, end - 1); // characters match 
    let addStart = dfs(start, end - 1) + 1; // add s[end] to start
    let addEnd = dfs(start + 1, end) + 1; // add s[start] to end
    return memo[start][end] = Math.min(addStart, addEnd);
  }
};

// Three test cases to run function on
console.log(minInsertions("zzazz")) // 0
console.log(minInsertions("mbadm")) // 2
console.log(minInsertions("leetcode")) // 5