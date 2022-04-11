// 1260. Shift 2D Grid
// Given a 2D grid of size m x n and an integer k. You need to shift the grid k times.
// In one shift operation:
  // Element at grid[i][j] moves to grid[i][j + 1].
  // Element at grid[i][n - 1] moves to grid[i + 1][0].
  // Element at grid[m - 1][n - 1] moves to grid[0][0].
// Return the 2D grid after applying shift operation k times.


// Solution: Modulo

// i = current row, j = current column.
// Give each cell a position: i * number of columns + j. 
// Now that we have converted the row and column to a number, we can add k and modulo by m * n.
// To convert back to rows and columns, 
  // row: Math.floor(position / number of columns)
  // column: position % number of columns
// These coordinates denote the new coordinates for grid[i][j].

// m = number of rows, n = number of columns
// Time Complexity: O(mn) 120ms
// Space Complexity: O(1) (not including output) 47.5MB
var shiftGrid = function(grid, k) {
  let m = grid.length, n = grid[0].length, max = m * n;
  let res = Array(m).fill(0).map(() => Array(n));
  for (let i = 0; i < m; i++) {
    for (let j = 0; j < n; j++) {
      let pos = i * n + j;
      let nextPos = (pos + k) % max;
      let nextRow = Math.floor(nextPos / n), nextCol = nextPos % n;
      res[nextRow][nextCol] = grid[i][j];
    }
  }
  return res;
};

// Two test cases to run function on
console.log(shiftGrid([[1,2,3],[4,5,6],[7,8,9]], 1)) // [[9,1,2],[3,4,5],[6,7,8]]
console.log(shiftGrid([[3,8,1,9],[19,7,2,5],[4,6,11,10],[12,0,21,13]], 4)) // [[12,0,21,13],[3,8,1,9],[19,7,2,5],[4,6,11,10]]