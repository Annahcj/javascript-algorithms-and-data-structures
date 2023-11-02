// 1072. Flip Columns For Maximum Number of Equal Rows
// You are given an m x n binary matrix matrix.
// You can choose any number of columns in the matrix and flip every cell in that column (i.e., Change the value of the cell from 0 to 1 or vice versa).
// Return the maximum number of rows that have all values equal after some number of flips.


// Solution: Count Rows with Same Pattern

// Count number of rows with the same "pattern".
// 001 and 110 can be considered as the same pattern.

// For each row, find the number of other rows with the same pattern (including inverse).
// Keep track of rows we have already matched in a pattern so that we don't recompute rows for a pattern.
// Get the maximum number of rows with the same pattern.

// m = number of rows, n = number of columns
// Time Complexity: O(m^2 * n) 317ms
// Space Complexity: O(m) 51.1MB
var maxEqualRowsAfterFlips = function(matrix) {
  let m = matrix.length, n = matrix[0].length;
  let seen = Array(m).fill(0), ans = 0;
  for (let i = 0; i < m; i++) {
    if (seen[i]) continue; // already matched row i previously
    seen[i] = 1;
    let countSame = 1;
    for (let j = i + 1; j < m; j++) {
      // count number of other rows with the same pattern as row i
      if (isSamePattern(matrix[i], matrix[j])) {
        countSame++;
        seen[j] = 1;
      }
    }
    ans = Math.max(ans, countSame);
  }
  return ans;
  
  function isSamePattern(row1, row2) {
    let isInverse = row1[0] !== row2[0];
    for (let i = 0; i < n; i++) {
      if (isInverse && row1[i] === row2[i]) return false;
      if (!isInverse && row1[i] !== row2[i]) return false;
    }
    return true;
  }
};

// Three test cases
console.log(maxEqualRowsAfterFlips([[0,1],[1,1]])) // 1
console.log(maxEqualRowsAfterFlips([[0,1],[1,0]])) // 2
console.log(maxEqualRowsAfterFlips([[0,0,0],[0,0,1],[1,1,0]])) // 2