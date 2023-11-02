// 2643. Row With Maximum Ones
// Given a m x n binary matrix mat, find the 0-indexed position of the row that contains the maximum count of ones, and the number of ones in that row.
// In case there are multiple rows that have the maximum count of ones, the row with the smallest row number should be selected.
// Return an array containing the index of the row, and the number of ones in it.


// Solution: Brute Force

// Count the number of ones in each row.
// Keep track of the maximum number of ones and the row number.

// Time Complexity: O(mn) 98ms
// Space Complexity: O(1) 50.6MB
var rowAndMaximumOnes = function(mat) {
  let m = mat.length, n = mat[0].length;
  let maxOnes = 0, row = 0;
  for (let i = 0; i < m; i++) {
    let ones = 0;
    for (let j = 0; j < n; j++) {
      ones += mat[i][j];
    }
    if (ones > maxOnes) maxOnes = ones, row = i;
  }
  return [row, maxOnes];
};

// Two test cases
console.log(rowAndMaximumOnes([[0,1],[1,0]])) // [0,1]
console.log(rowAndMaximumOnes([[0,0,0],[0,1,1]])) // [1,2]