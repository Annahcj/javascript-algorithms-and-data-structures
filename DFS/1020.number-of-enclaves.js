// 1020. Number of Enclaves
// You are given an m x n binary matrix grid, where 0 represents a sea cell and 1 represents a land cell.
// A move consists of walking from one land cell to another adjacent (4-directionally) land cell or walking off the boundary of the grid.
// Return the number of land cells in grid for which we cannot walk off the boundary of the grid in any number of moves.


// Solution: DFS

// Using DFS, mark any land cell connected to the boundary as 0.
// Then, count the number of remaining land cells.

// Time Complexity: O(mn) 100ms
// Space Complexity: O(mn) (space for recursive call stack) 57.7MB
var numEnclaves = function(grid) {
  let m = grid.length, n = grid[0].length;
  const directions = [[-1, 0], [0, 1], [1, 0], [0, -1]];
  for (let i = 0; i < m; i++) {
    if (grid[i][0] === 1) markAsWater(i, 0);
    if (grid[i][n - 1] === 1) markAsWater(i, n - 1);
  }
  for (let j = 0; j < n; j++) {
    if (grid[0][j] === 1) markAsWater(0, j);
    if (grid[m - 1][j] === 1) markAsWater(m - 1, j);
  }
  let ans = 0;
  for (let i = 0; i < m; i++) {
    for (let j = 0; j < n; j++) {
      ans += grid[i][j];
    }
  }
  return ans;
  
  function markAsWater(row, col) {
    grid[row][col] = 0;
    for (let [x, y] of directions) {
      let newRow = row + x, newCol = col + y;
      if (newRow < 0 || newRow >= m || newCol < 0 || newCol >= n || grid[newRow][newCol] === 0) continue;
      markAsWater(newRow, newCol);
    }
  }
};

// Two test cases
console.log(numEnclaves([[0,0,0,0],[1,0,1,0],[0,1,1,0],[0,0,0,0]])) // 3
console.log(numEnclaves([[0,1,1,0],[0,0,1,0],[0,0,1,0],[0,0,0,0]])) // 0