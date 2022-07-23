// 959. Regions Cut By Slashes
// An n x n grid is composed of 1 x 1 squares where each 1 x 1 square consists of a '/', '\', or blank space ' '. These characters divide the square into contiguous regions.
// Given the grid grid represented as a string array, return the number of regions.
// Note that backslash characters are escaped, so a '\' is represented as '\\'.

 
// Solution: Magnify Grid & DFS

// Turn "/" into 
// 1 0 0
// 0 1 0
// 0 0 1

// and turn "\" into
// 0 0 1
// 0 1 0
// 1 0 0

// 1. Magnify the grid by 3 times (minimum amount to distinguish between connected regions).
// 2. Recursively DFS on the magnified grid to count the number of regions.

// Time Complexity: O(n^2) 128ms
// Space Complexity: O(n^2) 47.8MB
var regionsBySlashes = function(original) {
  let n = original.length;
  let grid = Array(n * 3).fill(0).map(() => Array(n * 3).fill(0));
  
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < n; j++) {
      if (original[i][j] === '\\') {
        grid[i * 3][j * 3] = 1;
        grid[i * 3 + 1][j * 3 + 1] = 1;
        grid[i * 3 + 2][j * 3 + 2] = 1;
      } else if (original[i][j] === '/') {
        grid[i * 3][j * 3 + 2] = 1;
        grid[i * 3 + 1][j * 3 + 1] = 1;
        grid[i * 3 + 2][j * 3] = 1;
      }
    }
  }
  
  const directions = [[-1, 0], [0, 1], [1, 0], [0, -1]];
  let ans = 0;
  for (let i = 0; i < n * 3; i++) {
    for (let j = 0; j < n * 3; j++) {
      if (dfs(i, j) > 0) ans++;
    }
  }
  return ans;
  
  function dfs(row, col) {
    if (row < 0 || row >= n * 3 || col < 0 || col >= n * 3 || grid[row][col] === 1) return 0;
    grid[row][col] = 1;
    let count = 0;
    for (let [x, y] of directions) {
      let newX = row + x, newY = col + y;
      count += dfs(newX, newY);
    }
    return count + 1;
  }
};

// Two test cases to run function on
console.log(regionsBySlashes([" /","/ "])) // 2
console.log(regionsBySlashes(["/\\","\\/"])) // 5