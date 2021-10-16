// 188. Best Time to Buy and Sell Stock IV
// You are given an integer array prices where prices[i] is the price of a given stock on the ith day, and an integer k.
// Find the maximum profit you can achieve. You may complete at most k transactions.
// Note: You may not engage in multiple transactions simultaneously (i.e., you must sell the stock before you buy again).


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

// Two test cases to run function on
console.log(maxProfit(2, [2,4,1])) // 2
console.log(maxProfit(2, [3,2,6,5,0,3])) // 7