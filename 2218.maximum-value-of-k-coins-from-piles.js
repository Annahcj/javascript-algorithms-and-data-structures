// 2218. Maximum Value of K Coins From Piles
// There are n piles of coins on a table. Each pile consists of a positive number of coins of assorted denominations.
// In one move, you can choose any coin on top of any pile, remove it, and add it to your wallet.
// Given a list piles, where piles[i] is a list of integers denoting the composition of the ith pile from top to bottom, and a positive integer k, return the maximum total value of coins you can have in your wallet if you choose exactly k coins optimally.


// Solution: Knapsack - DP

// dp[i][k] = maximum sum of taking k coins from the first i piles.

// For each pile, try taking from 0 to k of the top coins from it.
// Memoize the results in a 2D matrix to save time.

// Time Complexity: O(nk^2) 377ms
// Space Complexity: O(nk) 53.6MB
var maxValueOfCoins = function(piles, k) {
  let n = piles.length, dp = Array(n).fill(0).map(() => Array(k + 1).fill(-1));
  return dfs(0, k);

  function dfs(idx, k) {
    if (idx === n || k === 0) return 0;
    if (dp[idx][k] !== -1) return dp[idx][k];
    let sum = 0;
    for (let j = 0; j <= Math.min(k, piles[idx].length); j++) {
      dp[idx][k] = Math.max(dp[idx][k], dfs(idx + 1, k - j) + sum);
      if (j < piles[idx].length) sum += piles[idx][j];
    }
    return dp[idx][k];
  }
};

// Two test cases to run function on
console.log(maxValueOfCoins([[1,100,3],[7,8,9]], 2)) // 101
console.log(maxValueOfCoins([[100],[100],[100],[100],[100],[100],[1,1,1,1,1,1,700]], 7)) // 706