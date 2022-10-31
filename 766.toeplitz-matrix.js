// 766. Toeplitz Matrix
// Given an m x n matrix, return true if the matrix is Toeplitz. Otherwise, return false.
// A matrix is Toeplitz if every diagonal from top-left to bottom-right has the same elements.


// Solution 1: Hashmap

// Two coordinates are on the same diagonal line if (row1 - column1 === row2 - column2).
// Each diagonal line should consist of the same value.
// Keep track of the value for each diagonal line in a hashmap.
// If matrix[i][j] is not equal to the value for the diagonal line, return false.

// m = number of rows, n = number of columns
// Time Complexity: O(mn) 100ms
// Space Complexity: O(m + n) 44.9MB
var isToeplitzMatrix = function(matrix) {
  let m = matrix.length, n = matrix[0].length;
  let map = new Map();
  for (let i = 0; i < m; i++) {
    for (let j = 0; j < n; j++) {
      if (!map.has(i - j)) {
        map.set(i - j, matrix[i][j]);
      } else if (map.get(i - j) !== matrix[i][j]) return false;
    }
  }
  return true;
};


// Solution 2: Compare with Adjacent

// Since all values on a diagonal line, we can compare diagonally adjacent cells.
// If two diagonally adjacent cells are not equal, return false.

// m = number of rows, n = number of columns
// Time Complexity: O(mn) 100ms
// Space Complexity: O(1) 44.7MB
var isToeplitzMatrix = function(matrix) {
  let m = matrix.length, n = matrix[0].length;
  for (let i = 1; i < m; i++) {
    for (let j = 1; j < n; j++) {
      if (matrix[i][j] !== matrix[i - 1][j - 1]) {
        return false;
      }
    }
  }
  return true;
};

// Two test cases
console.log(isToeplitzMatrix([[1,2,3,4],[5,1,2,3],[9,5,1,2]])) // true
console.log(isToeplitzMatrix([[1,2],[2,2]])) // false