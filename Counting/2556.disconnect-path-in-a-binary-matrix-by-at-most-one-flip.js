// 2556. Disconnect Path in a Binary Matrix by at Most One Flip
// You are given a 0-indexed m x n binary matrix grid. You can move from a cell (row, col) to any of the cells (row + 1, col) or (row, col + 1) that has the value 1. The matrix is disconnected if there is no path from (0, 0) to (m - 1, n - 1).
// You can flip the value of at most one (possibly none) cell. You cannot flip the cells (0, 0) and (m - 1, n - 1).
// Return true if it is possible to make the matrix disconnect or false otherwise.
// Note that flipping a cell changes its value from 0 to 1 or from 1 to 0.


// Solution: Count Diagonals 

// Count paths from each cell: paths[i][j] = 1 if there is a path from (i, j) to (m - 1, n - 1), given there is a path from (0, 0) to (i, j).
// If any diagonal only has one cell with a path to (m - 1, n - 1), then it is possible to disconnect the matrix.
  // diagonal = top-right to left-bottom
  // Cells in the same diagonal line have the same row+column value.
  // Store the count of cells with a path to (m - 1, n - 1) in the same diagonal line.  

// m = number of rows, n = number of columns
// Time Complexity: O(mn) 113ms
// Space Complexity: O(mn)  52.5MB
var isPossibleToCutPath = function(grid) {
  let m = grid.length, n = grid[0].length;
  let paths = Array(m).fill(0).map(() => Array(n).fill(0));
  let diagonalCounts = Array(m + n - 1).fill(0);
  // Check if it is possible to reach (m - 1, n - 1) from (i, j)
  for (let i = m - 1; i >= 0; i--) {
    for (let j = n - 1; j >= 0; j--) {
      if (i === m - 1 && j === n - 1) {
        paths[i][j] = 1;
        continue;
      }
      if (grid[i][j] === 0) continue;
      let down = i === m - 1 ? 0 : paths[i + 1][j];
      let right = j === n - 1 ? 0 : paths[i][j + 1];
      paths[i][j] = down || right ? 1 : 0;
    }
  }
  
  // Check if it is possible to reach (i, j) from (0, 0).
  for (let i = 0; i < m; i++) {
    for (let j = 0; j < n; j++) {
      if (paths[i][j] === 0) continue; // there is no path from (i, j) to (m - 1, n - 1)
      if (i === 0 && j === 0) {
        paths[i][j] = 1;
        continue;
      }
      let up = i === 0 ? 0 : paths[i - 1][j];
      let left = j === 0 ? 0 : paths[i][j - 1];
      if (up || left) { // there is at least one path 
        paths[i][j] = 1;
        diagonalCounts[i + j]++;
      } else {
        paths[i][j] = 0;
      }
    }
  }
  
  // Check if any diagonal line has at most 1 cell with a path to (m - 1, n - 1)
  for (let i = 1; i < m + n - 2; i++) {
    if (diagonalCounts[i] <= 1) return true;
  }
  return false;
};

// Two test cases
console.log(isPossibleToCutPath([[1,1,1],[1,0,0],[1,1,1]])) // true
console.log(isPossibleToCutPath([[1,1,1],[1,0,1],[1,1,1]])) // false