// 3603. Minimum Cost Path with Alternating Directions II
// You are given two integers m and n representing the number of rows and columns of a grid, respectively.
// The cost to enter cell (i, j) is defined as (i + 1) * (j + 1).
// You are also given a 2D integer array waitCost where waitCost[i][j] defines the cost to wait on that cell.
// The path will always begin by entering cell (0, 0) on move 1 and paying the entrance cost.
// At each step, you follow an alternating pattern:
  // On odd-numbered seconds, you must move right or down to an adjacent cell, paying its entry cost.
  // On even-numbered seconds, you must wait in place for exactly one second and pay waitCost[i][j] during that second.
// Return the minimum total cost required to reach (m - 1, n - 1).

 
// Solution: DP

// Essentially, it's a classic DP problem.
// We always have to pay two costs to reach a cell, the entry cost and the wait cost.
// dp[i][j] = min(dp[i - 1][j] + costs, dp[i][j - 1] + costs).

// The exception is the first cell, at which we don't have to wait on.

// Time Complexity: O(mn) 97ms
// Space Complexity: O(mn) 93MB
function minCost(m, n, waitCost) {
  const dp = Array(m).fill(0).map(() => Array(n));
  dp[0][0] = 1;
  for (let i = 0; i < m; i++) {
    for (let j = 0; j < n; j++) {
      if (i === 0 && j === 0) continue;
      const up = i > 0 ? dp[i - 1][j] + getWaitCost(i - 1, j) : Infinity;
      const left = j > 0 ? dp[i][j - 1] + getWaitCost(i, j - 1) : Infinity;
      dp[i][j] = (i + 1) * (j + 1) + Math.min(up, left);
    }
  }
  return dp[m - 1][n - 1];

  function getWaitCost(row, col) {
    if (row === 0 && col === 0) {
      return 0;
    }
    return waitCost[row][col];
  }
};

// Three test cases
console.log(minCost(1, 2, [[1,2]])) // 3
console.log(minCost(2, 2, [[3,5],[2,4]])) // 9
console.log(minCost(2, 3, [[6,1,4],[3,2,5]])) // 16