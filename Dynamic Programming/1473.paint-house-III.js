// 1473. Paint House III
// There is a row of m houses in a small city, each house must be painted with one of the n colors (labeled from 1 to n), some houses that have been painted last summer should not be painted again.
// A neighborhood is a maximal group of continuous houses that are painted with the same color.
  // For example: houses = [1,2,2,3,3,2,1,1] contains 5 neighborhoods [{1}, {2,2}, {3,3}, {2}, {1,1}].
// Given an array houses, an m x n matrix cost and an integer target where:
  // houses[i]: is the color of the house i, and 0 if the house is not painted yet.
  // cost[i][j]: is the cost of paint the house i with the color j + 1.
// Return the minimum cost of painting all the remaining houses in such a way that there are exactly target neighborhoods. If it is not possible, return -1.


// Solution: DP - Recursion w/ Memoization

// Use DP with memoization such that
// dp(i, j, k) = the minimum cost to paint house 0 to house i
  // i = the house we are up to
  // j = the color of the previous house
  // k = the number of neighborhoods

// For each house i, if it isn't already painted, try painting it with each possible color and record the minimum cost.

// m = number of houses, n = number of colours, k = target
// Time Complexity: O(m * n^2 * k) 351ms
// Space Complexity: O(mnk) 59.7MB
var minCost = function(houses, cost, m, n, target) {
  let memo = Array(m).fill(0).map(() => Array(n + 1).fill(0).map(() => Array(target + 1).fill(-1)));
  let minCost = dp(0, 0, 0);
  return minCost === Infinity ? -1 : minCost;
  
  function dp(i, prevColor, neighborhoods) {
    if (i === m) return neighborhoods === target ? 0 : Infinity;
    if (neighborhoods > target) return Infinity;
    if (memo[i][prevColor][neighborhoods] !== -1) return memo[i][prevColor][neighborhoods];
    
    let ans = Infinity;
    if (houses[i] > 0) { // house is already painted
      let newNeighborhoods = houses[i] === prevColor ? neighborhoods : neighborhoods + 1; // check whether this house is in the same neighborhood
      ans = dp(i + 1, houses[i], newNeighborhoods);
    } else {
      for (let j = 0; j < n; j++) { // try painting in each colour and take the best result 
        if (j + 1 === prevColor) { 
          ans = Math.min(ans, dp(i + 1, prevColor, neighborhoods) + cost[i][j]); // same color, same neighborhood
        } else { 
          ans = Math.min(ans, dp(i + 1, j + 1, neighborhoods + 1) + cost[i][j]); // new color, new neighborhood
        }
      }
    }
    return memo[i][prevColor][neighborhoods] = ans;
  }
};

// Two test cases 
console.log(minCost([0,0,0,0,0], [[1,10],[10,1],[10,1],[1,10],[5,1]], 5, 2, 3)) // 9
console.log(minCost([0,2,1,2,0], [[1,10],[10,1],[10,1],[1,10],[5,1]], 5, 2, 3)) // 11