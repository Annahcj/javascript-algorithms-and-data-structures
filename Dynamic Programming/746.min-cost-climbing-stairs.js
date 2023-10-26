// 746. Min Cost Climbing Stairs
// You are given an integer array cost where cost[i] is the cost of ith step on a staircase. Once you pay the cost, you can either climb one or two steps.
// You can either start from the step with index 0, or the step with index 1.
// Return the minimum cost to reach the top of the floor.


// Solution 1: Bottom-up Dynamic Programming

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
  let n = cost.length, dp = Array(n);
  dp[0] = cost[0], dp[1] = cost[1];
  for (let i = 2; i < n; i++) {
    dp[i] = Math.min(dp[i - 2], dp[i - 1]) + cost[i];
  }
  return Math.min(dp[i - 2], dp[i - 1]);
};

// Solution 2: Constant Space

// Notice that we only need to access the results from the last two steps.
// We can use two variables to keep track of the previous and previous previous costs. 

// Time Complexity: O(n) 54ms
// Space Complexity: O(1) 43.9MB
var minCostClimbingStairs = function(cost) {
  let prevPrev = cost[0], prev = cost[1];
  cost.push(0);
  
  for (let i = 2; i < cost.length; i++) {
    let curr = Math.min(prevPrev, prev) + cost[i];
    prevPrev = prev;
    prev = curr;
  }
  return prev;
};

// Two test cases
console.log(minCostClimbingStairs([10,15,20])) // 15
console.log(minCostClimbingStairs([1,100,1,1,1,100,1,1,100,1])) // 6