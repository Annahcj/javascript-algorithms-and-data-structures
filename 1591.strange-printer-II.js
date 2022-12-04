// 1591. Strange Printer II
// There is a strange printer with the following two special requirements:
  // On each turn, the printer will print a solid rectangular pattern of a single color on the grid. This will cover up the existing colors in the rectangle.
  // Once the printer has used a color for the above operation, the same color cannot be used again.
// You are given a m x n matrix targetGrid, where targetGrid[row][col] is the color in the position (row, col) of the grid.
// Return true if it is possible to print the matrix targetGrid, otherwise, return false.


// Solution: Process Colors in Reverse Order

// Work through each color in reverse order.
// Eliminate colors with no dependencies (no other colors within the rectangle).
// When a rectangle with color "a" contains other colors, all others colors must be removed before we can resolve the color "a".

// 1. Go through the grid, record the top left and bottom right corner for each color.
// 2. While there are still colors to eliminate, eliminate colors that have no other colors inside its rectangle.
  // If we reach a point where there are still colors left but we can't eliminate any of them, then we have a dependency cycle. Return false.

// Time Complexity: O(mn * k^2) 190ms
// Space Complexity: O(k) 48.1MB
var isPrintable = function(targetGrid) {
  let m = targetGrid.length, n = targetGrid[0].length;
  let colors = new Map();
  for (let i = 0; i < m; i++) {
    for (let j = 0; j < n; j++) {
      let color = targetGrid[i][j];
      let coordinates = colors.get(color) || [Infinity, Infinity, -Infinity, -Infinity]; // min row, min col, max row, max col
      coordinates[0] = Math.min(coordinates[0], i);
      coordinates[1] = Math.min(coordinates[1], j);
      coordinates[2] = Math.max(coordinates[2], i);
      coordinates[3] = Math.max(coordinates[3], j);
      colors.set(color, coordinates);
    }
  }
  
  while (colors.size > 0) {
    let originalSize = colors.size;
    for (let [color, coordinates] of colors) {
      if (hasNoOtherColor(targetGrid, coordinates, color)) {
        fillWithZero(targetGrid, coordinates);
        colors.delete(color);
      }
    }
    if (colors.size === originalSize) return false; // colors are in a cycle, so can never resolve dependencies
  }
  return true;
};
  
function hasNoOtherColor(grid, coordinates, color) {
  let [minRow, minCol, maxRow, maxCol] = coordinates;
  for (let i = minRow; i <= maxRow; i++) {
    for (let j = minCol; j <= maxCol; j++) {
      if (grid[i][j] !== 0 && grid[i][j] !== color) return false; // contains other color
    }
  }
  return true;
}

function fillWithZero(grid, coordinates) {
  let [minRow, minCol, maxRow, maxCol] = coordinates;
  for (let i = minRow; i <= maxRow; i++) {
    for (let j = minCol; j <= maxCol; j++) {
      grid[i][j] = 0;
    }
  }
}

// Three test cases
console.log(isPrintable([[1,1,1,1],[1,2,2,1],[1,2,2,1],[1,1,1,1]])) // true
console.log(isPrintable([[1,1,1,1],[1,1,3,3],[1,1,3,4],[5,5,1,4]])) // true
console.log(isPrintable([[1,2,1],[2,1,2],[1,2,1]])) // false