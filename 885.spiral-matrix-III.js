// 885. Spiral Matrix III
// You start at the cell (rStart, cStart) of an rows x cols grid facing east. The northwest corner is at the first row and column in the grid, and the southeast corner is at the last row and column.
// You will walk in a clockwise spiral shape to visit every position in this grid. Whenever you move outside the grid's boundary, we continue our walk outside the grid (but may return to the grid boundary later.). Eventually, we reach all rows * cols spaces of the grid.
// Return an array of coordinates representing the positions of the grid in the order you visited them.

 
// Solution: Simulation

// Simulate the walk.
// The pattern is that the length to walk increases every two directions you move.
// Before collecting each coordinate, check whether they are valid (in bounds).

// Time Complexity: O(mn) 156ms
// Space Complexity: O(1) (not including output) 50.1MB
var spiralMatrixIII = function(rows, cols, rStart, cStart) {
  let res = [], size = 1, dir = 0;
  const directions = [[0, 1], [1, 0], [0, -1], [-1, 0]]; // R, D, L, U
  
  let row = rStart, col = cStart;
  while (res.length < rows * cols) {
    for (let i = 0; i < 2; i++) {
      for (let j = 0; j < size; j++) {
        if (isValid(row, col)) res.push([row, col]);
        row += directions[dir][0], col += directions[dir][1];
      }
      dir = (dir + 1) % 4;
    }
    size++;
  }
  return res;
  
  function isValid(row, col) {
    return row >= 0 && row < rows && col >= 0 && col < cols;
  }
};

// Two test cases to run function on
console.log(spiralMatrixIII(1, 4, 0, 0)) // [[0,0],[0,1],[0,2],[0,3]]
console.log(spiralMatrixIII(5, 6, 1, 4)) // [[1,4],[1,5],[2,5],[2,4],[2,3],[1,3],[0,3],[0,4],[0,5],[3,5],[3,4],[3,3],[3,2],[2,2],[1,2],[0,2],[4,5],[4,4],[4,3],[4,2],[4,1],[3,1],[2,1],[1,1],[0,1],[4,0],[3,0],[2,0],[1,0],[0,0]]