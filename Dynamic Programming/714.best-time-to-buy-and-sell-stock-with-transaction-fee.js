// 714. Best Time to Buy and Sell Stock with Transaction Fee
// You are given an array prices where prices[i] is the price of a given stock on the ith day, and an integer fee representing a transaction fee.
// Find the maximum profit you can achieve. You may complete as many transactions as you like, but you need to pay the transaction fee for each transaction.
// Note: You may not engage in multiple transactions simultaneously (i.e., you must sell the stock before you buy again).


// Solution: Dynamic Programming

// Keep two arrays of which represent states of profit ->
  // buy -> initiate with -prices[0], meaning we buy the stock on day 0
  // sell -> sell whatever we bought, set to 0 since we can't possibly make any profit on day 0

// Loop through prices from index 1 onwards
  // buy[i] 
    // 1. keep/maintain profit (do nothing)
    // 2. sell on day i - 1, and buy today
  // sell[i]
    // 1. keep the stock we are holding from day i - 1 (do nothing)
    // 2. sell stock we held from day i - 1 for price of prices[i] - fee

// Return sell[prices.length - 1]

// Time Complexity: O(n) 100ms
// Space Complexity: O(n) 52.7MB
var maxProfit = function(prices, fee) {
  let buy = [-prices[0]];
  let sell = [0];
  for (var i = 1; i < prices.length; i++) {
    buy[i] = Math.max(buy[i - 1], sell[i - 1] - prices[i]);
    sell[i] = Math.max(sell[i - 1], buy[i - 1] + prices[i] - fee);
  }  
  return sell[prices.length - 1];
};

// Solution 2: Optimized Space

// Instead of using arrays, we can just keep track of two variables buy and sell, since we were only comparing with previous values.

// Time Complexity: O(n) 96ms
// Space Complexity: O(1) 47.2MB
var maxProfit = function(prices, fee) {
  let buy = -prices[0];
  let sell = 0;
  for (var i = 1; i < prices.length; i++) {
    sell = Math.max(sell, buy + prices[i] - fee);
    buy = Math.max(buy, sell - prices[i]);
  }  
  return sell;
};

// Two test cases to run function on
console.log(maxProfit([1,3,2,8,4,9], 2)) // 8
console.log(maxProfit([1,3,7,5,10,3], 3)) // 6