// 2929. Distribute Candies Among Children II
// You are given two positive integers n and limit.
// Return the total number of ways to distribute n candies among 3 children such that no child gets more than limit candies.


// Solution: Enumeration & Math

// Iterate through each possible first amount, from min(n, limit) to max(0, n - limit * 2).
// From the first amount, we can calculate the remaining amount: n - first amount.
// From there, we can calculate the number of combinations,
  // Calculate the maximum possible amount for the second or third element: max(limit, remaining).
  // Calculate the minimum possible amount for the second or third element: remaining - max.
  // The number of ways will be max - min + 1.

// Time Complexity: O(limit) 126ms
// Space Complexity: O(1) 52.1MB
var distributeCandies = function(n, limit) {
  let totalWays = 0; 
  for (let firstAmount = Math.max(0, n - limit * 2); firstAmount <= Math.min(n, limit); firstAmount++) {
    let remaining = n - firstAmount;
    let max = Math.min(limit, remaining);
    let min = remaining - max;
    let ways = max - min + 1;
    totalWays += ways;
  }
  return totalWays;
};

// Two test cases
console.log(distributeCandies(5, 2)) // 3
console.log(distributeCandies(3, 3)) // 10