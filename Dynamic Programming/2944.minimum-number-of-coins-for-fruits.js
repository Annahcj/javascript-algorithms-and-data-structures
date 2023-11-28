// 2944. Minimum Number of Coins for Fruits
// You are at a fruit market with different types of exotic fruits on display.
// You are given a 1-indexed array prices, where prices[i] denotes the number of coins needed to purchase the ith fruit.
// The fruit market has the following offer:
  // If you purchase the ith fruit at prices[i] coins, you can get the next i fruits for free.
// Note that even if you can take fruit j for free, you can still purchase it for prices[j] coins to receive a new offer.
// Return the minimum number of coins needed to acquire all the fruits.


// Solution 1: DP - Recursion w/ Memoization

// Memoize each dp(i), where dp(i) = minimum cost to acquire all fruits starting from index i.

// For each dp(i), we pay prices[i] to purchase the ith fruit, and we can get the next i fruits for free.
// However, that may not be the optimal result; ending the free fruits earlier may result in a smaller cost.
// Iterate through each index j where j <= i + i, and record the minimum prices[i] + dp(j + 1).

// Time Complexity: O(n^2) 112ms
// Space Complexity: O(n) 43.8MB
var minimumCoins = function(prices) {
  let n = prices.length, memo = Array(n + 1).fill(-1);
  return dp(1);
  
  function dp(i) {
    if (i >= n + 1) return 0;
    if (memo[i] !== -1) return memo[i];
    
    let minCost = Infinity;
    for (let j = i; j <= i + i; j++) {
      minCost = Math.min(minCost, prices[i - 1] + dp(j + 1));
    }
    return memo[i] = minCost;
  }
};


// Solution 2: Iterative DP

// Same as solution 1, but the iterative version.

// Time Complexity: O(n^2) 64ms
// Space Complexity: O(n) 44.4MB
var minimumCoins = function(prices) {
  let n = prices.length, dp = Array(n + 2).fill(Infinity);
  dp[n + 1] = 0;
  for (let i = n; i >= 1; i--) {
    for (let j = i; j <= n && j <= i + i; j++) {
      dp[i] = Math.min(dp[i], prices[i - 1] + dp[j + 1]);
    }
  }
  return dp[1];
};

// Two test cases
console.log(minimumCoins([3,1,2])) // 4
console.log(minimumCoins([1,10,1,1])) // 2