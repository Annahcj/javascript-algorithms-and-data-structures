// 2133. Check if Every Row and Column Contains All Numbers
// An n x n matrix is valid if every row and every column contains all the integers from 1 to n (inclusive).
// Given an n x n integer matrix matrix, return true if the matrix is valid. Otherwise, return false.


// Solution: Hashset

// Since matrix[i][j] is always <= n, we can use a hashset to keep track of which numbers we have on each row and column.
// If the size of any hashset is less than n, return false.

// Time Complexity: O(n^2) 141ms
// Space Complexity: O(n) 46.7MB
var checkValid = function(matrix) {
  let n = matrix.length;
  for (var i = 0; i < n; i++) {
    let row = new Set(), column = new Set();
    for (var j = 0; j < n; j++) {
      row.add(matrix[i][j]);
      column.add(matrix[j][i]);
    }
    if (row.size < n || column.size < n) return false;
  }
  return true;
};

// Two test cases to run function on
console.log(checkValid([[1,2,3],[3,1,2],[2,3,1]])) // true
console.log(checkValid([[1,1,1],[1,2,3],[1,2,3]])) // false