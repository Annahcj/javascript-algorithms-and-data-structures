// 489. Robot Room Cleaner
// You are controlling a robot that is located somewhere in a room. The room is modeled as an m x n binary grid where 0 represents a wall and 1 represents an empty slot.
// The robot starts at an unknown location in the root that is guaranteed to be empty, and you do not have access to the grid, but you can move the robot using the given API Robot.
// You are tasked to use the robot to clean the entire room (i.e., clean every empty cell in the room). The robot with the four given APIs can move forward, turn left, or turn right. Each turn is 90 degrees.
// When the robot tries to move into a wall cell, its bumper sensor detects the obstacle, and it stays on the current cell.
// Design an algorithm to clean the entire room.


// Solution: Backtracking

// n = rows in grid, m = columns in grid
// Time Complexity: O(nm) 84ms
// Space Complexity: O(nm) 42.8MB
var cleanRoom = function(robot) {
  let seen = new Set();
  let directions = [[-1, 0], [0, 1], [1, 0], [0, -1]]; // up, right, down, left
  backtrack(0, 0, 0);

  function backtrack(row, col, dir) {
    seen.add(`${row},${col}`); // mark as visited
    robot.clean(); 
    for (let i = 0; i < 4; i++) {
      let newDir = (dir + i) % 4;
      let newX = row + directions[newDir][0], newY = col + directions[newDir][1];
      if (!seen.has(`${newX},${newY}`) && robot.move()) { // if we haven't visited the cell yet and the cell is not an obstacle
        backtrack(newX, newY, newDir); // go to new cell
        goBack(); // backtrack, go back to the previous cell with the same direction
      }
      robot.turnRight(); // turn right
    }
  }
  
  function goBack() { // face backwards, move, face forwards.
    robot.turnRight();
    robot.turnRight();
    robot.move();
    robot.turnRight();
    robot.turnRight();
  }
};