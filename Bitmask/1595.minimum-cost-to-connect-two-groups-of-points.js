// 1595. Minimum Cost to Connect Two Groups of Points
// You are given two groups of points where the first group has size1 points, the second group has size2 points, and size1 >= size2.
// The cost of the connection between any two points are given in an size1 x size2 matrix where cost[i][j] is the cost of connecting point i of the first group and point j of the second group. The groups are connected if each point in both groups is connected to one or more points in the opposite group. In other words, each point in the first group must be connected to at least one point in the second group, and each point in the second group must be connected to at least one point in the first group.
// Return the minimum cost it takes to connect the two groups.


// Solution: DP w/ Bitmasks

// Memoize each dp(i, mask), where
  // i = index in group1
  // mask = bitmask of points connected in group2

// First, connect every point in group1 with a point in group2.
  // Try every combination and record the best result.
// Then, connect every unconnected point in group2 with the points in group1 with the cheapest connection cost.

// n = size of group1, m = size of group2
// Time Complexity: O(n * 2^m * m) 161ms
// Space Complexity: O(n * 2^m) 44.5MB
var connectTwoGroups = function(cost) {
  let n = cost.length, m = cost[0].length; // n = size of group1, m = size of group2
  let minCost = Array(m).fill(Infinity); // minCost[j] = minimum cost to connect point j (from group2) to a point in group1
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < m; j++) {
      minCost[j] = Math.min(minCost[j], cost[i][j]);
    }
  }
  let memo = Array(n).fill(0).map(() => Array(1 << m).fill(-1));
  return dp(0, 0);
  
  function dp(i, mask) {
    if (i === n) {
      let cost = 0;
      for (let j = 0; j < m; j++) {
        if (((mask >> j) & 1) === 0) cost += minCost[j];
      }
      return cost;
    }
    if (memo[i][mask] !== -1) return memo[i][mask];
    
    let ans = Infinity;
    for (let j = 0; j < m; j++) {
      ans = Math.min(ans, dp(i + 1, mask | (1 << j)) + cost[i][j]);
    }
    return memo[i][mask] = ans;
  }  
};

// Two test cases
console.log(connectTwoGroups([[15,96],[36,2]])) // 17
console.log(connectTwoGroups([[1,3,5],[4,1,1],[1,5,3]])) // 4