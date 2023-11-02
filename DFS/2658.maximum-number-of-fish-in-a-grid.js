// 2658. Maximum Number of Fish in a Grid
// You are given a 0-indexed 2D matrix grid of size m x n, where (r, c) represents:
  // A land cell if grid[r][c] = 0, or
  // A water cell containing grid[r][c] fish, if grid[r][c] > 0.
// A fisher can start at any water cell (r, c) and can do the following operations any number of times:
  // Catch all the fish at cell (r, c), or
  // Move to any adjacent water cell.
// Return the maximum number of fish the fisher can catch if he chooses his starting cell optimally, or 0 if no water cell exists.
// An adjacent cell of the cell (r, c), is one of the cells (r, c + 1), (r, c - 1), (r + 1, c) or (r - 1, c) if it exists.


// Solution: DFS 

// For each connected group of water cells, it doesn't matter which cell we start at since the cells are all connected.
// Use DFS to find the maximum sum of each connected group of water cells.
// When we get to a water cell, set it to 0 so we don't revisit it.

// m = number of rows, n = number of columns
// Time Complexity: O(mn) 136ms
// Space Complexity: O(mn) 49.3MB
var findMaxFish = function(grid) {
  let m = grid.length, n = grid[0].length;
  const directions = [[-1, 0], [1, 0], [0, -1], [0, 1]];
  let maxSum = 0;
  for (let i = 0; i < m; i++) {
    for (let j = 0; j < n; j++) {
      if (grid[i][j] > 0) {
        maxSum = Math.max(maxSum, dfs(i, j));
      }
    }
  }
  return maxSum;
  
  function dfs(row, col) {
    let sum = grid[row][col];
    grid[row][col] = 0;
    for (let [x, y] of directions) {
      let newRow = row + x, newCol = col + y;
      if (newRow < 0 || newRow >= m || newCol < 0 || newCol >= n || grid[newRow][newCol] === 0) continue;
      sum += dfs(newRow, newCol);
    }
    return sum;
  }
};

// Two test cases
console.log(findMaxFish([[0,2,1,0],[4,0,0,3],[1,0,0,4],[0,3,2,0]])) // 7
console.log(findMaxFish([[1,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,1]])) // 1