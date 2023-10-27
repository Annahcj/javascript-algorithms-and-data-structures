// 1254. Number of Closed Islands
// Given a 2D grid consists of 0s (land) and 1s (water).  An island is a maximal 4-directionally connected group of 0s and a closed island is an island totally (all left, top, right, bottom) surrounded by 1s.
// Return the number of closed islands.


// Solution: DFS

// Any land connected to an edge of the grid is not part of an island.
// Recursively DFS to turn all land connected to an edge of the grid into water. We are essentially isolating the closed islands.
// Recursively DFS to find all closed islands.

// Time Complexity: O(mn) 124ms
// Space Complexity: O(1) 47.1MB
var closedIsland = function(grid) {
  let m = grid.length, n = grid[0].length;
  for (let i = 0; i < m; i++) {
    if (grid[i][0] === 0) turnToLand(i, 0);
    if (grid[i][n - 1] === 0) turnToLand(i, n - 1);
  }
  for (let j = 0; j < n; j++) {
    if (grid[0][j] === 0) turnToLand(0, j);
    if (grid[m - 1][j] === 0) turnToLand(m - 1, j);
  }
  
  let count = 0;
  for (let i = 0; i < m; i++) {
    for (let j = 0; j < n; j++) {
      if (grid[i][j] === 0) {
        turnToLand(i, j);
        count++;
      }
    }
  }
  return count;
  
  function turnToLand(row, col) {    
    grid[row][col] = 1;
    const directions = [[-1, 0], [0, 1], [1, 0], [0, -1]];
    for (let [x, y] of directions) {
      let newX = row + x, newY = col + y;
      if (newX < 0 || newX >= m || newY < 0 || newY >= n || grid[newX][newY] === 1) continue;
      turnToLand(newX, newY);
    }
  }
};

// Two test cases 
console.log(closedIsland([[1,1,1,1,1,1,1,0],[1,0,0,0,0,1,1,0],[1,0,1,0,1,1,1,0],[1,0,0,0,0,1,0,1],[1,1,1,1,1,1,1,0]])) // 2
console.log(closedIsland([[0,0,1,0,0],[0,1,0,1,0],[0,1,1,1,0]])) // 1