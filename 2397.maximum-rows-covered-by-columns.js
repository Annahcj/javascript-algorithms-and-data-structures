// 2397. Maximum Rows Covered by Columns
// You are given a 0-indexed m x n binary matrix matrix and an integer numSelect, which denotes the number of distinct columns you must select from matrix.
// Let us consider s = {c1, c2, ...., cnumSelect} as the set of columns selected by you. A row row is covered by s if:
  // For each cell matrix[row][col] (0 <= col <= n - 1) where matrix[row][col] == 1, col is present in s or,
  // No cell in row has a value of 1.
// You need to choose numSelect columns such that the number of rows that are covered is maximized.
// Return the maximum number of rows that can be covered by a set of numSelect columns.


// Solution: Enumeration w/ Bitmasks

// Enumerate every combination of selected columns using bitmasks (1 to 2^n).
  // For each combination, count the number of rows where every matrix[row][col] = 1 is covered by the current selected columns.

// Small optimization: We don't need to consider cells with value of 0, so for each row, we can store the columns where matrix[row][col] = 1. This way, we don't have to unnecessarily go through every cell.

// m = number of rows, n = number of columns
// Time Complexity: O(2^n * mn) 135ms
// Space Complexity: O(mn) 44.8MB
var maximumRows = function(matrix, numSelect) {
  let m = matrix.length, n = matrix[0].length, ones = Array(m).fill(0).map(() => []);
  for (let i = 0; i < m; i++) {
    for (let j = 0; j < n; j++) {
      if (matrix[i][j] === 1) {
        ones[i].push(j); // store columns where matrix[row][col] = 1 
      }
    }
  }
  
  let ans = 0;
  for (let mask = 1; mask < (1 << n); mask++) {
    if (countOnes(mask) !== numSelect) continue; // we need to select exactly numSelect columns
    let rowsCovered = 0;
    for (let row = 0; row < m; row++) {
      let isCovered = true;
      for (let one of ones[row]) {
        let columnIsPresent = (mask >> one) & 1;
        if (!columnIsPresent) { // found a matrix[row][col] = 1 where col is not present in s
          isCovered = false;
          break;
        }
      }
      rowsCovered += isCovered ? 1 : 0;
    }
    ans = Math.max(ans, rowsCovered);
  }
  return ans;
};

function countOnes(num) {
  let ones = 0;
  while (num > 0) {
    ones += (num & 1);
    num >>= 1;
  }
  return ones;
}

// Two test cases
console.log(maximumRows([[0,0,0],[1,0,1],[0,1,1],[0,0,1]], 2)) // 3
console.log(maximumRows([[1],[0]], 1)) // 2