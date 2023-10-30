// 2482. Difference Between Ones and Zeros in Row and Column
// You are given a 0-indexed m x n binary matrix grid.
// A 0-indexed m x n difference matrix diff is created with the following procedure:
  // Let the number of ones in the ith row be onesRow[i].
  // Let the number of ones in the jth column be onesCol[j].
  // Let the number of zeros in the ith row be zerosRow[i].
  // Let the number of zeros in the jth column be zerosCol[j].
  // diff[i][j] = onesRow[i] + onesCol[j] - zerosRow[i] - zerosCol[j]
// Return the difference matrix diff.


// Solution: Simulation 

// Precompute onesRow and onesCol for each row and column in the grid.
// From onesRow and onesCol we can find the zerosRow and zerosCol by:
  // zerosRow = m - onesRow
  // zerosCol = n - onesCol

// m = number of rows, n = number of columns
// Time Complexity: O(mn) 796ms
// Space Complexity: O(mn) 116.4MB
var onesMinusZeros = function(grid) {
  let m = grid.length, n = grid[0].length;
  let onesRow = Array(m).fill(0);
  let onesCol = Array(n).fill(0);
  for (let i = 0; i < m; i++) {
    for (let j = 0; j < n; j++) {
      onesRow[i] += grid[i][j];
      onesCol[j] += grid[i][j];
    }
  }

  let diff = Array(m).fill(0).map(() => Array(n));
  for (let i = 0; i < m; i++) {
    for (let j = 0; j < n; j++) {
      let zerosRow = m - onesRow[i];
      let zerosCol = n - onesCol[j];
      diff[i][j] = onesRow[i] + onesCol[j] - zerosRow - zerosCol;
    }
  }
  return diff;
};

// Two test cases
console.log(onesMinusZeros([[0,1,1],[1,0,1],[0,0,1]])) // [[0,0,4],[0,0,4],[-2,-2,2]]
console.log(onesMinusZeros([[1,1,1],[1,1,1]])) // [[5,5,5],[5,5,5]]