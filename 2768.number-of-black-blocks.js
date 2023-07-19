// 2768. Number of Black Blocks
// You are given two integers m and n representing the dimensions of a 0-indexed m x n grid.
// You are also given a 0-indexed 2D integer matrix coordinates, where coordinates[i] = [x, y] indicates that the cell with coordinates [x, y] is colored black. All cells in the grid that do not appear in coordinates are white.
// A block is defined as a 2 x 2 submatrix of the grid. More formally, a block with cell [x, y] as its top-left corner where 0 <= x < m - 1 and 0 <= y < n - 1 contains the coordinates [x, y], [x + 1, y], [x, y + 1], and [x + 1, y + 1].
// Return a 0-indexed integer array arr of size 5 such that arr[i] is the number of blocks that contains exactly i black cells.


// Solution: Hashset

// Each non-corner cell is part of exactly 4 submatrices.
// Intially, set arr[0] to be the total number of submatrices in the grid (total number of cells - bottom and right cells -> m * n - (m + n - 1))
// Use a hashset to keep track of coordinates we have used so far.

// For each coordinate, go through each of the 4 submatrices that it is part of.
  // For each submatrix, count the number of black cells in each of the 4 submatrices based on which coordinates are currently in our hashset.
// Then, we can update the counts in arr based on the count of black cells in each submatrix (decrement arr[blackCells] and increment arr[blackCells + 1]).

// k = number of coordinates
// Time Complexity: O(4k) 1144ms
// Space Complexity: O(k) 90.1MB
var countBlackBlocks = function(m, n, coordinates) {
  let arr = Array(5).fill(0), used = new Set();
  arr[0] = m * n - (m + n - 1);
  for (let [x, y] of coordinates) {
    let leftCorners = [[x - 1, y - 1], [x - 1, y], [x, y - 1], [x, y]];
    for (let [row, col] of leftCorners) {
      if (row < 0 || col < 0 || row + 1 >= m || col + 1 >= n) continue; // this submatrix goes out of bounds
      let submatrixCells = [[row, col], [row, col + 1], [row + 1, col], [row + 1, col + 1]];
      // count the number of black cells in the submatrix with the top left corner (row, col)
      let blackCells = submatrixCells.reduce((count, coord) => {
        return count + (used.has(`${coord[0]},${coord[1]}`) ? 1 : 0); 
      }, 0);
      arr[blackCells]--;
      arr[blackCells + 1]++;
    }
    used.add(`${x},${y}`);
  }
  return arr;
};

// Two test cases
console.log(countBlackBlocks(3, 3, [[0,0]])) // [3,1,0,0,0]
console.log(countBlackBlocks(3, 3, [[0,0],[1,1],[0,2]])) // [0,2,2,0,0]