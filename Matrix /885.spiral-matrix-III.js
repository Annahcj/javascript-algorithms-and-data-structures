// 885. Spiral Matrix III
// You start at the cell (rStart, cStart) of an rows x cols grid facing east. The northwest corner is at the first row and column in the grid, and the southeast corner is at the last row and column.
// You will walk in a clockwise spiral shape to visit every position in this grid. Whenever you move outside the grid's boundary, we continue our walk outside the grid (but may return to the grid boundary later.). Eventually, we reach all rows * cols spaces of the grid.
// Return an array of coordinates representing the positions of the grid in the order you visited them.

 
// Solution: Simulation

// Every two direction changes, the number of steps in a direction increases by 1.
// i.e.
  // Round 1: 
    // Right: 1 step
    // Down: 1 step
    // Left: 2 steps
    // Up: 2 steps
  // Round 2:
    // Right: 3 steps
    // Down: 3 steps
    // Left: 4 steps
    // Up: 4 steps
  // Round 3:
    // ...

// Simulate the walk.

// Time Complexity: O(max(rows, col)^2) 83ms
// Space Complexity: O(1) (excluding output) 57.9MB
var spiralMatrixIII = function(rows, cols, rStart, cStart) {
  let row = rStart, col = cStart;
  const directions = [[0, 1], [1, 0], [0, -1], [-1, 0]]; // R, D, L, U
  let steps = 1, coords = [[rStart, cStart]];
  let dirIndex = 0;
  while (coords.length < rows * cols) {
    for (let i = 0; i < steps; i++) {
      row += directions[dirIndex][0];
      col += directions[dirIndex][1];
      if (row >= 0 && row < rows && col >= 0 && col < cols) {
        coords.push([row, col]); 
      }
    }
    if (dirIndex % 2 === 1) steps++;
    dirIndex = (dirIndex + 1) % 4;
  }
  return coords;
};

// Two test cases 
console.log(spiralMatrixIII(1, 4, 0, 0)) // [[0,0],[0,1],[0,2],[0,3]]
console.log(spiralMatrixIII(5, 6, 1, 4)) // [[1,4],[1,5],[2,5],[2,4],[2,3],[1,3],[0,3],[0,4],[0,5],[3,5],[3,4],[3,3],[3,2],[2,2],[1,2],[0,2],[4,5],[4,4],[4,3],[4,2],[4,1],[3,1],[2,1],[1,1],[0,1],[4,0],[3,0],[2,0],[1,0],[0,0]]