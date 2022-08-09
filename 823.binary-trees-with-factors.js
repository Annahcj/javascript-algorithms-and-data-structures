// 823. Binary Trees With Factors
// Given an array of unique integers, arr, where each integer arr[i] is strictly greater than 1.
// We make a binary tree using these integers, and each number may be used for any number of times. Each non-leaf node's value should be equal to the product of the values of its children.
// Return the number of binary trees we can make. The answer may be too large so return the answer modulo 10^9 + 7.


// Solution 1: DP - Recursion w/ Memoization

// Memoize each dp(val), where dp(val) is the number of ways to make a binary tree with root node of val.
// For each node, get the total number of ways trying each different left & right children values.
  // Loop over each value for the left node, and find the right value by (root value / left value).

// Time Complexity: O(n^2) 251ms
// Space Complexity: O(n) 48.7MB
var numFactoredBinaryTrees = function(arr) {
  arr = new Set(arr);
  let mod = 10 ** 9 + 7, memo = new Map();
  let ans = 0;
  for (let val of arr) {
    ans = (ans + dp(val)) % mod;
  }
  return ans;
  
  function dp(val) {
    if (memo.has(val)) return memo.get(val);
    
    let ans = 1;
    for (let num of arr) {
      if (val % num === 0 && arr.has(val / num)) {
        ans = (ans + dp(num) * dp(val / num)) % mod;
      }
    }
    memo.set(val, ans);
    return ans;
  }  
};

// Solution 2: DP - Iterative

// An iterative version of solution 1. 
// Process nodes in sorted order, from smallest to largest.
// We must process them in sorted order so we can use the results of the smaller values.
// Populate each dp[val], where dp[val] is the number of ways to make a binary tree with root node of val.

// Time Complexity: O(n^2) 98ms
// Space Complexity: O(n) 44.1MB
var numFactoredBinaryTrees = function(arr) {
  let arrSet = new Set(arr), dp = new Map();
  let ans = 0, mod = 10 ** 9 + 7, n = arr.length;
  arr.sort((a, b) => a - b);
  
  for (let i = 0; i < n; i++) {
    let ways = 1;
    for (let j = 0; j < i && arr[j] <= arr[i] / 2; j++) {
      if (arr[i] % arr[j] === 0 && arrSet.has(arr[i] / arr[j])) {
        ways = (ways + dp.get(arr[j]) * dp.get(arr[i] / arr[j])) % mod;
      }
    }
    dp.set(arr[i], ways);
    ans = (ans + ways) % mod;
  }
  return ans;
};

// Two test cases to run function on
console.log(numFactoredBinaryTrees([2,4])) // 3
console.log(numFactoredBinaryTrees([2,4,5,10])) // 7