// 309. Best Time to Buy and Sell Stock with Cooldown
// You are given an array prices where prices[i] is the price of a given stock on the ith day.
// Find the maximum profit you can achieve. You may complete as many transactions as you like (i.e., buy one and sell one share of the stock multiple times) with the following restrictions:
// After you sell your stock, you cannot buy stock on the next day (i.e., cooldown one day).
// Note: You may not engage in multiple transactions simultaneously (i.e., you must sell the stock before you buy again).


// Solution: Dynamic Programming

// Keep two arrays of states -> sold and held

// note: both arrays record profit on a certain day, sold is the profit after selling, held is profit after buying (will be lower than sold because we are buying and not gaining anything)
// sold -> sells stock from held
// held -> holds stock which we will buy later, we can only buy after the cooldown is over

// sold[i] = Math.max(sold[i - 1], held[i - 1] + prices[i]) -> hold on to prev profit, or sell from held for today's price
// held[i] = Math.max(held[i - 1], (sold[i - 2] || 0) - prices[i]) -> hold on to whatever we have, or sell prevPrev stock (after cooldown) and buy today's stock

// Time Complexity: O(n) 83ms
// Space Complexity: O(n) 40.3MB
var maxProfit = function(prices) {
  let n = prices.length;
  // initial state -> 0 since we can't sell anything on day 0
  let sold = [0];
  // initial state -> -prices[0] since we bought day 0 stock, we now have a loss.
  let held = [-prices[0]];
  for (var i = 1; i < prices.length; i++) {
    sold[i] = Math.max(sold[i - 1], held[i - 1] + prices[i]);
    held[i] = Math.max(held[i - 1], (sold[i - 2] || 0) - prices[i]);
  }
  return sold[n - 1];
};

// Three test cases to run function on
console.log(maxProfit([2,1])) // 0
console.log(maxProfit([1,2,3,0,2])) // 3
console.log(maxProfit([1])) // 0