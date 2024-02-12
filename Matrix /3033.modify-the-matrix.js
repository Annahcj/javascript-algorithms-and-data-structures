// 3033. Modify the Matrix
// Given a 0-indexed m x n integer matrix matrix, create a new 0-indexed matrix called answer. Make answer equal to matrix, then replace each element with the value -1 with the maximum element in its respective column.
// Return the matrix answer.


// Solution:

// Go through each column,
  // 1. Find the maximum value in the column.
  // 2. Populate the values to the result matrix - if -1, use the maximum value, otherwise use the original value.

// m = number of rows, n = number of columns
// Time Complexity: O(mn) 105ms
// Space Complexity: O(1) (excluding output) 54.8MB
var modifiedMatrix = function(matrix) {
  let m = matrix.length, n = matrix[0].length;
  let ans = Array(m).fill(0).map(() => Array(n));
  for (let j = 0; j < n; j++) {
    let maxVal = 0;
    for (let i = 0; i < m; i++) {
      maxVal = Math.max(maxVal, matrix[i][j]);
    }
    for (let i = 0; i < m; i++) {
      if (matrix[i][j] === -1) ans[i][j] = maxVal;
      else ans[i][j] = matrix[i][j];
    }
  }
  return ans;
};

// Two test cases
console.log(modifiedMatrix([[1,2,-1],[4,-1,6],[7,8,9]])) // [[1,2,9],[4,8,6],[7,8,9]]
console.log(modifiedMatrix([[3,-1],[5,2]])) // [[3,2],[5,2]]