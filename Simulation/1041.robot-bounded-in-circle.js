// 1041. Robot Bounded In Circle
// On an infinite plane, a robot initially stands at (0, 0) and faces north. The robot can receive one of three instructions:
// "G": go straight 1 unit;
// "L": turn 90 degrees to the left;
// "R": turn 90 degrees to the right.
// The robot performs the instructions given in order, and repeats them forever.
// Return true if and only if there exists a circle in the plane such that the robot never leaves the circle.


// Solution 1: One Pass

// Thoughts:
// We are able to figure out whether the robot is in a circle or not with just one run of the given instructions. 
// Say the instructions are 'LG'
// The robot starts from (0, 0) and always points north.
// After we run the instructions once, the robot will be in position (-1, 0) and will point west.
// We know for sure the robot is in a circle if x is 0 and y is 0. (position is the same, direction may be different)
// However, if the position is different, and the direction is the same, we know that it will infinitely go in that direction (north).
// Therefore, if the position is different and the direction is different, we know that it will always come back to the origin after a certain amount of cycles.

// Algorithm:
// Store directions in an array.
// Set both x and y to 0 (starting point)
// Set variable i to 0 (i indicates the direction the robot is pointing)
// Loop through instructions (pointer = j)
  // If instructions[j] is 'R', update i to be (i + 1) modular 4. 
  // If instructions[j] is 'L', update i to be (i + 3) modular 4.
  // Else, increment x by directions[i][0] and y by directions[i][1]
// - end of iteration -
// If (x is 0 and y is 0) (always stays at origin) or i is not zero (facing a different direction), return true.
// Otherwise return false.

// Time Complexity: O(n) 64ms
// Space Complexity: O(1) 38.9MB
var isRobotBounded = function(instructions) {
  const directions = [[0, 1], [1, 0], [0, -1], [-1, 0]];
  let x = 0, y = 0;
  let i = 0;
  for (let j = 0; j < instructions.length; j++) {
    if (instructions[j] === 'R') {
      i = (i + 1) % 4;
    } else if (instructions[j] === 'L') {
      i = (i + 3) % 4;
    } else {
      x += directions[i][0], y += directions[i][1];
      // go forward, add dir[i][0] to x and dir[i][1] to y
    }
  }
  if (x === 0 && y === 0 || i !== 0) return true;
  return false;
};

// Four test cases
console.log(isRobotBounded("LGGG")) // true
console.log(isRobotBounded("GGLLGG")) // true
console.log(isRobotBounded("GG")) // false
console.log(isRobotBounded("GL")) // true