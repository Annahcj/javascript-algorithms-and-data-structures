// 463. Island Perimeter
// You are given row x col grid representing a map where grid[i][j] = 1 represents land and grid[i][j] = 0 represents water.
// Grid cells are connected horizontally/vertically (not diagonally). The grid is completely surrounded by water, and there is exactly one island (i.e., one or more connected land cells).
// The island doesn't have "lakes", meaning the water inside isn't connected to the water around the island. One cell is a square with side length 1. The grid is rectangular, width and height don't exceed 100. Determine the perimeter of the island.


// Solution: Counting

// For each land cell, go through each four directions (top, left, right, bottom), and count the number of sides connected to either water or the edge of the grid.
// Get the total sum of these water/edge sides across all land cells.

// Time Complexity: O(4mn) 97ms
// Space Complexity: O(1) 59.3MB
var islandPerimeter = function(grid) {
  let m = grid.length, n = grid[0].length;
  const directions = [[-1, 0], [0, 1], [1, 0], [0, -1]];
  let perimeter = 0;
  for (let i = 0; i < m; i++) {
    for (let j = 0; j < n; j++) {
      if (grid[i][j] === 0) continue;
      for (let [x, y] of directions) {
        let neiRow = i + x, neiCol = j + y;
        if (neiRow < 0 || neiRow >= m || neiCol < 0 || neiCol >= n || grid[neiRow][neiCol] === 0) {
          perimeter++;
        }
      }
    }
  }
  return perimeter;
};

// Three test cases
console.log(islandPerimeter([[0,1,0,0],[1,1,1,0],[0,1,0,0],[1,1,0,0]])) // 16
console.log(islandPerimeter([[1]])) // 4
console.log(islandPerimeter([[1,0]])) // 4