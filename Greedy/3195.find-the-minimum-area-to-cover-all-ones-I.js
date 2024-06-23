// 3195. Find the Minimum Area to Cover All Ones I
// You are given a 2D binary array grid. Find a rectangle with horizontal and vertical sides with the smallest area, such that all the 1's in grid lie inside this rectangle.
// Return the minimum possible area of the rectangle.


// Solution: Greedy

// Find the following out of all occurances of 1:
  // 1. Smallest row
  // 2. Biggest row
  // 3. Smallest column
  // 4. Biggest column

// From these we can now calculate the area of the rectangle.

// m = number of rows, n = number of columns
// Time Complexity: O(mn) 133ms
// Space Complexity: O(1) 84.5MB
var minimumArea = function(grid) {
  let m = grid.length, n = grid[0].length;
  let minRow = Infinity, maxRow = -Infinity;
  let minCol = Infinity, maxCol = -Infinity;
  for (let i = 0; i < m; i++) {
    for (let j = 0; j < n; j++) {
      if (grid[i][j] === 1) {
        minRow = Math.min(minRow, i);
        maxRow = Math.max(maxRow, i);
        minCol = Math.min(minCol, j);
        maxCol = Math.max(maxCol, j);
      }
    } 
  }
  return (maxRow - minRow + 1) * (maxCol - minCol + 1);
};

// Two test cases
console.log(minimumArea([[0,1,0],[1,0,1]])) // 6
console.log(minimumArea([[0,0],[1,0]])) // 1