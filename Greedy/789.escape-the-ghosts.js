// 789. Escape The Ghosts
// You are playing a simplified PAC-MAN game on an infinite 2-D grid. You start at the point [0, 0], and you are given a destination point target = [xtarget, ytarget] that you are trying to get to. There are several ghosts on the map with their starting positions given as a 2D array ghosts, where ghosts[i] = [xi, yi] represents the starting position of the ith ghost. All inputs are integral coordinates.
// Each turn, you and all the ghosts may independently choose to either move 1 unit in any of the four cardinal directions: north, east, south, or west, or stay still. All actions happen simultaneously.
// You escape if and only if you can reach the target before any ghost reaches you. If you reach any square (including the target) at the same time as a ghost, it does not count as an escape.
// Return true if it is possible to escape regardless of how the ghosts move, otherwise return false.


// Solution: Distance to Target

// Ghosts should always try and reach the target in the shortest way possible.
// If any ghost gets there earlier or the same time as you, you can't escape it no matter how you move.
// Hence, if your distance to the target is shorter than all distances of the ghosts to the target, you can escape, otherwise you can't.

// n = length of ghosts
// Time Complexity: O(n) 116ms
// Space Complexity: O(1) 42.2MB
var escapeGhosts = function(ghosts, target) {
  let dist = Math.abs(target[0]) + Math.abs(target[1]); // distance from you to target
  for (let coords of ghosts) {
    if (getDist(coords, target) <= dist) return false;
  }
  return true;
  
  function getDist(p1, p2) {
    return Math.abs(p1[0] - p2[0]) + Math.abs(p1[1] - p2[1]);
  }
};

// Two test cases to run function on
console.log(escapeGhosts([[1,0],[0,3]], [0,1])) // true
console.log(escapeGhosts([[1,0]], [2,0])) // false