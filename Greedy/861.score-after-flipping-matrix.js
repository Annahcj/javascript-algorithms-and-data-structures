// 861.score-after-flipping-matrix.js
// 861. Score After Flipping Matrix
// You are given an m x n binary matrix grid.
// A move consists of choosing any row or column and toggling each value in that row or column (i.e., changing all 0's to 1's, and all 1's to 0's).
// Every row of the matrix is interpreted as a binary number, and the score of the matrix is the sum of these numbers.
// Return the highest possible score after making any number of moves (including zero moves).


// Solution: Greedy

// Flipping rows and columns in a different order still ends up with the same result.
// There is no point flipping something more than once.

// It's optimal to make the first column entirely 1's, because that is the most significant bit and all other bits combined are less than the first bit.

// First, try to flip the rows.
  // We only want to flip the row if that makes the first cell (grid[i][0]) a 1.
  // After that, we should not touch the row again, because the first cell is the most significant bit.
// Then, try to flip the columns, in a greedy manner (if there are more 0s than 1s, flip the column).

// Why we don't need to flip the first column:
// e.g: If we flip the first column:
//    Grid A   Grid B
    // 0101     1101
    // 0001 ->  1001
    // 0101     1101
    // 1110     0110
// To turn the first column into all 1's:
  // Grid A needs to flip rows (0,1,2)
  // Grid B needs to flip rows (3)
  // The two grids will result in the same number of different values in each column after the first column has been transformed into all 1's via row flips. Hence, we don't need to consider flipping the first column.

// Time Complexity: O(mn) 65ms
// Space Complexity: O(1) 49MB
var matrixScore = function(grid) {
  let m = grid.length, n = grid[0].length;
  for (let i = 0; i < m; i++) {
    if (grid[i][0] === 0) {
      flipRow(grid, i);
    }
  }
  for (let j = 1; j < n; j++) {
    let ones = 0;
    for (let i = 0; i < m; i++) {
      ones += grid[i][j];
    }
    if (ones < m - ones) {
      flipCol(grid, j);
    }
  }
  let score = 0;
  for (let i = 0; i < m; i++) {
    score += grid[i].reduce((num, bit, index) => num | (bit << n - index - 1), 0);
  }
  return score;
};

function flipRow(grid, row) {
  for (let j = 0; j < grid[row].length; j++) {
    grid[row][j] = 1 ^ grid[row][j];
  }
}

function flipCol(grid, col) {
  for (let i = 0; i < grid.length; i++) {
    grid[i][col] = 1 ^ grid[i][col];
  }
}

// Two test cases
console.log(matrixScore([[0,0,1,1],[1,0,1,0],[1,1,0,0]])) // 39
console.log(matrixScore([[0]])) // 1