// 265. Paint House II
// There are a row of n houses, each house can be painted with one of the k colors. The cost of painting each house with a certain color is different. You have to paint all the houses such that no two adjacent houses have the same color.
// The cost of painting each house with a certain color is represented by an n x k cost matrix costs.
// For example, costs[0][0] is the cost of painting house 0 with color 0; costs[1][2] is the cost of painting house 1 with color 2, and so on...
// Return the minimum cost to paint all houses.


// Solution 1: Dynamic Programming

// Starting from the 2nd row of houses (index 1) (pointer = i), 
  // loop through each house (pointer = j)
    // loop through each house in the previous row (not including the adjacent house), and update dp at [i][j] if prev cost + cost at curr house is less than it.
// Return the smallest cost in the last row.

// Time Complexity: O(nk^2) 88ms
// Space Complexity: O(nk) 41.3MB
var minCostII = function(costs) {
  let k = costs[0].length, n = costs.length;
  let dp = Array(n);
  for (var i = 0; i < n; i++) dp[i] = Array(k).fill(Infinity);
  for (var j = 0; j < k; j++) dp[0][j] = costs[0][j];
  for (var i = 1; i < n; i++) {
    for (var j = 0; j < k; j++) {
      for (var h = 0; h < k; h++) {
        if (j !== h) {
          dp[i][j] = Math.min(dp[i][j], dp[i - 1][h] + costs[i][j]);
        }
      }
    }
  } 
  return Math.min(...dp[n - 1]);
};

// Solution 2: Dynamic Programming in Place

// This solution is basically the same as solution 1, except we are doing it in place instead of in an additional matrix.

// Starting from the 2nd row of houses (index 1) (pointer = i), 
  // loop through each house (pointer = j)
    // loop through each house in the previous row (not including the adjacent house), and find the smallest value.
    // increment costs at [i][j] by the smallest value that we found.
// Return the smallest cost in the last row.

// Time Complexity: O(nk^2) 84ms
// Space Complexity: O(1) 41MB
var minCostII = function(costs) {
  let k = costs[0].length, n = costs.length;
  for (var i = 1; i < n; i++) {
    for (var j = 0; j < k; j++) {
      let min = Infinity;
      for (var h = 0; h < k; h++) {
        if (j !== h) {
          min = Math.min(min, costs[i - 1][h]);
        }
      }
      costs[i][j] += min;
    }
  } 
  return Math.min(...costs[n - 1]);
};

// Solution 3: Min & Second Min

// Loop through each row (pointer = i)
  // find the indexes of the minimum and second minimum costs from the previous row.
  // (we only need to find two because if the minimum is adjcent, we can just take the second minimum.)
  // loop through each house (pointer = j)
    // if j is not equal to min index, increment costs[i][j] by costs[i - 1][minimum index]
    // otherwise, increment costs[i][j] by costs[i - 1][second minimum index]
// In the end, return the minimum cost in the last row.

// Time Complexity: O(nk) 80ms
// Space Complexity: O(1) 41.4MB
var minCostII = function(costs) {
  let k = costs[0].length, n = costs.length;
  for (var i = 1; i < n; i++) {
    let min = -1, secondMin = -1;
    for (var j = 0; j < k; j++) {
      if (min === -1 || costs[i - 1][j] < costs[i - 1][min]) {
        secondMin = min;
        min = j;
      } else if (secondMin === -1 || costs[i - 1][j] < costs[i - 1][secondMin]) {
        secondMin = j;
      }
    }
    for (j = 0; j < k; j++) {
      if (min !== j) costs[i][j] += costs[i - 1][min];
      else costs[i][j] += costs[i - 1][secondMin];
    }
  }
  return Math.min(...costs[n - 1]);
};

// Two test cases to run function on
console.log(minCostII([[1,5,3],[2,9,4]])) // 5
console.log(minCostII([[1,3],[2,4]])) // 5