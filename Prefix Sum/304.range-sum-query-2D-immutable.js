// 304. Range Sum Query 2D - Immutable
// Given a 2D matrix matrix, handle multiple queries of the following type:
  // Calculate the sum of the elements of matrix inside the rectangle defined by its upper left corner (row1, col1) and lower right corner (row2, col2).
// Implement the NumMatrix class:
  // NumMatrix(int[][] matrix) Initializes the object with the integer matrix matrix.
  // int sumRegion(int row1, int col1, int row2, int col2) Returns the sum of the elements of matrix inside the rectangle defined by its upper left corner (row1, col1) and lower right corner (row2, col2).


// Solution: 2D Prefix Sum

// Prefix sum over the matrix, where sum[i][j] = sum of the rectangle with left top corner at [0][0] and bottom right corner at [i][j].
// Note: Offset each row and column by +1 so that we don't have to deal with going out of bounds.

// Time Complexity: 644ms
  // initialization: O(mn)
  // sumRegion: O(1)
// Space Complexity: O(mn) 84.4MB
var NumMatrix = function(matrix) {
  let m = matrix.length, n = matrix[0].length;
  this.sum = Array(m + 1).fill(0).map(() => Array(n + 1).fill(0));
  for (let i = 0; i < m; i++) {
    for (let j = 0; j < n; j++) {
      // left corner counted twice, remove from total sum
      this.sum[i + 1][j + 1] = matrix[i][j] + this.sum[i + 1][j] + this.sum[i][j + 1] - this.sum[i][j];
    }
  }
};

NumMatrix.prototype.sumRegion = function(row1, col1, row2, col2) {
  // right bottom corner - left bottom corner - right top corner + left top corner (left corner subtracted twice, add one back)
  return this.sum[row2 + 1][col2 + 1] - this.sum[row2 + 1][col1] - this.sum[row1][col2 + 1] + this.sum[row1][col1];
};

// A few test cases
let numMatrix = new NumMatrix([[3, 0, 1, 4, 2], [5, 6, 3, 2, 1], [1, 2, 0, 1, 5], [4, 1, 0, 1, 7], [1, 0, 3, 0, 5]]);
console.log(numMatrix.sumRegion(2, 1, 4, 3)); // return 8 (i.e sum of the red rectangle)
console.log(numMatrix.sumRegion(1, 1, 2, 2)); // return 11 (i.e sum of the green rectangle)
console.log(numMatrix.sumRegion(1, 2, 2, 4)); // return 12 (i.e sum of the blue rectangle)