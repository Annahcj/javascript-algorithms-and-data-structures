// 1074. Number of Submatrices That Sum to Target
// Given a matrix and a target, return the number of non-empty submatrices that sum to target.
// A submatrix x1, y1, x2, y2 is the set of all cells matrix[x][y] with x1 <= x <= x2 and y1 <= y <= y2.
// Two submatrices (x1, y1, x2, y2) and (x1', y1', x2', y2') are different if they have some coordinate that is different: for example, if x1 != x1'.


// Solution: 2D Prefix Sum & Hashmap

// Get the prefix sums for the matrix, where sum[i][j] = sum of the rectangle where the top left corner is [0][0] and bottom right corner is [i][j].
// The formula is: sum[i][j] = current cell value + left cell sum + top cell sum - top left cell sum.
  // the reason for subtracting the top left cell sum is because the left sum and top sum counts the top left sum twice, so we need to subtract one version.
// Because we will go out of bounds, set the matrix size to be [m + 1][n + 1], and offset each row and column by +1.
// This way, we can avoid dealing with going out of bounds.

// To get the number of submatrices with a sum equal to target,
// we need to have three nested loops:
  // row1
    // row2
      // column

// row1 indicates the top edge of the rectangle, and row2 indicates the bottom edge.
// The column indicates the right edge of the rectangle.
// The left edge is always the column 0.

// Then, we can use a hashmap to keep the previous sums, similar to the problem 2Sum.
// To get the sum of the current rectangle, subtract sum[row1 - 1][col] from sum[row2][col].
// Get the number of previous sums are equal to currSum - target and add it to the count.
// Then, add an occurance count of the currSum to the hashmap.

// m = number of rows, n = number of columns
// Time Complexity: O(m^2 * n) 416ms
// Space Complexity: O(mn) 50MB
var numSubmatrixSumTarget = function(matrix, target) {
  let m = matrix.length, n = matrix[0].length;
  let sum = Array(m + 1).fill(0).map(() => Array(n + 1).fill(0));
  for (let i = 0; i < m; i++) {
    for (let j = 0; j < n; j++) {
      sum[i + 1][j + 1] = matrix[i][j] + sum[i + 1][j] + sum[i][j + 1] - sum[i][j];
    }
  }
  
  let ans = 0;
  for (let row1 = 1; row1 <= m; row1++) {
    for (let row2 = row1; row2 <= m; row2++) {
      let map = new Map();
      map.set(0, 1); // case when rectangle with left edge at column 0 has a sum equal to target
      for (let col = 1; col <= n; col++) {
        let currSum = sum[row2][col] - sum[row1 - 1][col];
        ans += map.get(currSum - target) || 0;
        map.set(currSum, (map.get(currSum) || 0) + 1);
      }
    }
  }
  return ans;
};

// Two test cases to run function on
console.log(numSubmatrixSumTarget([[0,1,0],[1,1,1],[0,1,0]], 0)) // 4
console.log(numSubmatrixSumTarget([[1,-1],[-1,1]], 0)) // 5