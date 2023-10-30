// 1568. Minimum Number of Days to Disconnect Island
// You are given an m x n binary grid grid where 1 represents land and 0 represents water. An island is a maximal 4-directionally (horizontal or vertical) connected group of 1's.
// The grid is said to be connected if we have exactly one island, otherwise is said disconnected.
// In one day, we are allowed to change any single land cell (1) into a water cell (0).
// Return the minimum number of days to disconnect the grid.


// Solution: Three situations

// There are only three possible situations:
  // 1. There are no islands or has more than 1 island: return 0.
  // 2. If there can be more 1 island after changing one cell, return 1.
  // 3. Otherwise, return 2. You can always separate a corner of an island with 2 moves.

// Use dfs to count the number of islands.
// Backtrack to remove each 1-cell, then check if there is more than 1 island.

// Time Complexity: O(mn^2) 849ms
// Space Complexity: O(mn) 48.5MB
var minDays = function(grid) {
  let m = grid.length, n = grid[0].length;
  const directions = [[-1, 0], [0, 1], [1, 0], [0, -1]];
  if (isDisconnected()) return 0;
  
  for (let i = 0; i < m; i++) {
    for (let j = 0; j < n; j++) {
      if (grid[i][j] === 1) {
        grid[i][j] = 0;
        if (isDisconnected()) return 1;
        grid[i][j] = 1;
      }
    }
  }
  return 2;
  
  function isDisconnected() {
    let seen = new Set(), count = 0;
    for (let i = 0; i < m; i++) {
      for (let j = 0; j < n; j++) {
        if (grid[i][j] === 1 && !seen.has(`${i},${j}`)) {
          count++;
          if (count > 1) return true;
          dfs(seen, i, j);
        }
      }
    }
    return count === 0;
  }
  
  function dfs(seen, row, col) {
    seen.add(`${row},${col}`);
    for (let [x, y] of directions) {
      let newX = row + x, newY = col + y;
      if (newX < 0 || newX >= m || newY < 0 || newY >= n) continue;
      if (seen.has(`${newX},${newY}`) || grid[newX][newY] === 0) continue;
      dfs(seen, newX, newY);
    }
  }
};

// Two test cases
console.log(minDays([[0,1,1,0],[0,1,1,0],[0,0,0,0]])) // 2
console.log(minDays([[1,1]])) // 2