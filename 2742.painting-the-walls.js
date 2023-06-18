// 2742. Painting the Walls
// You are given two 0-indexed integer arrays, cost and time, of size n representing the costs and the time taken to paint n different walls respectively. There are two painters available:
  // A paid painter that paints the ith wall in time[i] units of time and takes cost[i] units of money.
  // A free painter that paints any wall in 1 unit of time at a cost of 0. But the free painter can only be used if the paid painter is already occupied.
// Return the minimum amount of money required to paint the n walls.


// Solution: DP

// We only need to consider which walls will be painted by the paid painter.
// The remaining walls will be painted by the free painter at no cost.

// Memoize each dp(i, wallsLeft), where 
  // i = current index 
  // wallsLeft = number of walls left that have not been taken by the paid paider

// For each dp(i, wallsLeft), we have two choices: 
  // 1. Take the ith wall. wallsLeft becomes wallsLeft - time[i] - 1 (time[i] walls can be painted by the free painter, and -1 for the current wall).
  // 2. Don't take the ith wall.
// When wallsLeft <= 0, then we can stop and return 0 as the cost.

// n = number of walls
// Time Complexity: O(n^2) 316ms
// Space Complexity: O(n^2) 75.8MB
var paintWalls = function(cost, time) {
  let n = cost.length, memo = Array(n).fill(0).map(() => Array(n + 1).fill(-1));
  return dp(0, n);
  
  function dp(i, wallsLeft) {
    if (wallsLeft <= 0) return 0;
    if (i === n) return Infinity;
    if (memo[i][wallsLeft] !== -1) return memo[i][wallsLeft];
    
    let ans = Math.min(dp(i + 1, wallsLeft - time[i] - 1) + cost[i], dp(i + 1, wallsLeft));
    return memo[i][wallsLeft] = ans;
  }
};

// Two test cases
console.log(paintWalls([1,2,3,2], [1,2,3,2])) // 3
console.log(paintWalls([2,3,4,2], [1,1,1,1])) // 4