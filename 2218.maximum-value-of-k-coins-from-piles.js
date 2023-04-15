// 2218. Maximum Value of K Coins From Piles
// There are n piles of coins on a table. Each pile consists of a positive number of coins of assorted denominations.
// In one move, you can choose any coin on top of any pile, remove it, and add it to your wallet.
// Given a list piles, where piles[i] is a list of integers denoting the composition of the ith pile from top to bottom, and a positive integer k, return the maximum total value of coins you can have in your wallet if you choose exactly k coins optimally.


// Solution 1: Knapsack DP - Recursion w/ Memoization

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

// Solution 2: Bottom Up DP

// dp[i][j] = maximum sum taking j coins from the first i piles
// For each piles[i], populate each dp[i][j] (go through each j from 0 to k)
// Then, try taking each amount of coins from the ith pile (0 to min(j, piles[i].length)).
  // transition: dp[i][j] = max(dp[i][j], dp[i - 1][j - h])

// Time Complexity: O(nk^2) 262ms
// Space Complexity: O(nk) 56.2MB
var maxValueOfCoins = function(piles, k) {
  let n = piles.length, dp = Array(n).fill(0).map(() => Array(k + 1).fill(0));
  for (let i = 0; i < n; i++) {
    for (let j = 1; j <= k; j++) { // take j coins in total
      dp[i][j] = i === 0 ? 0 : dp[i - 1][j]; // don't take any coins from ith pile
      let sum = 0;
      for (let h = 0; h < Math.min(j, piles[i].length); h++) { // take h + 1 coins from ith pile
        sum += piles[i][h];
        dp[i][j] = Math.max(dp[i][j], sum + (i === 0 ? 0 : dp[i - 1][j - h - 1]));
      }
    }
  }
  return dp[n - 1][k];
};

// Two test cases to run function on
console.log(maxValueOfCoins([[1,100,3],[7,8,9]], 2)) // 101
console.log(maxValueOfCoins([[100],[100],[100],[100],[100],[100],[1,1,1,1,1,1,700]], 7)) // 706