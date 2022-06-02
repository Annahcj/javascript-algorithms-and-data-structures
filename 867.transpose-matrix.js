// 867. Transpose Matrix
// Given a 2D integer array matrix, return the transpose of matrix.
// The transpose of a matrix is the matrix flipped over its main diagonal, switching the matrix's row and column indices.


// Solution: 

// Create a new matrix with the rows and columns swapped the other way around.

// Time Complexity: O(mn) 95ms
// Space Complexity: O(1) (not including output) 45MB
var transpose = function(matrix) {
  let m = matrix.length, n = matrix[0].length;
  let res = Array(n).fill(0).map(() => Array(m));
  for (let i = 0; i < m; i++) {
    for (let j = 0; j < n; j++) {
      res[j][i] = matrix[i][j];
    }
  }
  return res;
};

// Two test cases to run function on
console.log(transpose([[1,2,3],[4,5,6],[7,8,9]])) // [[1,4,7],[2,5,8],[3,6,9]]
console.log(transpose([[1,2,3],[4,5,6]])) // [[1,4],[2,5],[3,6]]