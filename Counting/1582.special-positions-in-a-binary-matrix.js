// 1582. Special Positions in a Binary Matrix
// Given an m x n binary matrix mat, return the number of special positions in mat.
// A position (i, j) is called special if mat[i][j] == 1 and all other elements in row i and column j are 0 (rows and columns are 0-indexed).


// Solution: Counting

// 1. Count the number of 1's in each row, and each column.
// 2. Go through each cell, and check:
  // a. The current cell if 1
  // b. The count of 1's in this row is 1
  // c. The count of 1's in this column is 1

// m = number of rows, n = number of columns
// Time Complexity: O(mn) 66ms
// Space Complexity: O(m + n) 44.7MB
var numSpecial = function(mat) {
  let m = mat.length, n = mat[0].length;
  let rowCount = Array(m).fill(0);
  let colCount = Array(n).fill(0);
  for (let i = 0; i < m; i++) {
    for (let j = 0; j < n; j++) {
      rowCount[i] += mat[i][j];
      colCount[j] += mat[i][j];
    }
  }
  let special = 0;
  for (let i = 0; i < m; i++) {
    for (let j = 0; j < n; j++) {
      if (mat[i][j] === 1 && rowCount[i] === 1 && colCount[j] === 1) {
        special++;
      }
    }
  }
  return special;
};

// Two test cases
console.log(numSpecial([[1,0,0],[0,0,1],[1,0,0]])) // 1
console.log(numSpecial([[1,0,0],[0,1,0],[0,0,1]])) // 3