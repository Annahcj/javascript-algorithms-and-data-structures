// 123. Best Time to Buy and Sell Stock III 
// You are given an array prices where prices[i] is the price of a given stock on the ith day.
// Find the maximum profit you can achieve. You may complete at most two transactions.
// Note: You may not engage in multiple transactions simultaneously (i.e., you must sell the stock before you buy again).


// Solution: Dynamic Programming w/ Optimized Space

// loop through prices ->
  // we have four states:
  // buy1 -> 
    // 1. maintain profit/ do nothing
    // 2. buy at prices[i]
  // sell1 ->
    // 1. maintain profit/ do nothing
    // 2. sell bought stock at today's price
  // buy2 ->
    // 1. maintain profit/ do nothing
    // 2. sell stock yesterday, buy stock today
  // sell2 -> 
    // 1. maintain profit/ do nothing
    // 2. sell second bought stock at today's price

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

// Two test cases to run function on
console.log(maxProfit([3,3,5,0,0,3,1,4])) // 6
console.log(maxProfit([1,2,3,4,5])) // 4