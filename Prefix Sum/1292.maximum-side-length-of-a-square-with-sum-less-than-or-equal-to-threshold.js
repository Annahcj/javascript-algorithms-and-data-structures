// 1292. Maximum Side Length of a Square with Sum Less than or Equal to Threshold
// Given a m x n matrix mat and an integer threshold, return the maximum side-length of a square with a sum less than or equal to threshold or return 0 if there is no such square.


// Solution: Prefix Sum & Binary Search

// Use 2D prefix sum to precompute the sum of each square in the matrix.
  // pSum[i][j] = sum of the rectangle with top left corner (0, 0) and bottom right corner (i, j).
  // pSum[i][j] = mat[i][j] + pSum[i - 1][j] + pSum[i][j - 1] - pSum[i - 1][j - 1]
  // To get the sum of rectangle with top left corner (r1, c1) and bottom right corner (r2, c2): pSum[r2][c2] - pSum[r2][c1 - 1] - pSum[r1 - 1][c2] + pSum[r1 - 1][c1 - 1]

// Notice that if a square of size x with a sum less than or equal to threshold exists, then any square with a size less than x will also exist.
// For this reason, we can use binary search to find the maximum size of a square.

// m = number of rows, n = number of columns
// Time Complexity: O(mn log(min(m, n))) 183ms
// Space Complexity: O(mn) 50.7MB
var maxSideLength = function(mat, threshold) {
  let m = mat.length, n = mat[0].length;
  let pSum = Array(m + 1).fill(0).map(() => Array(n + 1).fill(0));
  for (let i = 0; i < m; i++) {
    for (let j = 0; j < n; j++) {
      pSum[i + 1][j + 1] = mat[i][j] + pSum[i][j + 1] + pSum[i + 1][j] - pSum[i][j];
    } 
  }
  
  let k = Math.min(m, n);
  let low = 0, high = k;
  while (low < high) {
    let mid = Math.ceil((low + high) / 2);
    if (isEnough(mid)) low = mid;
    else high = mid - 1;
  }
  return low;
  
  function isEnough(size) {
    if (size === 0) return true;
    for (let i = 0; i <= m - size; i++) {
      for (let j = 0; j <= n - size; j++) {
        // left top corner: (i, j), right bottom corner: (i + size - 1, j + size - 1)
        let sum = getSum(i, j, i + size - 1, j + size - 1);
        if (sum <= threshold) return true;
      }
    }
    return false;
  }
  
  function getSum(r1, c1, r2, c2) {
    // bottom right - top left - bottom left + top left
    return pSum[r2 + 1][c2 + 1] - pSum[r2 + 1][c1] - pSum[r1][c2 + 1] + pSum[r1][c1];
  }
}; 

// Two test cases
console.log(maxSideLength([[1,1,3,2,4,3,2],[1,1,3,2,4,3,2],[1,1,3,2,4,3,2]], 4)) // 2
console.log(maxSideLength([[2,2,2,2,2],[2,2,2,2,2],[2,2,2,2,2],[2,2,2,2,2],[2,2,2,2,2]], 0)) // 0