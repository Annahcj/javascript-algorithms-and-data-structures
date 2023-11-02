// 62. Unique Paths


// Solution: DP

// Populate dp[i][j] = the number of unique paths from (0, 0) to (i, j).
// Each dp[i][j] = paths from left cell + paths from above cell.
// Since we only need the values from the previous row and the current row, we can just use two rows to bring the space complexity down from O(mn) to O(n).

// Time Complexity: O(mn) 55ms
// Space Complexity: O(n) 42.3MB
var uniquePaths = function(m, n) {
  let prev = Array(n).fill(1); // only one way from all cells in the first row
  for (let i = 1; i < m; i++) {
    let curr = Array(n).fill(0);
    for (let j = 0; j < n; j++) {
      let left = j === 0 ? 0 : curr[j - 1];
      let up = prev[j];
      curr[j] = left + up;
    }
    prev = curr;
  }
  return prev[n - 1];
};

// Four test cases
console.log(uniquePaths(3, 7)) // 28
console.log(uniquePaths(3, 2)) // 3
console.log(uniquePaths(7, 3)) // 28
console.log(uniquePaths(3, 3)) // 6