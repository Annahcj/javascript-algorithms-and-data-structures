// 3462. Maximum Sum With at Most K Elements
// You are given a 2D integer matrix grid of size n x m, an integer array limits of length n, and an integer k. The task is to find the maximum sum of at most k elements from the matrix grid such that:
  // The number of elements taken from the ith row of grid does not exceed limits[i].
// Return the maximum sum.


// Solution: Greedy w/ Sorting & Counting

// Collect all the values and their row numbers, then sort in desc order.
// Try to take the maximum k values, while keeping track of the numbers we have taken for every row.
// If we've already reached the limit for that row, skip the number.

// Time Complexity: O(mn log(mn)) 643ms
// Space Complexity: O(mn) 98.8MB
function maxSum(grid, limits, k) {
  const m = grid.length, n = grid[0].length;
  const values = [];
  for (let i = 0; i < m; i++) {
    for (let j = 0; j < n; j++) {
      values.push([grid[i][j], i]);
    }
  }
  values.sort((a, b) => b[0] - a[0]);
  let sum = 0, taken = 0;
  const used = Array(m).fill(0);
  for (let i = 0; i < m * n && taken < k; i++) {
    const [val, row] = values[i];
    if (used[row] < limits[row]) {
      used[row]++;
      taken++;
      sum += val;
    }
  }
  return sum;
};

// Two test cases
console.log(maxSum([[1,2],[3,4]], [1,2], 2)) // 7
console.log(maxSum([[5,3,7],[8,2,6]], [2,2], 3)) // 21