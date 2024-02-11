// 1463. Cherry Pickup II
// You are given a rows x cols matrix grid representing a field of cherries where grid[i][j] represents the number of cherries that you can collect from the (i, j) cell.
// You have two robots that can collect cherries for you:
  // Robot #1 is located at the top-left corner (0, 0), and
  // Robot #2 is located at the top-right corner (0, cols - 1).
// Return the maximum number of cherries collection using both robots by following the rules below:
  // From a cell (i, j), robots can move to cell (i + 1, j - 1), (i + 1, j), or (i + 1, j + 1).
  // When any robot passes through a cell, It picks up all cherries, and the cell becomes an empty cell.
  // When both robots stay in the same cell, only one takes the cherries.
  // Both robots cannot move outside of the grid at any moment.
  // Both robots should reach the bottom row in grid.


// Solution: DP

// Memoize each dp(row, col1, col2), where
  // row = the current row
  // col1 = the previous column of robot #1
  // col2 = the previous column of robot #2

// For each dp(row, col1, col2), go through each possible combination of cells that the two robots can take from the current row.
// There are at most 9 different combinations (three positions for robot #1, three positions for robot #2)
// If both robots take the same cell, only count the cherries once.

// m = number of rows, n = number of columns
// Time Complexity: O(9mn^2) 109ms
// Space Complexity: O(mn^2) 55.4MB
var cherryPickup = function(grid) {
  let m = grid.length, n = grid[0].length;
  let memo = Array(m).fill(0).map(() => Array(n).fill(0).map(() => Array(n).fill(-1)));
  return grid[0][0] + grid[0][n - 1] + dp(1, 0, n - 1);
  
  function dp(row, col1, col2) {
    if (row === m) return 0;
    if (memo[row][col1][col2] !== -1) return memo[row][col1][col2];
    
    let maxCherries = 0;
    for (let nextCol1 = Math.max(0, col1 - 1); nextCol1 <= Math.min(n - 1, col1 + 1); nextCol1++) {
      for (let nextCol2 = Math.max(0, col2 - 1); nextCol2 <= Math.min(n - 1, col2 + 1); nextCol2++) {
        let cherries = nextCol1 === nextCol2 ? grid[row][nextCol1] : grid[row][nextCol1] + grid[row][nextCol2];
        maxCherries = Math.max(maxCherries, cherries + dp(row + 1, nextCol1, nextCol2));
      }
    }
    return memo[row][col1][col2] = maxCherries;
  }
};

// Two test cases 
console.log(cherryPickup([[3,1,1],[2,5,1],[1,5,5],[2,1,1]])) // 24
console.log(cherryPickup([[1,0,0,0,0,0,1],[2,0,0,0,0,3,0],[2,0,9,0,0,0,0],[0,3,0,5,4,0,0],[1,0,2,3,0,0,6]])) // 28