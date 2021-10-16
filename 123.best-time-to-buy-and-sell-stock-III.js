// 123. Best Time to Buy and Sell Stock III 
// You are given an array prices where prices[i] is the price of a given stock on the ith day.
// Find the maximum profit you can achieve. You may complete at most two transactions.
// Note: You may not engage in multiple transactions simultaneously (i.e., you must sell the stock before you buy again).


// Solution: Dynamic Programming w/ Optimized Space

// loop through prices ->
  // we have four states:
  // buy1 -> first buy
  // sell1 -> first sell
  // buy2 -> second buy based on profit after sell1
  // sell2 -> second sell based on buy2

// Time Complexity: O(n) 100ms
// Space Complexity: O(1) 49.5MB
var maxProfit = function(prices) {
  let buy1 = -Infinity, sell1 = 0;
  let buy2 = -Infinity, sell2 = 0;
  for (var i = 0; i < prices.length; i++) {
    buy1 = Math.max(buy1, -prices[i]);
    sell1 = Math.max(sell1, buy1 + prices[i]);
    buy2 = Math.max(buy2, sell1 - prices[i]);
    sell2 = Math.max(sell2, buy2 + prices[i]);
  }  
  return sell2;
};

// A test case to run function on
console.log(maxProfit([3,3,5,0,0,3,1,4])) // 6