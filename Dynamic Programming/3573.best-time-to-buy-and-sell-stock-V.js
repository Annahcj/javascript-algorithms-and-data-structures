// 3573. Best Time to Buy and Sell Stock V
// You are given an integer array prices where prices[i] is the price of a stock in dollars on the ith day, and an integer k.
// You are allowed to make at most k transactions, where each transaction can be either of the following:
  // Normal transaction: Buy on day i, then sell on a later day j where i < j. You profit prices[j] - prices[i].
  // Short selling transaction: Sell on day i, then buy back on a later day j where i < j. You profit prices[i] - prices[j].
// Note that you must complete each transaction before starting another. Additionally, you can't buy or sell on the same day you are selling or buying back as part of a previous transaction.
// Return the maximum total profit you can earn by making at most k transactions.


// Solution: DP - Recursion w/ Memoization

// Memoize each dp(i, k, state), where
  // i = index in prices
  // k = transactions remaining
  // state = state of the current profit, 
    // 0: no stock
    // 1: in holding - normal transaction
    // 2: in holding - short selling transaction

// For each dp(i, k, state),
// If state is 0, there are three choices:
  // 1. Take the stock on day i, in a normal transaction (- prices[i]).
  // 2. Take the stock on day i, in a short selling transaction (+ prices[i]).
  // 3. Do nothing on this day.
// If state is 1 (normal transaction),
  // 1. Sell the stock on day i (+ prices[i]).
  // 2. Do nothing on this day.
// If state is 2 (short selling transaction),
  // 1. Sell the stock on day i (- prices[i]).
  // 2. Do nothing on this day.

// Time Complexity: O(3nk) 1540ms
// Space Complexity: O(3nk) 123MB
function maximumProfit(prices, k) {
  const n = prices.length, memo = Array(n).fill(0).map(() => Array(k + 1).fill(0).map(() => Array(3).fill(-Infinity)));
  return dp(0, k, 0);

  function dp(i, k, state) {
    if (k === 0) return 0;
    if (i === n) return state === 0 ? 0 : -Infinity;
    if (memo[i][k][state] !== -Infinity) return memo[i][k][state];

    if (state === 0) {
      const normal = dp(i + 1, k, 1) - prices[i];
      const shortSelling = dp(i + 1, k, 2) + prices[i];
      const skip = dp(i + 1, k, 0);
      return memo[i][k][state] = Math.max(normal, shortSelling, skip);
    }
    if (state === 1) {
      const sell = dp(i + 1, k - 1, 0) + prices[i];
      const skip = dp(i + 1, k, state);
      return memo[i][k][state] = Math.max(sell, skip);
    }
    // short selling
    const sell = dp(i + 1, k - 1, 0) - prices[i];
    const skip = dp(i + 1, k, state);
    return memo[i][k][state] = Math.max(sell, skip);
  }
};

// Two test cases
console.log(maximumProfit([1,7,9,8,2], 2)) // 14
console.log(maximumProfit([12,16,19,19,8,1,19,13,9], 3)) // 36