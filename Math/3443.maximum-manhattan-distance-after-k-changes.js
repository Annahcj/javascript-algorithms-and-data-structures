// 3443. Maximum Manhattan Distance After K Changes
// You are given a string s consisting of the characters 'N', 'S', 'E', and 'W', where s[i] indicates movements in an infinite grid:
  // 'N' : Move north by 1 unit.
  // 'S' : Move south by 1 unit.
  // 'E' : Move east by 1 unit.
  // 'W' : Move west by 1 unit.
// Initially, you are at the origin (0, 0). You can change at most k characters to any of the four directions.
// Find the maximum Manhattan distance from the origin that can be achieved at any time while performing the movements in order.
// The Manhattan Distance between two cells (xi, yi) and (xj, yj) is |xi - xj| + |yi - yj|.


// Solution: Math

// Keep the running count of occurances for every direction.
// The maximum distance from the origin is achieved by changing the minimum opposite direction:
  // Change the smaller count out of north and south to be the opposite direction. This maximizes the distance in one direction on the x-axis.
  // Same for the y-axis, change the smaller count out of east and west to be the opposite direction.

// Time Complexity: O(n) 191ms
// Space Complexity: O(1) 62.84MB
function maxDistance(s, k) {
  const count = {N: 0, S: 0, E: 0, W: 0};
  let maxDistFromOrigin = 0;
  for (let dir of s) {
    count[dir]++;
    const distFromOrigin = Math.max(count.N, count.S) - Math.min(count.N, count.S) + Math.max(count.E, count.W) - Math.min(count.E, count.W);
    const oppositeDirections = Math.min(count.N, count.S) + Math.min(count.E, count.W);
    maxDistFromOrigin = Math.max(maxDistFromOrigin, distFromOrigin + Math.min(k, oppositeDirections) * 2);
  }
  return maxDistFromOrigin;
};

// Two test cases
console.log(maxDistance("NWSE", 1)) // 3
console.log(maxDistance("NSWWEW", 3)) // 6