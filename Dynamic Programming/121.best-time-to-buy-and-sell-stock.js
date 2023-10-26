// 121. Best Time to Buy and Sell Stock
// You are given an array prices where prices[i] is the price of a given stock on the ith day.
// You want to maximize your profit by choosing a single day to buy one stock and choosing a different day in the future to sell that stock.
// Return the maximum profit you can achieve from this transaction. If you cannot achieve any profit, return 0.


// Solution 1: One Pass

// Algorithm:
// Keep min, max, and maxProfit variables.
// Looping through prices (pointer = i), 
  // Update max if we come across a bigger number
  // If we come across a number smaller than the current min, 
    // if (current maximum profit (max - min) is bigger than the current maxProfit), update maxProfit.
    // reset both our past min and max to prices[i] (since the smaller must come before the bigger, and at this point, we know that both min and max are bigger than prices[i]).
// When iteration is done, compare max - min to maxProfit and udpate if necessary.
// Finally, return maxProfit.

// Time Complexity: O(n) 92ms
// Space Complexity: O(1) 48.8MB
var maxProfit = function(prices) {
    let min = Infinity, max = Infinity, maxProfit = 0;
    for (var i = 0; i < prices.length; i++) {
      if (prices[i] < min) {
        maxProfit = Math.max(maxProfit, !(max - min) ? 0 : max - min);
        min = prices[i], max = prices[i];
      } else {
        max = Math.max(max, prices[i]);
      }
    }
    maxProfit = Math.max(maxProfit, max - min);
    return maxProfit;
  }; 
  
  // Three test cases to run function on
  console.log(maxProfit([7,1,5,3,6,4])) // 5
  console.log(maxProfit([7,6,4,3,1])) // 0
  console.log(maxProfit([2,4,1])) // 2