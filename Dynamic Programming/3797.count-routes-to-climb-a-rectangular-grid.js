// 3797. Count Routes to Climb a Rectangular Grid
// You are given a string array grid of size n, where each string grid[i] has length m. The character grid[i][j] is one of the following symbols:
  // '.': The cell is available.
  // '#': The cell is blocked.
// You want to count the number of different routes to climb grid. Each route must start from any cell in the bottom row (row n - 1) and end in the top row (row 0).
// However, there are some constraints on the route.
  // You can only move from one available cell to another available cell.
  // The Euclidean distance of each move is at most d, where d is an integer parameter given to you. The Euclidean distance between two cells (r1, c1), (r2, c2) is sqrt((r1 - r2)2 + (c1 - c2)2).
  // Each move either stays on the same row or moves to the row directly above (from row r to r - 1).
  // You cannot stay on the same row for two consecutive turns. If you stay on the same row in a move (and this move is not the last move), your next move must go to the row above.
// Return an integer denoting the number of such routes. Since the answer may be very large, return it modulo 109 + 7.


// Solution: DP w/ Prefix Sum

// Populate dp, where dp[i][j] = number of ways to get to cell (i, j).

// For each grid[i][j], use prefix sum of the row below (dp[i + 1]) to find the number of ways to reach grid[i][j].
  // Move to row above: Prefix sum of dp[i + 1][j - max range for dist d] to dp[i + 1][j + max range for dist d].
  // Stay on same row: Prefix sum of dp[i][j - d] tp dp[i][j + d].
// Compute prefix sum on the fly.

// To calculate the max range of the distance d, find the maximum distance j where euclidean distance of 1 + j^2 <= d.

// m = number of rows, n = number of columns
// Time Complexity: O(mn) 435ms
// Space Complexity: O(n) 78MB
function numberOfRoutes(grid, d) {
  const m = grid.length, n = grid[0].length;
  let prev = Array(n).fill(0).map((_, j) => grid[m - 1][j] === '.' ? 1 : 0);
  let prevPrefixSum = [0, ...prev];
  for (let j = 0; j < n; j++) {
    prevPrefixSum[j + 1] += prevPrefixSum[j];
  }
  const MOD = 1000000007;
  // stay on same row
  for (let j = 0; j < n; j++) {
    if (grid[m - 1][j] === '#') continue;
    prev[j] += getPrefixSum(prevPrefixSum, Math.max(0, j - d), Math.min(n - 1, j + d)) - prev[j];
  }
  prevPrefixSum = [0, ...prev];
  for (let j = 1; j <= n; j++) {
    prevPrefixSum[j] += prevPrefixSum[j - 1];
  }
  // find max range of d when moving to a new row
  let range = 0;
  for (let j = 0; j < n; j++) {
    const euclidDist = Math.sqrt(1 + j * j);
    if (euclidDist > d) break;
    range = j;
  }
  for (let i = m - 2; i >= 0; i--) {
    const curr = Array(n).fill(0);
    const currPrefixSum = Array(n + 1).fill(0);
    // row jump
    for (let j = 0; j < n; j++) {
      if (grid[i][j] === '#') {
        currPrefixSum[j + 1] = currPrefixSum[j];
        continue;
      }
      curr[j] = getPrefixSum(prevPrefixSum, Math.max(0, j - range), Math.min(n - 1, j + range));
      currPrefixSum[j + 1] = (currPrefixSum[j] + curr[j]) % MOD;
    }
    const currPrefixSum2 = Array(n + 1).fill(0);
    // stay on same row
    for (let j = 0; j < n; j++) {
      if (grid[i][j] === '#') {
        currPrefixSum2[j + 1] = currPrefixSum2[j];
        continue;
      }
      curr[j] += ((getPrefixSum(currPrefixSum, Math.max(0, j - d), Math.min(n - 1, j + d)) - curr[j]) + MOD) % MOD;
      currPrefixSum2[j + 1] = (currPrefixSum2[j] + curr[j]) % MOD;
    }
    prev = curr;
    prevPrefixSum = currPrefixSum2;
  }
  return prevPrefixSum[n];

  function getPrefixSum(prefixSum, start, end) {
    return ((prefixSum[end + 1] - prefixSum[start]) + MOD) % MOD;
  }
};

// Four test cases
console.log(numberOfRoutes(["..","#."], 1)) // 2
console.log(numberOfRoutes(["..","#."], 2)) // 4
console.log(numberOfRoutes(["#"], 750)) // 0
console.log(numberOfRoutes([".."], 1)) // 4