// 240. Search a 2D Matrix II
// Write an efficient algorithm that searches for a value target in an m x n integer matrix matrix. This matrix has the following properties:
  // Integers in each row are sorted in ascending from left to right.
  // Integers in each column are sorted in ascending from top to bottom.


// Solution 1: Binary Search each Row

// Perform binary search for each row in the matrix.

// m = number of rows, n = number of columns
// Time Complexity: O(m log(n)) 2464ms
// Space Complexity: O(1) 44.9MB
var searchMatrix = function(matrix, target) {
  let m = matrix.length, n = matrix[0].length;
  for (var i = 0; i < m; i++) {
    let low = 0, high = n - 1;
    while (low <= high) {
      let mid = Math.floor((low + high) / 2);
      if (matrix[i][mid] === target) return true;
      else if (matrix[i][mid] > target) high = mid - 1;
      else low = mid + 1;
    }
  }
  return false;
};

// Solution 2: Start from Top Right Corner

// Starting from the top right corner, these two properties are present for each cell:
  // The left cell is smaller
  // The bottom cell is bigger
// This approach works almost like a BST (binary search tree).

// If the cell is bigger than the target, move down. (we eliminate the entire top part, since we will never move up)
// If the cell is smaller than the target, move left. (we eliminate the entire right side, since we will never move right)

// Time Complexity: O(m + n) 348ms
// Space Complexity: O(1) 45MB
var searchMatrix = function(matrix, target) {
  let m = matrix.length, n = matrix[0].length;
  let row = 0, col = n - 1;
  while (row > -1 && row < m && col > -1 && col < n) {
    if (matrix[row][col] === target) return true;
    else if (matrix[row][col] > target) col--;
    else row++;
  }
  return false;
};

// Two test cases to run function on
console.log(searchMatrix([[1,4,7,11,15],[2,5,8,12,19],[3,6,9,16,22],[10,13,14,17,24],[18,21,23,26,30]], 5)) // true
console.log(searchMatrix([[1,4,7,11,15],[2,5,8,12,19],[3,6,9,16,22],[10,13,14,17,24],[18,21,23,26,30]], 20)) // false