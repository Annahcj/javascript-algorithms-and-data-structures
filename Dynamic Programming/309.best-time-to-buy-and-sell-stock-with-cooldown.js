// 309. Best Time to Buy and Sell Stock with Cooldown
// You are given an array prices where prices[i] is the price of a given stock on the ith day.
// Find the maximum profit you can achieve. You may complete as many transactions as you like (i.e., buy one and sell one share of the stock multiple times) with the following restrictions:
// After you sell your stock, you cannot buy stock on the next day (i.e., cooldown one day).
// Note: You may not engage in multiple transactions simultaneously (i.e., you must sell the stock before you buy again).


// Solution: Dynamic Programming

// Keep two arrays of states -> sold and held

// note: both arrays record profit on a certain day, sold is the profit after selling, held is profit after buying (will be lower than sold because we are buying and not gaining anything)
// buy -> holds stock which we will buy later, we can only buy again after the cooldown is over
// sell -> sells stock which was bought

// buy[i] = Math.max(buy[i - 1], (sell[i - 2] || 0) - prices[i]) -> 
  // 1. hold on to the money we have
  // 2. sell at day i - 2, and with that profit buy today's stock (since we sold on day i - 2, we may have more money than just holding onto what we have)

// sell[i] = Math.max(sell[i - 1], buy[i - 1] + prices[i]) -> 
  // 1. hold on to the money we have
  // 2. sell the stock we have bought (if it is a loss, not buying that stock at all will be better)

// Time Complexity: O(n) 68ms
// Space Complexity: O(n) 40.7MB
var maxProfit = function(prices) {
  let n = prices.length;
  // initial state -> -prices[0] since we bought day 0 stock, we now have a loss.
  let buy = [-prices[0]];
  // initial state -> 0 since we can't sell anything on day 0
  let sell = [0];
  for (var i = 1; i < prices.length; i++) {
    buy[i] = Math.max(buy[i - 1], (sell[i - 2] || 0) - prices[i]);
    sell[i] = Math.max(sell[i - 1], buy[i - 1] + prices[i]);
  }
  return sell[n - 1];
};

// Three test cases to run function on
console.log(maxProfit([2,1])) // 0
console.log(maxProfit([1,2,3,0,2])) // 3
console.log(maxProfit([1])) // 0