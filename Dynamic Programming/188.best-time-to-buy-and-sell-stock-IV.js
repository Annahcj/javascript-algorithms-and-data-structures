// 188. Best Time to Buy and Sell Stock IV
// You are given an integer array prices where prices[i] is the price of a given stock on the ith day, and an integer k.
// Find the maximum profit you can achieve. You may complete at most k transactions.
// Note: You may not engage in multiple transactions simultaneously (i.e., you must sell the stock before you buy again).


// Solution 1: DP - Tabulation

// keep two arrays -> 
  // buy -> buy[i] denotes max profit with i + 1 transactions after buying 
  // sell -> sell[i] denotes max profit with i + 1 transactions after selling what was bought

// loop through each price
  // loop through from 0 to k
    // buy[i] = 
      // 1. maintain profit
      // 2. sell/ profit from last transaction (or 0), then buy for today's price
    // sell[i] = 
      // 1. maintain profit
      // 2. sell what was bought for today's price
      
// return sell[k - 1]

// Time Complexity: O(nk) 88ms
// Space Complexity: O(k) 41.4MB
var maxProfit = function(k, prices) {
  if (k === 0) return 0;
  let buy = Array(k).fill(-Infinity);
  let sell = Array(k).fill(0);
  for (var price of prices) {
    for (var i = 0; i < k; i++) {
      buy[i] = Math.max(buy[i], (sell[i - 1] || 0) - price);
      sell[i] = Math.max(sell[i], buy[i] + price);
    }
  }
  return sell[k - 1];
};


// Solution 2: DP - Recursion w/ Memoization

// Memoize each dp(i, k, isBuy), where
  // i = the ith day
  // k = number of transactions we have leftover
  // isBuy = whether the current transaction must be a buy 
    // if isBuy = 1, the next action must be a buy.
    // if isBuy = 0, the next action must be a sell.

// For each dp(i, k, isBuy), we have three different choices:
  // 1. Do nothing. We don't perform any action on the ith day.
  // 2. If isBuy is 1, buy the stock on the ith day. (Note that we don't decrement k when we buy, only when we sell)
  // 3. If isBuy is 0, sell the stock on the ith day. (Since the transaction is finished, we decrement k here)

// Time Complexity: O(nk) 110ms
// Space Complexity: O(nk) 57.3MB
var maxProfit = function(k, prices) {
  let n = prices.length, memo = Array(n).fill(0).map(() => Array(k + 1).fill(0).map(() => Array(2).fill(-1)));
  return dp(0, k, 1);
  
  function dp(i, k, isBuy) {
    if (i === n || k === 0) return 0;
    if (memo[i][k][isBuy] !== -1) return memo[i][k][isBuy];
    
    let maxProfit = dp(i + 1, k, isBuy); // do nothing
    if (isBuy) maxProfit = Math.max(maxProfit, dp(i + 1, k, 0) - prices[i]); // buy
    else maxProfit = Math.max(maxProfit, dp(i + 1, k - 1, 1) + prices[i]); // sell
    return memo[i][k][isBuy] = maxProfit;
  }
};

// Two test cases to run function on
console.log(maxProfit(2, [2,4,1])) // 2
console.log(maxProfit(2, [3,2,6,5,0,3])) // 7