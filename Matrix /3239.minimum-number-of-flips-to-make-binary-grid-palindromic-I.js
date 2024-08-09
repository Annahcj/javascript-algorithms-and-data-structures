// 3239. Minimum Number of Flips to Make Binary Grid Palindromic I
// You are given an m x n binary matrix grid.
// A row or column is considered palindromic if its values read the same forward and backward.
// You can flip any number of cells in grid from 0 to 1, or from 1 to 0.
// Return the minimum number of cells that need to be flipped to make either all rows palindromic or all columns palindromic.

 
// Solution: Simulation

// Calculate the minimum flips to make each row a palindrome, and the same for each column.
// For each row and column, use two pointers starting from each end and compare if they're equal. 
// If they're not equal, we need to flip one of them.

// Return the minimum moves out of the two.

// m = number of rows, n = number of columns
// Time Complexity: O(mn) 166ms
// Space Complexity: O(1) 87.2MB
function minFlips(grid) {
  let m = grid.length, n = grid[0].length;
  let rowFlips = 0;
  for (let row = 0; row < m; row++) {
    let i = 0, j = n - 1;
    while (i < j) {
      rowFlips += grid[row][i] !== grid[row][j] ? 1 : 0;
      i++, j--;
    }
  }
  let colFlips = 0;
  for (let col = 0; col < n; col++) {
    let i = 0, j = m - 1;
    while (i < j) {
      colFlips += grid[i][col] !== grid[j][col] ? 1 : 0;
      i++, j--;
    }
  }
  return Math.min(rowFlips, colFlips);
};

// Three test cases
console.log(minFlips([[1,0,0],[0,0,0],[0,0,1]])) // 2
console.log(minFlips([[0,1],[0,1],[0,0]])) // 1
console.log(minFlips([[1],[0]])) // 0