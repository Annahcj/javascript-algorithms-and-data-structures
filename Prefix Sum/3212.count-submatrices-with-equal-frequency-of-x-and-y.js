// 3212. Count Submatrices With Equal Frequency of X and Y
// Given a 2D character matrix grid, where grid[i][j] is either 'X', 'Y', or '.', return the number of submatrices that contains:
  // grid[0][0]
  // an equal frequency of 'X' and 'Y'.
  // at least one 'X'.
  

// Solution: DP - Prefix Sum

// 2D prefix sum formula:
  // dp[i][j] = left sum + top sum - top left sum (because it was counted twice, in the left sum and top sum)
  // dp[i][j] = dp[i][j - 1] + dp[i - 1][j] - dp[i - 1][j - 1]

// Count the number of X's and Y's for each prefix submatrix and increment the count if the number of X's and Y's match and are greater than 0.

// m = number of rows, n = number of columns
// Time Complexity: O(mn) 267ms
// Space Complexity: O(mn) 95.5MB
var numberOfSubmatrices = function(grid) {
  let m = grid.length, n = grid[0].length;
  let x = Array(m + 1).fill(0).map(() => Array(n + 1).fill(0));
  let y = Array(m + 1).fill(0).map(() => Array(n + 1).fill(0));
  let count = 0;
  for (let i = 0; i < m; i++) {
    for (let j = 0; j < n; j++) {
      x[i + 1][j + 1] = (grid[i][j] === 'X' ? 1 : 0) + x[i + 1][j] + x[i][j + 1] - x[i][j];
      y[i + 1][j + 1] = (grid[i][j] === 'Y' ? 1 : 0) + y[i + 1][j] + y[i][j + 1] - y[i][j];
      if (x[i + 1][j + 1] > 0 && x[i + 1][j + 1] === y[i + 1][j + 1]) {
        count++;
      }
    }
  }
  return count;
};

// Two test cases
console.log(numberOfSubmatrices([["X","Y","."],["Y",".","."]])) // 3
console.log(numberOfSubmatrices([["X","X"],["X","Y"]])) // 0