// 3197. Find the Minimum Area to Cover All Ones II
// You are given a 2D binary array grid. You need to find 3 non-overlapping rectangles having non-zero areas with horizontal and vertical sides such that all the 1's in grid lie inside these rectangles.
// Return the minimum possible sum of the area of these rectangles.
// Note that the rectangles are allowed to touch.


// Solution: Two Partitions & Greedy

// Split the grid twice using either a vertical or horizontal partition.
// Note that the three areas will cover the whole grid.
// For each area, find the minimum area of a rectangle that covers all 1's within the area.

// There are six possible partition types:
  // 1. Horizontal + Horizontal (don't worry about the order of partitions, it goes through every combination whether we split top or the bottom area on the second partition)
  // 2. Horizontal + Vertical on the Top Area
  // 3. Horizontal + Vertical on the Bottom Area
  // 4. Vertical + Vertical
  // 5. Vertical + Horizontal on the Left Area
  // 6. Vertical + Horizontal on the Right Area

// Time Complexity: O(m^2 * n^2) 227ms
// Space Complexity: O(1) 58.3MB
var minimumSum = function(grid) {
  let m = grid.length, n = grid[0].length;
  let minSum = Infinity;
  // try every horizontal partition
  for (let i = 0; i < m - 1; i++) { // row that ends first area
    // Horizontal + Horizontal
    for (let j = i + 1; j < m - 1; j++) { // row that ends second area
      if (i === m - 2) continue; // this is only allowed when the second split is vertical
      let firstArea = minArea(grid, [0, 0], [i, n - 1]);
      let secondArea = minArea(grid, [i + 1, 0], [j, n - 1]);
      let thirdArea = minArea(grid, [j + 1, 0], [m - 1, n - 1]);
      minSum = Math.min(minSum, firstArea + secondArea + thirdArea);
    }
    for (let j = 0; j < n - 1; j++) { // column that ends second area
      // Horizontal + Vertical on the Left Area
      let firstArea = minArea(grid, [0, 0], [i, j]); 
      let secondArea = minArea(grid, [0, j + 1], [i, n - 1]);
      let thirdArea = minArea(grid, [i + 1, 0], [m - 1, n - 1]);
      minSum = Math.min(minSum, firstArea + secondArea + thirdArea);
      
      // Horizontal + Vertical on the Right Area
      firstArea = minArea(grid, [0, 0], [i, n - 1]); 
      secondArea = minArea(grid, [i + 1, 0], [m - 1, j]);
      thirdArea = minArea(grid, [i + 1, j + 1], [m - 1, n - 1]);
      minSum = Math.min(minSum, firstArea + secondArea + thirdArea);
    }
  }
  
  for (let j = 0; j < n - 1; j++) {
    // Vertical + Vertical
    for (let i = j + 1; i < n - 1; i++) {
      if (j === n - 2) continue; // this is only allowed when the second split is horizontal
      let firstArea = minArea(grid, [0, 0], [m - 1, j]);
      let secondArea = minArea(grid, [0, j + 1], [m - 1, i]);
      let thirdArea = minArea(grid, [0, i + 1], [m - 1, n - 1]);
      minSum = Math.min(minSum, firstArea + secondArea + thirdArea);
    }
    for (let i = 0; i < m - 1; i++) {
      // Vertical + Horizontal on the Left Area
      let firstArea = minArea(grid, [0, 0], [i, j]);
      let secondArea = minArea(grid, [i + 1, 0], [m - 1, j]);
      let thirdArea = minArea(grid, [0, j + 1], [m - 1, n - 1]);
      minSum = Math.min(minSum, firstArea + secondArea + thirdArea);
      
      // Vertical + Horizontal on the Right Area
      firstArea = minArea(grid, [0, 0], [m - 1, j]); 
      secondArea = minArea(grid, [0, j + 1], [i, n - 1]);
      thirdArea = minArea(grid, [i + 1, j + 1], [m - 1, n - 1]);
      minSum = Math.min(minSum, firstArea + secondArea + thirdArea);
    }
  }
  return minSum;
};
         
// Find the minimum area of the rectangle that will cover all 1's within the sub-rectangle
function minArea(grid, topLeft, bottomRight) {
  let minRow = Infinity, maxRow = -Infinity;
  let minCol = Infinity, maxCol = -Infinity;
  for (let i = topLeft[0]; i <= bottomRight[0]; i++) {
    for (let j = topLeft[1]; j <= bottomRight[1]; j++) {
      if (grid[i][j] === 1) {
        minRow = Math.min(minRow, i);
        maxRow = Math.max(maxRow, i);
        minCol = Math.min(minCol, j);
        maxCol = Math.max(maxCol, j);
      }
    }
  }
  if (minRow === Infinity) return 0;
  return (maxRow - minRow + 1) * (maxCol - minCol + 1);
}

// Two test cases
console.log(minimumSum([[1,0,1],[1,1,1]])) // 5
console.log(minimumSum([[1,0,1,0],[0,1,0,1]])) // 5