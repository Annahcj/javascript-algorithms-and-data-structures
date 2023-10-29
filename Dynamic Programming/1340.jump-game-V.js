// 1340. Jump Game V
// Given an array of integers arr and an integer d. In one step you can jump from index i to index:
  // i + x where: i + x < arr.length and 0 < x <= d.
  // i - x where: i - x >= 0 and 0 < x <= d.
// In addition, you can only jump from index i to index j if arr[i] > arr[j] and arr[i] > arr[k] for all indices k between i and j (More formally min(i, j) < k < max(i, j)).
// You can choose any index of the array and start jumping. Return the maximum number of indices you can visit.
// Notice that you can not jump outside of the array at any time.


// Solution: DP - Recursion w/ Memoization

// Memoize each dp(i), where i = index in arr.
// This will never have TLE because we are always moving to indices with smaller values.

// For each index i, get the best result from each valid index j (j must be within range of d).
// Record the running max value out of each arr[j], if it exceeds or equals arr[i], break (we can only move to smaller values).

// Time Complexity: O(nd) 174ms
// Space Complexity: O(n) 45.1MB
var maxJumps = function(arr, d) {
  let n = arr.length, memo = Array(n).fill(-1), res = 0;
  for (let i = 0; i < n; i++) {
    res = Math.max(res, dp(i));
  }
  return res;
  
  function dp(i) {
    if (memo[i] !== -1) return memo[i];
    
    let ans = 1, max = 0;
    for (let j = i + 1; j <= Math.min(n - 1, i + d); j++) {
      max = Math.max(max, arr[j]);
      if (max >= arr[i]) break;
      ans = Math.max(ans, dp(j) + 1);
    }
    
    max = 0;
    for (let j = i - 1; j >= Math.max(0, i - d); j--) {
      max = Math.max(max, arr[j]);
      if (max >= arr[i]) break;
      ans = Math.max(ans, dp(j) + 1);
    }
    return memo[i] = ans;
  }
};

// Three test cases
console.log(maxJumps([6,4,14,6,8,13,9,7,10,6,12], 2)) // 4
console.log(maxJumps([3,3,3,3,3], 3)) // 1
console.log(maxJumps([7,6,5,4,3,2,1], 1)) // 7