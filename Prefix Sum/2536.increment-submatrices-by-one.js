// 2536. Increment Submatrices by One
// You are given a positive integer n, indicating that we initially have an n x n 0-indexed integer matrix mat filled with zeroes.
// You are also given a 2D integer array query. For each query[i] = [row1i, col1i, row2i, col2i], you should do the following operation:
  // Add 1 to every element in the submatrix with the top left corner (row1i, col1i) and the bottom right corner (row2i, col2i). That is, add 1 to mat[x][y] for for all row1i <= x <= row2i and col1i <= y <= col2i.
// Return the matrix mat after performing every query.


// Solution: Prefix Sum on Each Row 

// For each query [row1, col1, row2, col2],
  // Go through each row from row1 to row2
    // increment the count at col1: +1
    // decrement the count at col2 + 1: -1
// At the end, get the cumulative sum of the counts on each row.

// m = number of queries, n = number of rows/columns
// Time Complexity: O(mn + n^2) 459ms
// Space Complexity: O(n^2) 63.9MB
var rangeAddQueries = function(n, queries) {
  let grid = Array(n).fill(0).map(() => Array(n).fill(0));
  for (let [row1, col1, row2, col2] of queries) {
    for (let i = row1; i <= row2; i++) {
      grid[i][col1]++;
      if (col2 < n - 1) grid[i][col2 + 1]--;
    }
  }
  for (let i = 0; i < n; i++) {
    for (let j = 1; j < n; j++) {
      grid[i][j] += grid[i][j - 1];
    }
  }
  return grid;
};

// Two test cases
console.log(rangeAddQueries(3, [[1,1,2,2],[0,0,1,1]])) // [[1,1,0],[1,2,1],[0,1,1]]
console.log(rangeAddQueries(2, [[0,0,1,1]])) // [[1,1],[1,1]]