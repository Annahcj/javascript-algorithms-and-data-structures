// 1314. Matrix Block Sum
// Given a m x n matrix mat and an integer k, return a matrix answer where each answer[i][j] is the sum of all elements mat[r][c] for:
  // i - k <= r <= i + k,
  // j - k <= c <= j + k, and
  // (r, c) is a valid position in the matrix.


// Solution: Prefix Sum

// This article explains prefix sum for 2D arrays excellently: https://computersciencesource.wordpress.com/2010/09/03/computer-vision-the-integral-image/

// To calculate the prefix sum, where sum[i][j] = the sum of the rectangle with top left corner at [0][0] and bottom right corner at [i][j],
// the formula is: sum[i][j] = current cell value + left cell sum + top cell sum - top left cell sum.
  // the reason for subtracting the top left cell sum is because the left sum and top sum counts the top left sum twice, so we need to subtract one version.
// Because we will go out of bounds, set the matrix size to be [m + 1][n + 1], and offset each row and column by +1.
// This way, we can avoid dealing with going out of bounds.

// To get the sum of a rectangle within a range:
// The formula is: Bottom right corner - bottom left corner - top right corner + top left corner.
// The reason for adding the top left corner is because the top left corner was subtracted twice when subtracting the bottom left and top right corners, 
  // so we need to add one version back.

// Time Complexity: O(mn) 147ms
// Space Complexity: O(mm) 44.6MB
var matrixBlockSum = function(mat, k) {
  let m = mat.length, n = mat[0].length;
  let sum = Array(m + 1).fill(0).map(() => Array(n + 1).fill(0));
  let res = Array(m).fill(0).map(() => Array(n).fill(0));
  
  for (let i = 0; i < m; i++) {
    for (let j = 0; j < n; j++) {
      // fill sum[i + 1][j + 1] since we padded by 1 row and column
      sum[i + 1][j + 1] = mat[i][j] + sum[i + 1][j] + sum[i][j + 1] - sum[i][j];
    }
  }
  
  for (let i = 0; i < m; i++) {
    for (let j = 0; j < n; j++) {
      let row1 = Math.max(0, i - k), col1 = Math.max(0, j - k);
      let row2 = Math.min(m, i + k + 1), col2 = Math.min(n, j + k + 1);
      res[i][j] = sum[row2][col2] - sum[row2][col1] - sum[row1][col2] + sum[row1][col1];
    }
  }
  return res;
};

// Two test cases
console.log(matrixBlockSum([[1,2,3],[4,5,6],[7,8,9]], 1)) // [[12,21,16],[27,45,33],[24,39,28]]
console.log(matrixBlockSum([[1,2,3],[4,5,6],[7,8,9]], 2)) // [[45,45,45],[45,45,45],[45,45,45]]