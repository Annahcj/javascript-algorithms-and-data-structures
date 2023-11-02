// 1765. Map of Highest Peak
// You are given an integer matrix isWater of size m x n that represents a map of land and water cells.
  // If isWater[i][j] == 0, cell (i, j) is a land cell.
  // If isWater[i][j] == 1, cell (i, j) is a water cell.
// You must assign each cell a height in a way that follows these rules:
  // The height of each cell must be non-negative.
  // If the cell is a water cell, its height must be 0.
  // Any two adjacent cells must have an absolute height difference of at most 1. A cell is adjacent to another cell if the former is directly north, east, south, or west of the latter (i.e., their sides are touching).
// Find an assignment of heights such that the maximum height in the matrix is maximized.
// Return an integer matrix height of size m x n where height[i][j] is cell (i, j)'s height. If there are multiple solutions, return any of them.


// Solution: Level by level BFS 

// Starting from each water cell, perform bfs level-by-level.
// The earliest time we reach a cell is the height of the cell.
// We only visit each cell once.

// m = number of rows, n = number of columns
// Time Complexity: O(mn) 1277ms
// Space Complexity: O(mn) 118.4MB
var highestPeak = function(isWater) {
  let m = isWater.length, n = isWater[0].length;
  let queue = [], grid = Array(m).fill(0).map(() => Array(n).fill(-1));
  for (let i = 0; i < m; i++) {
    for (let j = 0; j < n; j++) {
      if (isWater[i][j]) {
        queue.push([i, j]);
        grid[i][j] = 0;
      }
    }
  }
  
  let level = 0;
  const directions = [[0, 1], [1, 0], [0, -1], [-1, 0]];
  while (queue.length) {
    let next = [];
    while (queue.length) {
      let [row, col] = queue.pop();
      for (let [x, y] of directions) {
        let newRow = row + x, newCol = col + y;
        if (newRow < 0 || newRow >= m || newCol < 0 || newCol >= n || grid[newRow][newCol] > -1) continue; // out of bounds or visited
        grid[newRow][newCol] = level + 1;
        next.push([newRow, newCol]);
      }
    }
    level++;
    queue = next;
  }
  return grid;
};

// Two test cases
console.log(highestPeak([[0,1],[0,0]])) // [[1,0],[2,1]]
console.log(highestPeak([[0,0,1],[1,0,0],[0,0,0]])) // [[1,1,0],[0,1,1],[1,2,2]]