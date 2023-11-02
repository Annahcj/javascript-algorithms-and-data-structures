// 873. Length of Longest Fibonacci Subsequence
// A sequence x1, x2, ..., xn is Fibonacci-like if:
  // n >= 3
  // x[i] + x[i+1] == x[i+2] for all i + 2 <= n
// Given a strictly increasing array arr of positive integers forming a sequence, return the length of the longest Fibonacci-like subsequence of arr. If one does not exist, return 0.
// A subsequence is derived from another sequence arr by deleting any number of elements (including none) from arr, without changing the order of the remaining elements. For example, [3, 5, 8] is a subsequence of [3, 4, 5, 6, 7, 8].


// Solution 1: DP - Recursion w/ Memoization

// Let's say a sequence of length 3 is (i, j, k).
// Use a hashmap to store the index of each arr[i].

// Memoize each dp(i, j).
  // From arr[i] and arr[j], we know the next number in the sequence (arr[i] + arr[j]).
  // If it exists in the hashmap, continue the sequence to that number.
  // Otherwise, we end the sequence (return length 2).

// Time Complexity: O(n^2) 1039ms
// Space Complexity: O(n^2) 90.5MB
var lenLongestFibSubseq = function(arr) {
  let n = arr.length, memo = Array(n).fill(0).map(() => Array(n).fill(-1));
  let res = 0, map = new Map();
  for (let i = 0; i < n; i++) {
    map.set(arr[i], i);
  }
  for (let i = 0; i < n; i++) {
    for (let j = i + 1; j < n - 1; j++) {
      res = Math.max(res, dp(i, j));
    }
  }
  return res < 3 ? 0 : res;
  
  function dp(i, j) {
    if (memo[i][j] !== -1) return memo[i][j];
    if (map.has(arr[i] + arr[j])) {
      let k = map.get(arr[i] + arr[j]);
      return memo[i][j] = 1 + dp(j, k);
    }
    return memo[i][j] = 2;
  }
};


// Solution 2: Bottom Up DP

// The same concept as solution 1, except we are going bottom-up instead of top-down and using iteration instead of recursion.
// Go through each (j, k) and try to find the previous number in the sequence (i), which we can find by arr[k] - arr[j].

// Time Complexity: O(n^2) 630ms
// Space Complexity: O(n^2)  76.3MB
var lenLongestFibSubseq = function(arr) {
  let n = arr.length, dp = Array(n).fill(0).map(() => Array(n));
  let map = new Map(), ans = 0;
  for (let j = 0; j < n - 1; j++) {
    for (let k = j + 1; k < n; k++) {
      let diff = arr[k] - arr[j];
      if (!map.has(diff)) dp[j][k] = 2;
      else {
        let i = map.get(diff);
        dp[j][k] = dp[i][j] + 1;
      }
      ans = Math.max(ans, dp[j][k]);
    }
    map.set(arr[j], j);
  }
  return ans < 3 ? 0 : ans;
};

// Two test cases
console.log(lenLongestFibSubseq([1,2,3,4,5,6,7,8])) // 5
console.log(lenLongestFibSubseq([1,3,7,11,12,14,18])) // 3