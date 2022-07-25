// 1420. Build Array Where You Can Find The Maximum Exactly K Comparisons
// You are given three integers n, m and k. Consider the following algorithm to find the maximum element of an array of positive integers:

// maximum_value = -1
// maximum_index = -1
// search_cost = 0
// n = arr.length
// for (i = 0; i < n; i++) {
//   if (maximum_value < arr[i]) {
//     maximum_value = arr[i]
//     maximum_index = i
//     search_cost = search_cost + 1
//   }
// }
// return maximum_index

// You should build the array arr which has the following properties:
  // arr has exactly n integers.
  // 1 <= arr[i] <= m where (0 <= i < n).
  // After applying the mentioned algorithm to arr, the value search_cost is equal to k.
// Return the number of ways to build the array arr under the mentioned conditions. As the answer may grow large, the answer must be computed modulo 10^9 + 7.


// Solution: DP - Recursion w/ Memoization

// The search cost = count of numbers bigger than the running maximum (starting with -1) at each index.
// Basically we need to find the number of ways to build the array such that the search cost is equal to k at the end.
  // To do this, we need to keep track of the index we are up to, the current running maximum number, and the remaining k.
  // Try each number from 1 to m as the next number in the array. If the number is bigger than the current maximum, make sure k is not equal to 0.

// Memoize each dp(i, max, k remaining), where 
  // i = number of elements in the array so far
  // max = maximum element in the array so far
  // k = k remaining

// Time Complexity: O(nm^2k) 599ms
// Space Complexity: O(nmk) 47.9MB
var numOfArrays = function(n, m, k) {
  let memo = Array(n).fill(0).map(() => Array(m + 1).fill(0).map(() => Array(k + 1).fill(-1)));
  let mod = 10 ** 9 + 7;
  return dp(0, 0, k);
  
  function dp(i, max, k) {
    if (i === n) return k === 0 ? 1 : 0;
    if (memo[i][max][k] !== -1) return memo[i][max][k];
    
    let ans = 0;
    for (let j = m; j >= 1; j--) {
      if (j > max && k === 0) continue;
      ans = (ans + dp(i + 1, Math.max(j, max), j > max ? k - 1 : k)) % mod;
    }
    return memo[i][max][k] = ans;
  }
};

// Two test cases to run function on
console.log(numOfArrays(2, 3, 1)) // 6
console.log(numOfArrays(5, 2, 3)) // 0