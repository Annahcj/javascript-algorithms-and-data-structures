// 2713. Maximum Strictly Increasing Cells in a Matrix
// Given a 1-indexed m x n integer matrix mat, you can select any cell in the matrix as your starting cell.
// From the starting cell, you can move to any other cell in the same row or column, but only if the value of the destination cell is strictly greater than the value of the current cell. You can repeat this process as many times as possible, moving from cell to cell until you can no longer make any moves.
// Your task is to find the maximum number of cells that you can visit in the matrix by starting from some cell.
// Return an integer denoting the maximum number of cells that can be visited.


// Solution: Sorting & DP

// Map each mat[i][j] to coordinates in the matrix ({cell value: [position in mat, position in mat, ...], ...}).
// Sort the coordinates by value in asc order.
// Note: We need to use a map since cells with equal value cannot be included in the same sequence.
// Go through each sorted cell, and keep track of the maximum result in each row and column.
// Keep updating the maximum result as we visit each cell.

// Time Complexity: O(mn) 1358ms
// Space Complexity: O(mn) 206.8MB
var maxIncreasingCells = function(mat) {
  let m = mat.length, n = mat[0].length;
  let cellsMap = {};
  for (let i = 0; i < m; i++) {
    for (let j = 0; j < n; j++) {
      let value = mat[i][j];
      if (!cellsMap[value]) cellsMap[value] = [];
      cellsMap[value].push([i, j]);
    }
  }
  let cells = Object.entries(cellsMap).sort((a, b) => Number(a[0]) - Number(b[0]));
  let maxScore = Array(m).fill(0).map(() => Array(n).fill(0));
  let maxRowScore = Array(m).fill(0), maxColScore = Array(n).fill(0);
  let ans = 0;
  for (let [_value, coords] of cells) {
    for (let [row, col] of coords) {
      maxScore[row][col] = Math.max(maxRowScore[row], maxColScore[col]) + 1;
      ans = Math.max(ans, maxScore[row][col]);
    }
    for (let [row, col] of coords) {
      maxRowScore[row] = Math.max(maxRowScore[row], maxScore[row][col]);
      maxColScore[col] = Math.max(maxColScore[col], maxScore[row][col]);
    }
  }
  return ans;
};

// Three test cases
console.log(maxIncreasingCells([[3,1],[3,4]])) // 2
console.log(maxIncreasingCells([[1,1],[1,1]])) // 1
console.log(maxIncreasingCells([[3,1,6],[-9,5,7]])) // 4