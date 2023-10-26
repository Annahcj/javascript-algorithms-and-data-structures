// 840. Magic Squares In Grid
// A 3 x 3 magic square is a 3 x 3 grid filled with distinct numbers from 1 to 9 such that each row, column, and both diagonals all have the same sum.
// Given a row x col grid of integers, how many 3 x 3 "magic square" subgrids are there?  (Each subgrid is contiguous).


// Solution: 

// Each row, column, and diagonals should have sum of 15.
// For each square, check these four conditions:
  // 1. Each number is within 1 to 9 and they are all unique.
  // 2. Each row has sum of 15.
  // 3. Each column has sum of 15.
  // 4. Diagonal and anti-diagonal has sum of 15.

// m = number of rows, n = number of columns
// Time Complexity: O(mn) 67ms
// Space Complexity: O(1) 42.2MB
var numMagicSquaresInside = function(grid) {
  let m = grid.length, n = grid[0].length, ans = 0;
  for (let i = 0; i < m - 2; i++) {
    for (let j = 0; j < n - 2; j++) {
      if (isOneToNine(i, j) && rowsSameSum(i, j) && colsSameSum(i, j) && diagonalsSameSum(i, j)) {
        ans++;
      }
    }
  }  
  return ans;
  
  function isOneToNine(i, j) {
    let set = new Set();
    for (let row = i; row <= i + 2; row++) {
      for (let col = j; col <= j + 2; col++) {
        if (grid[row][col] < 1 || grid[row][col] > 9) return false;
        set.add(grid[row][col]);
      }
    }
    return set.size === 9;
  }
  
  function rowsSameSum(i, j) {
    for (let row = i; row <= i + 2; row++) {
      let rowSum = 0;
      for (let col = j; col <= j + 2; col++) {
        rowSum += grid[row][col];
      }
      if (rowSum !== 15) return false;
    }
    return true;
  }
  
  function colsSameSum(i, j) {
    for (let col = j; col <= j + 2; col++) {
      let colSum = 0;
      for (let row = i; row <= i + 2; row++) {
        colSum += grid[row][col];
      }
      if (colSum !== 15) return false;
    }
    return true;
  }
  
  function diagonalsSameSum(i, j) {
    let diagonalSum = grid[i][j] + grid[i + 1][j + 1] + grid[i + 2][j + 2];
    let antiDiagonalSum = grid[i][j + 2] + grid[i + 1][j + 1] + grid[i + 2][j];
    return diagonalSum === 15 && antiDiagonalSum === 15;
  }
};

// Two test cases
console.log(numMagicSquaresInside([[4,3,8,4],[9,5,1,9],[2,7,6,2]])) // 1
console.log(numMagicSquaresInside([[8]])) // 0