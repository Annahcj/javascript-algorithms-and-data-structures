// 200. Number of Islands
// Given an m x n 2D binary grid grid which represents a map of '1's (land) and '0's (water), return the number of islands.
// An island is surrounded by water and is formed by connecting adjacent lands horizontally or vertically. You may assume all four edges of the grid are all surrounded by water.


// Solution: DFS

// Use recursive DFS to traverse all the islands and mark them as water, so that we avoid revisiting an island.
// Note: We modify the input here, but to avoid that we can use an additional matrix to keep track of which cells have been visited.

// Time Complexity: O(mn) 78ms
// Space Complexity: O(1) 58.4MB
var numIslands = function(grid) {
  let m = grid.length, n = grid[0].length;
  let islands = 0;
  for (let i = 0; i < m; i++) {
    for (let j = 0; j < n; j++) {
      if (grid[i][j] === '1') {
        islands++;
        traverseIsland(grid, i, j);
      }
    }
  }
  return islands;
};

function traverseIsland(grid, row, col) {
  const directions = [[-1, 0], [0, 1], [1, 0], [0, -1]];
  grid[row][col] = '0';
  for (let [x, y] of directions) {
    let newRow = row + x, newCol = col + y;
    if (newRow < 0 || newRow >= grid.length || newCol < 0 || newCol >= grid[0].length) continue;
    if (grid[newRow][newCol] === '1') {
      traverseIsland(grid, newRow, newCol);
    }
  }
}

// Two test cases
console.log(numIslands([["1","1","1","1","0"],["1","1","0","1","0"],["1","1","0","0","0"],["0","0","0","0","0"]])) // 1
console.log(numIslands([["1","1","0","0","0"],["1","1","0","0","0"],["0","0","1","0","0"],["0","0","0","1","1"]])) // 3