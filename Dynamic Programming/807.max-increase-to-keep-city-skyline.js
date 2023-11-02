// 807. Max Increase to Keep City Skyline
// There is a city composed of n x n blocks, where each block contains a single building shaped like a vertical square prism. You are given a 0-indexed n x n integer matrix grid where grid[r][c] represents the height of the building located in the block at row r and column c.
// A city's skyline is the the outer contour formed by all the building when viewing the side of the city from a distance. The skyline from each cardinal direction north, east, south, and west may be different.
// We are allowed to increase the height of any number of buildings by any amount (the amount can be different per building). The height of a 0-height building can also be increased. However, increasing the height of a building should not affect the city's skyline from any cardinal direction.
// Return the maximum total sum that the height of the buildings can be increased by without changing the city's skyline from any cardinal direction.


// Solution: Get Max in Row and Column

// We can group the views from (west and east) and (north and south).
  // Take the maximum values in each row and column (row for west and east, column for north and south).
// For each cell, change it to the minimum of 
  // 1. The maximum value in that row
  // 2. The maximum value in that column
// To elaborate: Math.min(row max, column max) - current height.
// (We have to take the minimum of the two, otherwise the views will be changed on the other sides)

// Time Complexity: O(mn) 71ms
// Space Complexity: O(m + n) 43MB
var maxIncreaseKeepingSkyline = function(grid) {
  let m = grid.length, n = grid[0].length;
  let rowsMax = Array(m).fill(0), colsMax = Array(n).fill(0);
  for (let i = 0; i < m; i++) {
    for (let j = 0; j < n; j++) {
      rowsMax[i] = Math.max(rowsMax[i], grid[i][j]);
      colsMax[j] = Math.max(colsMax[j], grid[i][j]);
    }
  }
  let ans = 0;
  for (let i = 0; i < m; i++) {
    for (let j = 0; j < n; j++) {
      ans += Math.min(rowsMax[i], colsMax[j]) - grid[i][j];
    }
  }
  return ans;
};

// Two test cases to run function on
console.log(maxIncreaseKeepingSkyline([[3,0,8,4],[2,4,5,7],[9,2,6,3],[0,3,1,0]])) // 35
console.log(maxIncreaseKeepingSkyline([[0,0,0],[0,0,0],[0,0,0]])) // 0