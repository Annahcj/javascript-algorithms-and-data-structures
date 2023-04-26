// 2624. Snail Traversal
// Write code that enhances all arrays such that you can call the snail(rowsCount, colsCount) method that transforms the 1D array into a 2D array organised in the pattern known as snail traversal order. Invalid input values should output an empty array. If rowsCount * colsCount !== nums.length, the input is considered invalid.
// Snail traversal order starts at the top left cell with the first value of the current array. It then moves through the entire first column from top to bottom, followed by moving to the next column on the right and traversing it from bottom to top. This pattern continues, alternating the direction of traversal with each column, until the entire current array is covered. For example, when given the input array [19, 10, 3, 7, 9, 8, 5, 2, 1, 17, 16, 14, 12, 18, 6, 13, 11, 20, 4, 15] with rowsCount = 5 and colsCount = 4, the desired output matrix is shown below. Note that iterating the matrix following the arrows corresponds to the order of numbers in the original array.


// Solution: Simulation

// Fill the matrix column by column.
// If the column is even, fill from top to bottom.
// If the column is odd, fill from bottom to top.

// m = number of rows, n = number of columns
// Time Complexity: O(mn) 227ms
// Space Complexity: O(mn) 65.2MB
Array.prototype.snail = function(rowsCount, colsCount) {
  if (rowsCount * colsCount !== this.length) return [];
  let matrix = Array(rowsCount).fill(0).map(() => Array(colsCount));
  for (let j = 0; j < colsCount; j++) {
    for (let i = 0; i < rowsCount; i++) {
      let index = j * rowsCount + i;
      if (j % 2 === 0) matrix[i][j] = this[index]; // even column - top down
      else matrix[rowsCount - i - 1][j] = this[index]; // odd column - bottom up
    }
  }
  return matrix;
}