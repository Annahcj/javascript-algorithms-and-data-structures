// 3418. Maximum Amount of Money Robot Can Earn
// You are given an m x n grid. A robot starts at the top-left corner of the grid (0, 0) and wants to reach the bottom-right corner (m - 1, n - 1). The robot can move either right or down at any point in time.
// The grid contains a value coins[i][j] in each cell:
  // If coins[i][j] >= 0, the robot gains that many coins.
  // If coins[i][j] < 0, the robot encounters a robber, and the robber steals the absolute value of coins[i][j] coins.
// The robot has a special ability to neutralize robbers in at most 2 cells on its path, preventing them from stealing coins in those cells.
// Note: The robot's total coins can be negative.
// Return the maximum profit the robot can gain on the route.


// Solution 1: DP - Recursion w/ Memoization

// Memoize each dp(i, j, k), where
  // i = current row
  // j = current column
  // k = number of times left we can neutralise

// For every dp(i, j, k), either go right or down, and either neutralise if it's negative, or don't.
// Take the maximum sum out of all options.

// m = number of rows, n = number of columns
// Time Complexity: O(3 * mn) 824ms
// Space Complexity: O(3 * mn) 94.43MB
var maximumAmount = function(coins) {
  const m = coins.length, n = coins[0].length;
  const memo = Array(m).fill(0).map(() => Array(n).fill(0).map(() => Array(3).fill(null)));
  return dp(0, 0, 2);

  function dp(i, j, k) {
    if (i === m) return j === n - 1 ? 0 : -Infinity;
    if (j === n) return i === m - 1 ? 0 : -Infinity;
    if (memo[i][j][k] !== null) return memo[i][j][k];

    let maxCoins = -Infinity;
    maxCoins = Math.max(maxCoins, coins[i][j] + dp(i + 1, j, k));
    if (coins[i][j] < 0 && k > 0) {
      maxCoins = Math.max(maxCoins, dp(i + 1, j, k - 1));
    }
    maxCoins = Math.max(maxCoins, coins[i][j] + dp(i, j + 1, k));
    if (coins[i][j] < 0 && k > 0) {
      maxCoins = Math.max(maxCoins, dp(i, j + 1, k - 1));
    } 
    return memo[i][j][k] = maxCoins;
  }
};


// Solution 2: Bottom Up Iterative DP

// Observe that we only need results from the previous row and current row.
// curr[j][k] = maximum profit reaching cell (current row, j), where k robbers have been neutralized.
// prev is the results from the previous row.

// For every coins[i][j], go through every amount of robbers that we neutralize (0 to 2).
// There are at most four scenarios, take the maximum out of the four:
  // 1. The path from directly above + not neutralizing 
  // 2. The path from directly above + neutralizing if k > 0 and coins[i][j] is negative.
  // 3. The path from directly left + not neutralizing.
  // 4. The path from directly left + neutralizing if k > 0 and coins[i][j] is negative.

// m = number of rows, n = number of columns
// Time Complexity: O(3 * mn) 347ms
// Space Complexity: O(3n) 77.58MB
var maximumAmount = function(coins) {
  const m = coins.length, n = coins[0].length;
  let prev = Array(n).fill(0).map(() => Array(3).fill(-Infinity));
  prev[0][0] = 0;
  for (let i = 0; i < m; i++) {
    const curr = Array(n).fill(0).map(() => Array(3).fill(-Infinity));
    for (let j = 0; j < n; j++) {
      for (let k = 0; k <= 2; k++) {
        curr[j][k] = Math.max(curr[j][k], coins[i][j] + prev[j][k]);
        if (coins[i][j] < 0 && k > 0) {
          curr[j][k] = Math.max(curr[j][k], prev[j][k - 1]);
        }
        if (j > 0) {
          curr[j][k] = Math.max(curr[j][k], coins[i][j] + curr[j - 1][k]);
          if (coins[i][j] < 0 && k > 0) {
            curr[j][k] = Math.max(curr[j][k], curr[j - 1][k - 1]);
          }
        }
      }
    }
    prev = curr;
  }
  return Math.max(...prev[n - 1]);
};

// Two test cases
console.log(maximumAmount([[0,1,-1],[1,-2,3],[2,-3,4]])) // 8
console.log(maximumAmount([[10,10,10],[10,10,10]])) // 40