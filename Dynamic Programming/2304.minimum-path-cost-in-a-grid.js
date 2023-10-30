// 2304. Minimum Path Cost in a Grid
// You are given a 0-indexed m x n integer matrix grid consisting of distinct integers from 0 to m * n - 1. You can move in this matrix from a cell to any other cell in the next row. That is, if you are in cell (x, y) such that x < m - 1, you can move to any of the cells (x + 1, 0), (x + 1, 1), ..., (x + 1, n - 1). Note that it is not possible to move from cells in the last row.
// Each possible move has a cost given by a 0-indexed 2D array moveCost of size (m * n) x n, where moveCost[i][j] is the cost of moving from a cell with value i to a cell in column j of the next row. The cost of moving from cells in the last row of grid can be ignored.
// The cost of a path in grid is the sum of all values of cells visited plus the sum of costs of all the moves made. Return the minimum cost of a path that starts from any cell in the first row and ends at any cell in the last row.


// Solution: Dynamic Programming

// We only need information about the previous and current row.
// Use two arrays of size n (prev and curr) to keep track of the minimum cost to travel to each cell in a row.
// For each cell in a row, take the minimum cost of going from each cell in the previous row.

// m = number of rows, n = number of columns
// Time Complexity: O(m * n * n) 174ms
// Space Complexity: O(n) 55.5MB
var minPathCost = function(grid, moveCost) {
  let m = grid.length, n = grid[0].length;
  let prev = [...grid[0]];
  for (let i = 1; i < m; i++) { 
    let curr = Array(n).fill(Infinity);
    for (let j = 0; j < n; j++) { // curr row's columns
      for (let k = 0; k < n; k++) { // prev row's columns
        let prevCell = grid[i - 1][k], currCell = grid[i][j];
        curr[j] = Math.min(prev[k] + moveCost[prevCell][j] + currCell, curr[j]);
      }
    }
    prev = curr;
  }
  return Math.min(...prev);
};

// Two test cases
console.log(minPathCost([[5,3],[4,0],[2,1]], [[9,8],[1,5],[10,12],[18,6],[2,4],[14,3]])) // 17
console.log(minPathCost([[5,1,2],[4,0,3]], [[12,10,15],[20,23,8],[21,7,1],[8,1,13],[9,10,25],[5,3,2]])) // 6