// 1388. Pizza With 3n Slices
// There is a pizza with 3n slices of varying size, you and your friends will take slices of pizza as follows:
  // You will pick any pizza slice.
  // Your friend Alice will pick the next slice in the anti-clockwise direction of your pick.
  // Your friend Bob will pick the next slice in the clockwise direction of your pick.
  // Repeat until there are no more slices of pizzas.
// Given an integer array slices that represent the sizes of the pizza slices in a clockwise direction, return the maximum possible sum of slice sizes that you can pick.


// Solution: Greedy w/ DP

// Observe that we must pick n pieces that have at least one pizza slice in between each piece.
// As long as there is at least one pizza slice in between each slice we take, we can always pick the n pieces that we choose by starting at a piece and moving in one direction only.

// To ensure that we don't take the first and last slices together, we can simulate removing the first or the last slice and calculating the max sum on the remaining slices.

// Use DP to find the n non-adjacent pieces with the maximum sum.
// Memoize each dp(i, taken), where 
  // i = index in slices
  // taken = number of slices we have taken so far
// For each dp(i, taken), we have two choices:
  // 1. Take the current slices[i]. This means we can't take the next one, so skip to slices[i + 2].
  // 2. Skip slices[i], and we can consider taking slices[i + 1].

// Time Complexity: O(n^2) 89ms
// Space Complexity: O(n^2) 48.4MB
var maxSizeSlices = function(slices) {
  let n = slices.length / 3;
  return Math.max(maxSum(slices.slice(0, (n * 3) - 1), n), maxSum(slices.slice(1), n));
};

function maxSum(arr, n) {
  let memo = Array(arr.length).fill(0).map(() => Array(n + 1).fill(-1));
  return dp(0, 0);
  
  function dp(i, taken) {
    if (taken === n) return 0;
    if (i >= arr.length) return -Infinity;
    if (memo[i][taken] !== -1) return memo[i][taken];
    
    return memo[i][taken] = Math.max(arr[i] + dp(i + 2, taken + 1), dp(i + 1, taken));
  }
}

// Two test cases
console.log(maxSizeSlices([1,2,3,4,5,6])) // 10
console.log(maxSizeSlices([8,9,8,6,1,1])) // 16