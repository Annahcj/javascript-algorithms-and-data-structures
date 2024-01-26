// 576. Out of Boundary Paths
// There is an m x n grid with a ball. The ball is initially at the position [startRow, startColumn]. You are allowed to move the ball to one of the four adjacent cells in the grid (possibly out of the grid crossing the grid boundary). You can apply at most maxMove moves to the ball.
// Given the five integers m, n, maxMove, startRow, startColumn, return the number of paths to move the ball out of the grid boundary. Since the answer can be very large, return it modulo 109 + 7.


// Solution: DP

// Memoize each dp(i, j, k), where
  // i = the current row
  // j = the current column
  // k = the number of moves remaining

// For each dp(i, j, k), try to move to the four adjacent cells and count the number of paths that end up crossing the boundary.

// Time Complexity: O(4mnk) 77ms
// Space Complexity: O(mnk) 52.7MB
var findPaths = function(m, n, maxMove, startRow, startColumn) {
  const directions = [[-1, 0], [0, 1], [1, 0], [0, -1]];
  let memo = Array(m).fill(0).map(() => Array(n).fill(0).map(() => Array(maxMove + 1).fill(-1)));
  let MOD = 1000000007;
  return dp(startRow, startColumn, maxMove);
  
  function dp(i, j, k) {
    if (i < 0 || j < 0 || i === m || j === n) return 1;
    if (k === 0) return 0;
    if (memo[i][j][k] !== -1) return memo[i][j][k];
    
    let ways = 0;
    for (let [x, y] of directions) {
      let newRow = i + x, newCol = j + y;
      ways = (ways + dp(newRow, newCol, k - 1)) % MOD;
    }
    return memo[i][j][k] = ways;
  }
};

// Two test cases
console.log(findPaths(2, 2, 2, 0, 0)) // 6
console.log(findPaths(1, 3, 3, 0, 1)) // 12