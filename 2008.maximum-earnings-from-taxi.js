// 2008. Maximum Earnings From Taxi
// There are n points on a road you are driving your taxi on. The n points on the road are labeled from 1 to n in the direction you are going, and you want to drive from point 1 to point n to make money by picking up passengers. You cannot change the direction of the taxi.
// The passengers are represented by a 0-indexed 2D integer array rides, where rides[i] = [starti, endi, tipi] denotes the ith passenger requesting a ride from point starti to point endi who is willing to give a tipi dollar tip.
// For each passenger i you pick up, you earn endi - starti + tipi dollars. You may only drive at most one passenger at a time.
// Given n and rides, return the maximum number of dollars you can earn by picking up the passengers optimally.
// Note: You may drop off a passenger and pick up a different passenger at the same point.


// Solution: Sorting & Dynamic Programming

// 1. Sort rides by start time
// 2. Use dynamic programming to find the max profit at each point.
  // dp[i] = max profit up to i.
  // keep track of the previous start point, in case of a gap, we need to catch up the max value from prev to start.

// m = length of rides
// Time Complexity: O(m log(m)) 318ms
// Space Complexity: O(n) 75.8MB
var maxTaxiEarnings = function(n, rides) {
  rides.sort((a, b) => a[0] - b[0]);
  let dp = Array(n + 1).fill(0), prev = 0;
  let max = 0;
  for (let [start, end, tip] of rides) {
    let earned = end - start + tip;
    while (prev < start) {
      dp[prev + 1] = Math.max(dp[prev + 1], dp[prev]);
      prev++;
    }
    dp[end] = Math.max(dp[end], dp[start] + earned);
    max = Math.max(max, dp[end]);
  }
  return max;
};

// Two test cases to run function on
console.log(maxTaxiEarnings(5, [[2,5,4],[1,5,1]])) // 7
console.log(maxTaxiEarnings(20, [[1,6,1],[3,10,2],[10,12,3],[11,12,2],[12,15,2],[13,18,1]])) // 20