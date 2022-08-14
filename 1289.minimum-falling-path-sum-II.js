// 1289. Minimum Falling Path Sum II
// Given an n x n integer matrix grid, return the minimum sum of a falling path with non-zero shifts.
// A falling path with non-zero shifts is a choice of exactly one element from each row of grid such that no two elements chosen in adjacent rows are in the same column.


// Solution: Dynamic Programming

// Calculate the minimum path sum for each cell starting from the last row to the first row.
// For each cell, no matter which cell we are on for the current row, we should always take the same minimum sum path of the row below it.
// The only path we aren't allowed to take is the one with the same column.
// For this purpose, we can track two minimums. When the column is the same, take the second minimum. Otherwise we take the minimum.

// Note that we are modifying the input grid to save space. We can always create a new grid if we want to avoid modifying the input.

// Time Complexity: O(n^2) 98ms
// Space Complexity: O(1) 44.8MB
var minFallingPathSum = function(grid) {
  let n = grid.length, min = -1, secondMin = -1;
  for (let j = 0; j < n; j++) {
    if (min === -1 || grid[n - 1][j] < grid[n - 1][min]) {
      secondMin = min;
      min = j;
    } else if (secondMin === -1 || grid[n - 1][j] < grid[n - 1][secondMin]) {
      secondMin = j;
    }
  }
  
  for (let i = n - 2; i >= 0; i--) {
    let currMin = -1, currSecondMin = -1;
    for (let j = 0; j < n; j++) {
      grid[i][j] += min !== j ? grid[i + 1][min] : grid[i + 1][secondMin];
      if (currMin === -1 || grid[i][j] < grid[i][currMin]) {
        currSecondMin = currMin;
        currMin = j;
      } else if (currSecondMin === -1 || grid[i][j] < grid[i][currSecondMin]) {
        currSecondMin = j;
      }
    }
    min = currMin, secondMin = currSecondMin;
  }
  return Math.min(...grid[0]);
};

// Two test cases to run function on
console.log(minFallingPathSum([[1,2,3],[4,5,6],[7,8,9]])) // 13
console.log(minFallingPathSum([[7]])) // 7