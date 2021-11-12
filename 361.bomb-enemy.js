// 361. Bomb Enemy
// Given an m x n matrix grid where each cell is either a wall 'W', an enemy 'E' or empty '0', return the maximum enemies you can kill using one bomb. You can only place the bomb in an empty cell.
// The bomb kills all the enemies in the same row and column from the planted point until it hits the wall since it is too strong to be destroyed.


// Solution: Dynamic Programming / Preprocessing

// For each cell, record the number of enemy cells on the
  // left
  // right
  // up
  // down
// of the cell

// keep these four properties for each cell
// in the end, we can find the cell with the maximum value of : left + right + up + down


// Time Complexity: O(nm) 252ms
// Space Complexity: O(nm) 78.4MB
var maxKilledEnemies = function(grid) {
  let n = grid.length, m = grid[0].length;
  let dp = new Array(n);
  for (var i = 0; i < n; i++) {
    dp[i] = new Array(m); 
    for (var j = 0; j < m; j++) dp[i][j] = new Cell();
  }
  for (i = 0; i < n; i++) {
    for (j = 0; j < m; j++) {
      // process left to right, top to bottom
      let prevLeft = j > 0 ? Math.max(dp[i][j - 1].left, 0) : 0;
      let prevUp = i > 0 ? Math.max(dp[i - 1][j].up, 0) : 0;
      if (grid[i][j] === 'E') {
        dp[i][j].left = prevLeft + 1;
        dp[i][j].up = prevUp + 1;
      }
      else if (grid[i][j] === '0') {
        dp[i][j].left = prevLeft;
        dp[i][j].up = prevUp;
      }
    }
  }
  let ans = 0;
  for (i = n - 1; i >= 0; i--) {
    for (j = m - 1; j >= 0; j--) {
      if (j === m - 1) dp[i][j].right = 0;
      if (i === n - 1) dp[i][j].down = 0;
      // process right to left - with delay of one
      let prevRight = j < m - 1 ? dp[i][j + 1].right : 0;
      if (j < m - 1) {
        if (grid[i][j + 1] === 'W') {
          dp[i][j].right = 0;
        } else {
          let rightValue = grid[i][j + 1] === 'E' ? 1 : 0;
          dp[i][j].right = prevRight + rightValue;
        }
      }
      // process bottom to top - with delay of one
      let prevDown = i < n - 1 ? dp[i + 1][j].down : 0;
      if (i < n - 1) {
        if (grid[i + 1][j] === 'W') {
          dp[i][j].down = 0;
        } else {
          let bottomValue = grid[i + 1][j] === 'E' ? 1 : 0;
          dp[i][j].down = prevDown + bottomValue;
        }
      }
      let left = Math.max(dp[i][j].left, 0), right = Math.max(dp[i][j].right, 0);
      let up = Math.max(dp[i][j].up, 0), down = Math.max(dp[i][j].down, 0);
      if (grid[i][j] === '0') ans = Math.max(ans, left + right + up + down);
    }
  }
  return ans;
};

class Cell {
  constructor() {
    this.left = -Infinity; // records number of enemy cells on the left including itself
    this.right = -Infinity; // records number of enemy cells on the right NOT including itself
    this.up = -Infinity; // records number of enemy cells above including itself
    this.down = -Infinity; // records number of enemy cells below NOT including itself
  }
}

// Three test cases to run function on
console.log(maxKilledEnemies([["W","E","E","E","E","0","E","E","E","E","E","W"]])) // 9
console.log(maxKilledEnemies([["0","E","0","0"],["E","0","W","E"],["0","E","0","0"]])) // 3
console.log(maxKilledEnemies([["W","W","W"],["0","0","0"],["E","E","E"]])) // 1