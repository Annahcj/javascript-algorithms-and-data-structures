// 2711. Difference of Number of Distinct Values on Diagonals
// Given a 0-indexed 2D grid of size m x n, you should find the matrix answer of size m x n.
// The value of each cell (r, c) of the matrix answer is calculated in the following way:
  // Let topLeft[r][c] be the number of distinct values in the top-left diagonal of the cell (r, c) in the matrix grid.
  // Let bottomRight[r][c] be the number of distinct values in the bottom-right diagonal of the cell (r, c) in the matrix grid.
// Then answer[r][c] = |topLeft[r][c] - bottomRight[r][c]|.
// Return the matrix answer.
// A matrix diagonal is a diagonal line of cells starting from some cell in either the topmost row or leftmost column and going in the bottom-right direction until reaching the matrix's end.
// A cell (r1, c1) belongs to the top-left diagonal of the cell (r, c), if both belong to the same diagonal and r1 < r. Similarly is defined bottom-right diagonal.


// Solution: Precompute Prefix Sum 

// Precompute the prefix sum: for each diagonal, start from the top left and bottom right and store the prefix sum of distinct values from both directions

// Time Complexity: O(mn) 174ms
// Space Complexity: O(mn) 54.1MB
var differenceOfDistinctValues = function(grid) {
  let m = grid.length, n = grid[0].length;
  let topLeft = precomputeTopLeft(grid);
  let bottomRight = precomputeBottomRight(grid);
  let ans = Array(m).fill(0).map(() => Array(n));
  for (let i = 0; i < m; i++) {
    for (let j = 0; j < n; j++) {
      ans[i][j] = Math.abs(topLeft[i][j] - bottomRight[i][j]);
    }
  }
  return ans;
};

function precomputeTopLeft(grid) {
  let m = grid.length, n = grid[0].length, topLeft = Array(m).fill(0).map(() => Array(n).fill(0));
  for (let i = 0; i < m - 1; i++) {
    let row = i, col = 0, distinct = new Set();
    while (row < m && col < n) {
      topLeft[row][col] = distinct.size;
      distinct.add(grid[row][col]);
      row++, col++;
    }
  }
  for (let j = 1; j < n - 1; j++) {
    let row = 0, col = j, distinct = new Set();
    while (row < m && col < n) {
      topLeft[row][col] = distinct.size;
      distinct.add(grid[row][col]);
      row++, col++;
    }
  }
  return topLeft;
}

function precomputeBottomRight(grid) {
  let m = grid.length, n = grid[0].length, bottomRight = Array(m).fill(0).map(() => Array(n).fill(0));
  for (let i = 1; i < m; i++) {
    let row = i, col = n - 1, distinct = new Set();
    while (row >= 0 && col >= 0) {
      bottomRight[row][col] = distinct.size;
      distinct.add(grid[row][col]);
      row--, col--;
    }
  }
  for (let j = n - 2; j > 0; j--) {
    let row = m - 1, col = j, distinct = new Set();
    while (row >= 0 && col >= 0) {
      bottomRight[row][col] = distinct.size;
      distinct.add(grid[row][col]);
      row--, col--;
    }
  }
  return bottomRight;
}

// Two test cases
console.log(differenceOfDistinctValues([[1,2,3],[3,1,5],[3,2,1]])) // [[1,1,0],[1,0,1],[0,1,1]]
console.log(differenceOfDistinctValues([[1]])) // [[0]]