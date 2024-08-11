// 3248. Snake in Matrix
// There is a snake in an n x n matrix grid and can move in four possible directions. Each cell in the grid is identified by the position: grid[i][j] = (i * n) + j.
// The snake starts at cell 0 and follows a sequence of commands.
// You are given an integer n representing the size of the grid and an array of strings commands where each command[i] is either "UP", "RIGHT", "DOWN", and "LEFT". It's guaranteed that the snake will remain within the grid boundaries throughout its movement.
// Return the position of the final cell where the snake ends up after executing commands.


// Solution: Simulation

// Map each direction to the coordinate difference when we move.
// Simulate the process starting from (0, 0) and return the cell after going through all commands.

// m = length of commands
// Time Complexity: O(m) 62ms
// Space Complexity: O(1) 54.1MB
function finalPositionOfSnake(n, commands) {
  const directions = {
    'UP': [-1, 0],
    'RIGHT': [0, 1],
    'DOWN': [1, 0],
    'LEFT': [0, -1]
  };
  let row = 0, col = 0;
  for (let command of commands) {
    let [x, y] = directions[command];
    row += x, col += y;
  }
  return row * n + col;
};

// Two test cases
console.log(finalPositionOfSnake(2, ["RIGHT","DOWN"])) // 3
console.log(finalPositionOfSnake(3, ["DOWN","RIGHT","UP"])) // 1