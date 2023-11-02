// 2849. Determine if a Cell Is Reachable at a Given Time
// You are given four integers sx, sy, fx, fy, and a non-negative integer t.
// In an infinite 2D grid, you start at the cell (sx, sy). Each second, you must move to any of its adjacent cells.
// Return true if you can reach cell (fx, fy) after exactly t seconds, or false otherwise.
// A cell's adjacent cells are the 8 cells around it that share at least one corner with it. You can visit the same cell several times.


// Solution: Greedy 

// The minimum time from (sx, sy) to (fx, fy) is max(diff x, diff y).
// If the minimum time is less than or equal to, it's always possible to reach it in exactly t moves because we can spend excess moves hopping around the target cell.

// The only case where this isn't true is when the two cells start off at the same position and t is 1. 
// We have no choice but to leave the cell and don't have any time to come back.

// Time Complexity: O(1) 56ms
// Space Complexity: O(1) 43.1MB
var isReachableAtTime = function(sx, sy, fx, fy, t) {
  if (sx === fx && sy === fy) return t !== 1;
  let diffX = Math.abs(sx - fx), diffY = Math.abs(sy - fy);
  return Math.max(diffX, diffY) <= t;
};

// Two test cases
console.log(isReachableAtTime(2, 4, 7, 7, 6)) // true
console.log(isReachableAtTime(3, 1, 7, 3, 3)) // false