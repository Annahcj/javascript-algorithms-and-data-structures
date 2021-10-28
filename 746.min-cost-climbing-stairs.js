// 746. Min Cost Climbing Stairs
// You are given an integer array cost where cost[i] is the cost of ith step on a staircase. Once you pay the cost, you can either climb one or two steps.
// You can either start from the step with index 0, or the step with index 1.
// Return the minimum cost to reach the top of the floor.


// Solution: Bottom-up Dynamic Programming

// The top floor is position n (cost.length).
// Create a dp array the size of n.
// Set dp[0] to cost[0] and dp[1] to cost[1].
// Start looping from 2 to n - 1 (pointer = i)
  // set dp[i] to min(dp[i - 2], dp[i - 1]) + cost[i]
  // (dp[i] = best cost to go from i to next position, NOT best cost to reach i)
// Return min(dp[i - 2], dp[i - 1])

// Time Complexity: O(n) 80ms
// Space Complexity: O(n) 40.7MB
var minCostClimbingStairs = function(cost) {
  let n = cost.length;
  let dp = Array(n);
  dp[0] = cost[0], dp[1] = cost[1];
  for (var i = 2; i < n; i++) {
    dp[i] = Math.min(dp[i - 2], dp[i - 1]) + cost[i];
  }
  return Math.min(dp[i - 2], dp[i - 1]);
};

// Two test cases to run function on
console.log(minCostClimbingStairs([10,15,20])) // 15
console.log(minCostClimbingStairs([1,100,1,1,1,100,1,1,100,1])) // 6