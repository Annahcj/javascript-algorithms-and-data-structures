// 2751. Robot Collisions
// There are n 1-indexed robots, each having a position on a line, health, and movement direction.
// You are given 0-indexed integer arrays positions, healths, and a string directions (directions[i] is either 'L' for left or 'R' for right). All integers in positions are unique.
// All robots start moving on the line simultaneously at the same speed in their given directions. If two robots ever share the same position while moving, they will collide.
// If two robots collide, the robot with lower health is removed from the line, and the health of the other robot decreases by one. The surviving robot continues in the same direction it was going. If both robots have the same health, they are both removed from the line.
// Your task is to determine the health of the robots that survive the collisions, in the same order that the robots were given, i.e. final heath of robot 1 (if survived), final health of robot 2 (if survived), and so on. If there are no survivors, return an empty array.
// Return an array containing the health of the remaining robots (in the order they were given in the input), after no further collisions can occur.
// Note: The positions may be unsorted.


// Solution: Stack

// Note: The positions don't affect which robots will collide with each other, this stays the same no matter what. Robots adjacent to each other going right and left will always collide.
// In the stack, keep track of robots we have processed so far that have still survived.

// If the current robot is going left,
  // We need to eliminate all right-going robots with smaller health at the top of the stack, while decreasing the health of the current robot. 
  // If the robot at the top of the stack is right-going and the health is greater, then remove the current robot and decrease the health of the robot at the top of the stack.
  // If the robot at the top of the stack is right-going and the health is the same, remove both.

// If the current robot is going right, then just push it onto the stack to be dealt with later.

// n = number of robots
// Time Complexity: O(n log(n)) 311ms
// Space Complexity: O(n) 91.4MB
var survivedRobotsHealths = function(positions, healths, directions) {
  let n = positions.length, stack = [], robots = [];
  for (let i = 0; i < n; i++) {
    robots.push({position: positions[i], health: healths[i], direction: directions[i], originalIndex: i})
  }
  robots.sort((a, b) => a.position - b.position); 
  for (let i = 0; i < n; i++) {
    if (robots[i].direction === 'L') {
      // remove right-going robots with smaller health from the top of the stack while decreasing the current robot's health
      while (stack.length && robots[stack[stack.length - 1]].direction === 'R' && robots[stack[stack.length - 1]].health < robots[i].health) {
        stack.pop();
        robots[i].health--;
      }
      if (stack.length === 0 || robots[stack[stack.length - 1]].direction === 'L') stack.push(i); // no more collisions, add current robot to stack
      else if (stack.length > 0 && robots[stack[stack.length - 1]].health === robots[i].health) stack.pop(); // health is same, remove both
      else if (stack.length > 0 && robots[stack[stack.length - 1]].health > robots[i].health) robots[stack[stack.length - 1]].health--; // right-going robot has greater health, remove current robot and decrease right-going robot's health
    } else {
      stack.push(i);
    }
  }
  return stack.sort((a, b) => robots[a].originalIndex - robots[b].originalIndex).map((i) => robots[i].health);
};

// Three test cases
console.log(survivedRobotsHealths([5,4,3,2,1], [2,17,9,15,10], "RRRRR")) // [2,17,9,15,10]
console.log(survivedRobotsHealths([3,5,2,6], [10,10,15,12], "RLRL")) // [14]
console.log(survivedRobotsHealths([1,2,5,6], [10,10,11,11], "RLRL")) // []