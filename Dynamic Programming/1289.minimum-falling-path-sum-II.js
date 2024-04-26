// 1289. Minimum Falling Path Sum II
// Given an n x n integer matrix grid, return the minimum sum of a falling path with non-zero shifts.
// A falling path with non-zero shifts is a choice of exactly one element from each row of grid such that no two elements chosen in adjacent rows are in the same column.


// Solution: DP

// Keep track of the minimum path sum and second minimum path sum from the last row.
// Note: Store the column along with the sum, so that we can avoid taking a sum if the column is the same.
// For each row, update the minimum path sum and second minimum path sum.
// After going through all rows, return the minimum path sum.

// n = number of rows, number of columns
// Time Complexity: O(n^2) 62ms
// Space Complexity: O(1) 52MB
var minFallingPathSum = function(grid) {
  let n = grid.length;
  let prevMin = {col: -1, sum: 0}, prevSecondMin = {col: -1, sum: 0};
  for (let i = 0; i < n; i++) {
    let min = {col: -1, sum: Infinity};
    let secondMin = {col: -1, sum: Infinity};
    for (let j = 0; j < n; j++) {
      let sum = prevMin.col === j ? prevSecondMin.sum + grid[i][j] : prevMin.sum + grid[i][j];
      if (sum < min.sum) {
        secondMin = min;
        min = {col: j, sum};
      } else if (sum < secondMin.sum) {
        secondMin = {col: j, sum};
      }
    }
    prevMin = min;
    prevSecondMin = secondMin;
  }
  return prevMin.sum;
};

// Two test cases 
console.log(minFallingPathSum([[1,2,3],[4,5,6],[7,8,9]])) // 13
console.log(minFallingPathSum([[7]])) // 7