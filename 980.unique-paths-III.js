// 980. Unique Paths III
// You are given an m x n integer array grid where grid[i][j] could be:
// 1 representing the starting square. There is exactly one starting square.
// 2 representing the ending square. There is exactly one ending square.
// 0 representing empty squares we can walk over.
// -1 representing obstacles that we cannot walk over.
// Return the number of 4-directional walks from the starting square to the ending square, that walk over every non-obstacle square exactly once.


// Solution: Backtracking

// Thoughts:
// We can use the original grid to mark cells as visited -> maybe mark cell as -2
// We count the number of valid cells (anything that isn't -1) (including start and target) 
// We save the position of the starting cell.

// Algorithm:
// loop through each cell in grid to find number of valid cells and the start cell
// call backtrack(start[0], start[1], valid)

// backtrack: (i, j, remain (remaining valid cells))
  // base case: if grid[i][j] is 2 AND remain is 1
    // increment total paths by one
    // return
  // save the original value of grid[i][j] in 'cell'
  // set grid[i][j] to -2 (visited)
  // decrement remain by one
  // if cell is valid (bigger than -1 (-2: visited, -1: obstacle))
    // loop through each [x, y] in directions
      // set newX to i + x
      // set newY to j + y
      // if newX is in bounds and newY is in bounds and grid[newX][newY] is valid (bigger than -1)
        // call backtrack(newX, newY, remain)
  // reset grid[i][j] to 'cell' 
  // increment remain by one


// Time Complexity: O(3^n) 76ms
// Space Complexity: O(n) 40.5MB
var uniquePathsIII = function(grid) {
  const directions = [[0, 1], [1, 0], [0, -1], [-1, 0]];
  let paths = 0;
  let width = grid[0].length, length = grid.length;
  let start = [], valid = 0;
  for (var i = 0; i < length; i++) {
    for (var j = 0; j < width; j++) {
      if (grid[i][j] > -1) valid++;
      if (grid[i][j] === 1) start = [i, j];
    }
  }
  backtrack(start[0], start[1], valid);
  return paths;
  function backtrack(i, j, remain) {
    if (grid[i][j] === 2 && remain === 1) {
      paths++;
      return;
    }
    let cell = grid[i][j];
    grid[i][j] = -2;
    remain--;
    if (cell > -1) {
      for (var [x, y] of directions) {
        let newX = i + x;
        let newY = j + y;
        if (newX > -1 && newX < length && newY > -1 && newY < width && grid[newX][newY] > -1) {
          backtrack(newX, newY, remain);
        }
      }
    }
    grid[i][j] = cell;
    remain++;
  }  
};

// Three test cases to run function on
console.log(uniquePathsIII([[1,0,0,0],[0,0,0,0],[0,0,2,-1]])) // 2
console.log(uniquePathsIII([[1,0,0,0],[0,0,0,0],[0,0,0,2]])) // 4
console.log(uniquePathsIII([[0,1],[2,0]])) // 0