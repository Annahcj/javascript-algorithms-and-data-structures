// 3652. Best Time to Buy and Sell Stock using Strategy
// You are given two integer arrays prices and strategy, where:
  // prices[i] is the price of a given stock on the ith day.
  // strategy[i] represents a trading action on the ith day, where:
    // -1 indicates buying one unit of the stock.
    // 0 indicates holding the stock.
    // 1 indicates selling one unit of the stock.
// You are also given an even integer k, and may perform at most one modification to strategy. A modification consists of:
  // Selecting exactly k consecutive elements in strategy.
  // Set the first k / 2 elements to 0 (hold).
  // Set the last k / 2 elements to 1 (sell).
// The profit is defined as the sum of strategy[i] * prices[i] across all days.
// Return the maximum possible profit you can achieve.
// Note: There are no constraints on budget or stock ownership, so all buy and sell operations are feasible regardless of past actions.


// Solution: Sliding Window & Prefix Sum

// Maintain a sliding window of size k.
// For each window, 
  // The first half always has a sum of 0.
  // The second half will have a sum equal to the sum of prices, since strategy will be 1.
// Use prefix sum to find the sum of the second half of prices.

// Keep track of the sum outside of the window, and record and return the maximum outside sum + sum of the second half of the window.

// Time Complexity: O(n) 47ms
// Space Complexity: O(n) 86.64MB
function maxProfit(prices, strategy, k) {
  const n = prices.length, pSum = [0, ...prices];
  for (let i = 2; i <= n; i++) {
    pSum[i] += pSum[i - 1];
  }
  let originalSum = 0, sumOutsideWindow = 0;
  for (let i = 0; i < n; i++) {
    originalSum += strategy[i] * prices[i];
    if (i >= k) {
      sumOutsideWindow += strategy[i] * prices[i];
    }
  }
  let maxSum = originalSum;
  for (let i = k - 1; i < n; i++) {
    const windowProfit = pSum[i + 1] - pSum[(i + 1) - (k / 2)];
    maxSum = Math.max(maxSum, sumOutsideWindow + windowProfit);
    sumOutsideWindow += strategy[i - k + 1] * prices[i - k + 1];
    if (i < n - 1) {
      sumOutsideWindow -= strategy[i + 1] * prices[i + 1];
    }
  }
  return maxSum;
};

// Two test cases
console.log(maxProfit([4,2,8], [-1,0,1], 2)) // 10
console.log(maxProfit([5,4,3], [1,1,0], 2)) // 9