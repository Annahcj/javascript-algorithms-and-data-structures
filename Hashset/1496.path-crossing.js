// 1496. Path Crossing
// Given a string path, where path[i] = 'N', 'S', 'E' or 'W', each representing moving one unit north, south, east, or west, respectively. You start at the origin (0, 0) on a 2D plane and walk on the path specified by path.
// Return true if the path crosses itself at any point, that is, if at any time you are on a location you have previously visited. Return false otherwise.


// Solution: Simulation

// Keep track of the current coordinates and update them when following the directions in the path.
// Store the visited coordinates in a hashset.
// If we encounter a point already in the hashset, return true.

// n = length of path
// Time Complexity: O(n) 50ms
// Space Complexity: O(n) 42.3MB
var isPathCrossing = function(path) {
  let visited = new Set(['0,0']);
  let x = 0, y = 0;
  const directions = {
    'N': [-1, 0],
    'S': [1, 0],
    'E': [0, 1],
    'W': [0, -1]
  };
  for (let dir of path) {
    x += directions[dir][0];
    y += directions[dir][1];
    let coords = `${x},${y}`;
    if (visited.has(coords)) return true;
    visited.add(coords);
  }
  return false;
};

// Two test cases
console.log(isPathCrossing("NES")) // false
console.log(isPathCrossing("NESWW")) // true