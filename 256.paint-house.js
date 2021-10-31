// 256. Paint House
// There is a row of n houses, where each house can be painted one of three colors: red, blue, or green. The cost of painting each house with a certain color is different. You have to paint all the houses such that no two adjacent houses have the same color.
// The cost of painting each house with a certain color is represented by an n x 3 cost matrix costs.
// For example, costs[0][0] is the cost of painting house 0 with the color red; costs[1][2] is the cost of painting house 1 with color green, and so on...
// Return the minimum cost to paint all houses.


// Solution: Dynamic Programming

// For each cost, we can calculate the best value to paint a different color.
  // house 0: either paint previous house 1 or 2
  // house 1: either paint previous house 0 or 2
  // house 2: either paint previous house 0 or 1
// We can actually do this in-place by modifying the actual costs matrix.
// We can simply add the best previous house cost to the current cost.
// In the end, we return the minimum value out in the last row.

// Time Complexity: O(n) 76ms
// Space Complexity: O(1) 40.5MB
var minCost = function(costs) {
  let n = costs.length;
  for (var i = 1; i < n; i++) {
    costs[i][0] += Math.min(costs[i - 1][1], costs[i - 1][2]);
    costs[i][1] += Math.min(costs[i - 1][0], costs[i - 1][2]);
    costs[i][2] += Math.min(costs[i - 1][0], costs[i - 1][1]);
  }  
  return Math.min(...costs[n - 1]);
};

// Two test cases to run function on
console.log(minCost([[17,2,17],[16,16,5],[14,3,19]])) // 10
console.log(minCost([[7,6,2]])) // 2