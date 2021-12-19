// 2110. Number of Smooth Descent Periods of a Stock
// You are given an integer array prices representing the daily price history of a stock, where prices[i] is the stock price on the ith day.
// A smooth descent period of a stock consists of one or more contiguous days such that the price on each day is lower than the price on the preceding day by exactly 1. The first day of the period is exempted from this rule.
// Return the number of smooth descent periods.


// Solution: Dynamic Programming

// count the length of smooth descents ending at each position i in prices.
// e.g: [3,2,1,4]
// dp = [1,2,3,1]

// for each length in dp, count the number of subarrays ending at position i (except a subarray with a length of 1).
// e.g: 
// index 0: 1 - 1 = 0: []  (we don't count itself yet, we leave that for the end)
// index 1: 2 - 1 = 1: [[1,2]]
// index 2: 3 - 1 = 2: [[1,2,3],[2,3]]
// index 3: 1 - 1 = 0: []

// the answer is the sum of each length - 1.
// we add the length of prices to our answer and return.

// Time Complexity: O(n) 112ms
// Space Complexity: O(n) 50.2MB
var getDescentPeriods = function(prices) {
  let n = prices.length, dp = Array(n).fill(1);
  for (var i = 1; i < n; i++) {
    if (prices[i - 1] - 1 === prices[i]) dp[i] = dp[i - 1] + 1;
  }
  let sum = 0;
  for (var length of dp) sum += length - 1;
  return sum + n;
};

// Two test cases to run function on
console.log(getDescentPeriods([4,3,2,1])) // 10
console.log(getDescentPeriods([3,2,1,4])) // 7