// 1895. Largest Magic Square
// A k x k magic square is a k x k grid filled with integers such that every row sum, every column sum, and both diagonal sums are all equal. The integers in the magic square do not have to be distinct. Every 1 x 1 grid is trivially a magic square.
// Given an m x n integer grid, return the size (i.e., the side length k) of the largest magic square that can be found within this grid.


// Solution: Brute Force & Prefix Sum

// Precompute the prefix sums for every row and column:
  // rowSum[i][j] = sum of integers on row i from column 0 to column j.
  // colSum[i][j] = sum of integers on column i from row 0 to column j.
// Then, to get the sum of row i between columns j and j + k - 1, we can do: rowSum[i][j + k] - rowSum[i][j]
// And the same goes for the column sums.

// Go through each k (minimum of (m, n))
  // Go through every possible square of size k
  // Use the prefix row and column sums to get the sum of each row and column.
  // Calculate the diagonal sums using a simulation approach.
  // Return the maximum k where we find a magic square.

// m = number of rows, n = number of columns
// Time Complexity: O(min(m, n) * mn * (m + n)) 126ms
// Space Complexity: O(mn) 48.4MB
var largestMagicSquare = function(grid) {
  let m = grid.length, n = grid[0].length;
  // precompute the prefix sums for each row and column
  let rowSum = Array(m).fill(0).map(() => Array(n + 1).fill(0));
  for (let i = 0; i < m; i++) {
    for (let j = 0; j < n; j++) {
      rowSum[i][j + 1] = grid[i][j] + rowSum[i][j];
    }
  }
  let colSum = Array(n).fill(0).map(() => Array(m + 1).fill(0));
  for (let j = 0; j < n; j++) {
    for (let i = 0; i < m; i++) {
      colSum[j][i + 1] = grid[i][j] + colSum[j][i];
    }
  }
  
  for (let k = Math.min(m, n); k > 0; k--) {
    for (let i = 0; i + k <= m; i++) {
      for (let j = 0; j + k <= n; j++) {
        let rowAndColumnSum = getRowAndColumnSum(i, j, k);
        if (rowAndColumnSum === -1) continue; // row and column sums are not all equal
        let diagonalSum = getDiagonalSum(i, j, k);
        if (diagonalSum === rowAndColumnSum) return k;
      }
    }
  }
  
  function getRowAndColumnSum(startRow, startColumn, k) {
    let prevSum = -1;
    for (let i = startRow; i < startRow + k; i++) {
      let sum = rowSum[i][startColumn + k] - rowSum[i][startColumn];
      if (prevSum !== -1 && sum !== prevSum) return -1; // row sums are not all equal
      prevSum = sum;
    }
    
    for (let j = startColumn; j < startColumn + k; j++) {
      let sum = colSum[j][startRow + k] - colSum[j][startRow];
      if (prevSum !== -1 && sum !== prevSum) return -1; // sums are not all equal
      prevSum = sum;
    }
    return prevSum;
  }
  
  function getDiagonalSum(startRow, startColumn, k) {
    let diagonalSum = 0;
    for (let i = startRow, j = startColumn; i < startRow + k; i++, j++) {
      diagonalSum += grid[i][j];
    }
    
    let antiDiagonalSum = 0;
    for (let i = startRow, j = startColumn + k - 1; i < startRow + k; i++, j--) {
      antiDiagonalSum += grid[i][j];
    }
    return diagonalSum === antiDiagonalSum ? diagonalSum : -1;
  }
};

// Two test cases
console.log(largestMagicSquare([[7,1,4,5,6],[2,5,1,6,4],[1,5,4,3,2],[1,2,7,3,4]])) // 3
console.log(largestMagicSquare([[5,1,3,1],[9,3,3,1],[1,3,3,8]])) // 2