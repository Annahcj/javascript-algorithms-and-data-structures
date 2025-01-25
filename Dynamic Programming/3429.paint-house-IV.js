// 3429. Paint House IV
// You are given an even integer n representing the number of houses arranged in a straight line, and a 2D array cost of size n x 3, where cost[i][j] represents the cost of painting house i with color j + 1.
// The houses will look beautiful if they satisfy the following conditions:
  // No two adjacent houses are painted the same color.
  // Houses equidistant from the ends of the row are not painted the same color. For example, if n = 6, houses at positions (0, 5), (1, 4), and (2, 3) are considered equidistant.
// Return the minimum cost to paint the houses such that they look beautiful.


// Solution: DP - Recursion w/ Memoization

// To satisfy the second condition, we need to choose the equidistant house colors at the same time.

// Memoize every dp(i, prevLeft, prevRight), where
  // i = current house index
  // prevLeft = color of previous house at index i - 1
  // prevRight = color of previous house at index n - i - 1

// For every dp(i, prevLeft, prevRight),
  // Try every combination of two different colors, that are not the same color as the previous colors on both sides.
  // There are 6 combinations.
// Record and return the minimum cost out of all cases.

// Time Complexity: O(36n) 493ms
// Space Complexity: O(6n) 121.7MB
var minCost = function(n, cost) {
  const memo = Array(n / 2).fill(0).map(() => Array(3).fill(0).map(() => Array(3).fill(-1)));
  return dp(0, 0, 0);

  function dp(i, prevLeft, prevRight) {
    if (i === n / 2) return 0;
    if (memo[i][prevLeft][prevRight] !== -1) return memo[i][prevLeft][prevRight];

    let minCost = Infinity;
    for (let l = 0; l < 3; l++) {
      if (i > 0 && l === prevLeft) continue;
      for (let j of allowedColorsMap[l]) {
        if (i > 0 && j === prevRight) continue;
        minCost = Math.min(minCost, cost[i][l] + cost[n - i - 1][j] + dp(i + 1, l, j));
      }
    }
    return memo[i][prevLeft][prevRight] = minCost;
  }
};

const allowedColorsMap = {
  0: [1, 2],
  1: [0, 2],
  2: [0, 1]
};

// Two test cases
console.log(minCost(4, [[3,5,7],[6,2,9],[4,8,1],[7,3,5]])) // 9
console.log(minCost(6, [[2,4,6],[5,3,8],[7,1,9],[4,6,2],[3,5,7],[8,2,4]])) // 18