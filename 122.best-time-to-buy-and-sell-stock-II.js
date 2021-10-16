// 122. Best Time to Buy and Sell Stock II
// You are given an integer array prices where prices[i] is the price of a given stock on the ith day.
// On each day, you may decide to buy and/or sell the stock. You can only hold at most one share of the stock at any time. However, you can buy it then immediately sell it on the same day.
// Find and return the maximum profit you can achieve.


// Solution: Dynamic Programming

// Time Complexity: O(n) 120ms
// Space Complexity: O(n) 41.4MB
var maxProfit = function(prices) {
  // we have nothing to sell on day 0, so the profit is 0
  let sold = [0];
  // -prices[0] is fee when you pay for prices[0] (a loss since we haven't sold it yet)
  let held = [-prices[0]];
  for (var i = 1; i < prices.length; i++) {
    // do nothing at all, or sell what is held for current day's price
    sold[i] = Math.max(sold[i - 1], held[i - 1] + prices[i]);

    // keep holding, or buy on day i (current day)
    held[i] = Math.max(held[i - 1], sold[i - 1] - prices[i]);
  } 
  return sold[prices.length - 1];
};

// Three test cases to run function on
console.log(maxProfit([7,1,5,3,6,4])) // 7
console.log(maxProfit([1,2,3,4,5])) // 4
console.log(maxProfit([7,6,4,3,1])) // 0