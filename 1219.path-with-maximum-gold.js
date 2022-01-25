// 1219. Path with Maximum Gold
// In a gold mine grid of size m x n, each cell in this mine has an integer representing the amount of gold in that cell, 0 if it is empty.
// Return the maximum amount of gold you can collect under the conditions:
  // Every time you are located in a cell you will collect all the gold in that cell.
  // From your position, you can walk one step to the left, right, up, or down.
  // You can't visit the same cell more than once.
  // Never visit a cell with 0 gold.
  // You can start and stop collecting gold from any position in the grid that has some gold.


// Solution: Backtracking

// k <= 25 = number of cells which contain gold
// Time Complexity: O(3^k) 194ms
// Space Complexity: O(k) (call stack) 40.7MB
var getMaximumGold = function(grid) {
  const directions = [[-1, 0], [0, 1], [1, 0], [0, -1]];
  let m = grid.length, n = grid[0].length;
  let ans = 0;
  for (var i = 0; i < m; i++) {
    for (var j = 0; j < n; j++) {
      if (grid[i][j] !== 0) ans = Math.max(ans, backtrack(i, j));
    }
  }
  return ans;
  
  function backtrack(row, col) {
    let ans = 0, currGold = grid[row][col];
    grid[row][col] = 0;
    for (var [x, y] of directions) {
      let newX = row + x, newY = col + y;
      if (newX < 0 || newX >= m || newY < 0 || newY >= n) continue;
      if (grid[newX][newY] !== 0) {
        ans = Math.max(ans, backtrack(newX, newY));
      }
    }
    grid[row][col] = currGold;
    return ans + currGold;
  }
};

// Two test cases to run function on
console.log(getMaximumGold([[0,6,0],[5,8,7],[0,9,0]])) // 24
console.log(getMaximumGold([[1,0,7],[2,0,6],[3,4,5],[0,3,0],[9,0,20]])) // 28