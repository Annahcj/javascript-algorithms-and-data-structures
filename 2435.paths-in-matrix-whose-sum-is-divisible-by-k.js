// 2435. Paths in Matrix Whose Sum Is Divisible by K
// You are given a 0-indexed m x n integer matrix grid and an integer k. You are currently at position (0, 0) and you want to reach position (m - 1, n - 1) moving only down or right.
// Return the number of paths where the sum of the elements on the path is divisible by k. Since the answer may be very large, return it modulo 10^9 + 7.


// Solution: DP - Recursion w/ Memoization

// We don't need to keep track of the entire sum, only the remainder after dividing by k (sum % k).
// Memoize each dp(i, j, sumMod), where
  // i = current row
  // j = current column 
  // sumMod = the current sum % k

// When we reach the grid[m - 1][n - 1], if the remainder of the sum is 0, we have found a valid path.
// Count the number of valid paths starting from grid[0][0].

// Time Complexity: O(m * n * k) 906ms
// Space Complexity: O(m * n * k) 92.6MB
var numberOfPaths = function(grid, k) {
  let m = grid.length, n = grid[0].length, MOD = 10 ** 9 + 7;
  let memo = Array(m).fill(0).map(() => Array(n).fill(0).map(() => Array(k).fill(-1)));
  return dfs(0, 0, grid[0][0] % k);

  function dfs(i, j, sumMod) {
    if (i === m - 1 && j === n - 1) return sumMod === 0 ? 1 : 0;
    if (memo[i][j][sumMod] !== -1) return memo[i][j][sumMod];

    let paths = [[i + 1, j], [i, j + 1]], ways = 0;
    for (let [x, y] of paths) {
      if (x < 0 || x >= m || y < 0 || y >= n) continue;
      ways = (ways + dfs(x, y, (sumMod + grid[x][y]) % k)) % MOD;
    }
    return memo[i][j][sumMod] = ways;
  }
};

// Three test cases
console.log(numberOfPaths([[5,2,4],[3,0,5],[0,7,2]], 3)) // 2
console.log(numberOfPaths([[0,0]], 5)) // 1
console.log(numberOfPaths([[7,3,4,9],[2,3,6,2],[2,3,7,0]], 1)) // 10