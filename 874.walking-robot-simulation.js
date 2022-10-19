// 874. Walking Robot Simulation
// A robot on an infinite XY-plane starts at point (0, 0) facing north. The robot can receive a sequence of these three possible types of commands:
  // -2: Turn left 90 degrees.
  // -1: Turn right 90 degrees.
  // 1 <= k <= 9: Move forward k units, one unit at a time.
// Some of the grid squares are obstacles. The ith obstacle is at grid point obstacles[i] = (xi, yi). If the robot runs into an obstacle, then it will instead stay in its current location and move on to the next command.
// Return the maximum Euclidean distance that the robot ever gets from the origin squared (i.e. if the distance is 5, return 25).


// Solution: Simulation

// Simulate the robot moving for each command.
// Store each obstacle in a set for quick lookup.
// Calculate the next position for each move, if the next position is an obstacle, quit the current command.

// Keep four directions (in order of N, E, S, W) in an array.
// Keep track of the index "dir" in the directions array.
  // When we turn right, increment dir by 1.
  // When we turn left, decrement dir by 1.

// n = number of commands, m = number of obstacles
// Time Complexity: O(nk) 208ms
// Space Complexity: O(m) 58.2MB
var robotSim = function(commands, obstacles) {
  const directions = [[0, 1], [1, 0], [0, -1], [-1, 0]]; // N, E, S, W
  let dir = 0, maxDist = 0;
  let x = 0, y = 0;
  let obstaclesSet = new Set(obstacles.map(([x, y]) => `${x},${y}`));
  for (let command of commands) {
    if (command === -1) { // turn right
      dir = (dir + 1) % 4;
    } else if (command === -2) { // turn left
      dir = (dir + 4 - 1) % 4;
    } else { // move forward k units
      for (let i = 0; i < command; i++) {
        let newX = x + directions[dir][0], newY = y + directions[dir][1];
        if (obstaclesSet.has(`${newX},${newY}`)) break;
        x = newX, y = newY;
        let distFromOrigin = (x * x) + (y * y);
        maxDist = Math.max(maxDist, distFromOrigin);
      }
    }
  }
  return maxDist;
};

// Three test cases
console.log(robotSim([4,-1,3], [])) // 25
console.log(robotSim([4,-1,4,-2,4], [[2,4]])) // 65
console.log(robotSim([6,-1,-1,6], [])) // 36