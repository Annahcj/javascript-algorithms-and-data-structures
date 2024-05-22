// 3152. Special Array II
// An array is considered special if every pair of its adjacent elements contains two numbers with different parity.
// You are given an array of integer nums and a 2D integer matrix queries, where for queries[i] = [from[i], to[i]] your task is to check that subarray nums[from[i]..to[i]] is special or not.
// Return an array of booleans answer such that answer[i] is true if nums[from[i]..to[i]] is special.


// Solution: Prefix Sum

// Get the "parity result" between each pair of adjacent elements.
// Store the prefix sum of parity results.
  // If different parity, the parity result is 1.
  // If same parity, the parity result is 0.

// For each query, get the range sum of parity results for the range [start, end].
// If this range sum is equal to the range length, then that means every pair of adjacent elements in this subarray has a different parity.

// n = length of nums, m = number of queries
// Time Complexity: O(n + m) 158ms
// Space Complexity: O(n + m) 84.1MB
var isArraySpecial = function(nums, queries) {
  let n = nums.length, pSum = Array(n).fill(0); // pSum[i] = 1 if nums[i - 1] and nums[i] are different parity, otherwise 0
  for (let i = 0; i < n - 1; i++) {
    let score = nums[i] % 2 === nums[i + 1] % 2 ? 0 : 1;
    pSum[i + 1] = pSum[i] + score;
  }
  let m = queries.length, ans = Array(m);
  for (let i = 0; i < m; i++) {
    let [start, end] = queries[i];
    let sum = pSum[end] - pSum[start];
    ans[i] = sum === end - start;
  }
  return ans;
};

// Two test cases
console.log(isArraySpecial([3,4,1,2,6], [[0,4]])) // [false]
console.log(isArraySpecial([4,3,1,6], [[0,2],[2,3]])) // [false,true]