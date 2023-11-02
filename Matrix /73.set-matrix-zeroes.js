// 73. Set Matrix Zeroes
// Given an m x n integer matrix matrix, if an element is 0, set its entire row and column to 0's, and return the matrix.
// You must do it in place.


// Solution: Mark First Cell of Row & Column as Flags

// Logic:
// Loop through each cell in matrix, if the cell is 0, mark the first cell of its row and column with 0.
// If matrix[i][j] === 0
// mark first cell of column: matrix[0][j] = 0
// mark first cell of row: matrix[i][0] = 0
// Then, loop through the matrix one more time, if either flag (column, row) is 0, mark cell as 0 too.

// Algorithm:
// Set two flags firstRow, firstColumn which we will use to check the first row and first column 
// (since we use them as flags, we can't know whether they actually should be turned into zero or not, so we need to check them separately)
// Loop through each row in matrix (pointer = i)
  // loop through each cell in matrix[i] (pointer = j)
    // If matrix[i][j] is 0,
      // if i is 0, mark firstRow as true (there is a zero in first row, so we will need to turn them into zeros at the end)
      // if j is 0, mark firstColumn as true (there is a zero in first column)
    // Mark the two flags:
    // mark matrix[0][j] as 0 (column)
    // mark matrix[i][0] as 0 (row)

// Loop through each row in matrix from 1 to end (can't modifty first row/column yet) (pointer = i)
  // loop through each cell in matrix[i]
    // If either matrix[0][j] is 0 or matrix[i][0] is 0, mark matrix[i][j] as 0.

// If firstColumn is true,
  // Loop through first column and mark each cell as 0.

// If firstRow is true,
  // Loop through first row and mark each cell as 0.


// Time Complexity: O(mn) 103ms
// Space Complexity: O(1) 40.9MB
  var setZeroes = function(matrix) {
    let firstRow = false, firstColumn = false;
    for (var i = 0; i < matrix.length; i++) {
      for (var j = 0; j < matrix[i].length; j++) {
        if (matrix[i][j] === 0) {
          if (i === 0) firstRow = true;
          if (j === 0) firstColumn = true;
          matrix[0][j] = 0;
          matrix[i][0] = 0;
        }
      }
    } 
    for (i = 1; i < matrix.length; i++) {
      for (j = 1; j < matrix[i].length; j++) {
        if (matrix[0][j] === 0 || matrix[i][0] === 0) matrix[i][j] = 0;
      }
    }
    if (firstColumn) {
      for (i = 0; i < matrix.length; i++) {
        matrix[i][0] = 0;
      }
    }
    if (firstRow) {
      for (var j = 0; j < matrix[0].length; j++) {
        matrix[0][j] = 0;
      }
    }
    // console.log for testing purposes only 
    console.log(matrix)
  };
  
  // Three test cases to run function on
  console.log(setZeroes([[1,3],[0,1],[2,1]])) // [[0,3],[0,0],[0,1]]
  console.log(setZeroes([[1,1,1],[1,0,1],[1,1,1]])) // [[1,0,1],[0,0,0],[1,0,1]]
  console.log(setZeroes([[0,1,2,0],[3,4,5,2],[1,3,1,5]])) // [[0,0,0,0],[0,4,5,0],[0,3,1,0]]