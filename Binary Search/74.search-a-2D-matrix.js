// 74. Search a 2D Matrix
// Write an efficient algorithm that searches for a value in an m x n matrix. This matrix has the following properties:
  // Integers in each row are sorted from left to right.
  // The first integer of each row is greater than the last integer of the previous row.


// Solution: Two Binary Searches

// 1. Binary search for the row where the target is between first and last integer of row.
// 2. Binary search through the row for the target.

// Time Complexity: O(log(m) + log(n)) 55ms
// Space Complexity: O(1) 41.5MB
var searchMatrix = function(matrix, target) {
  let m = matrix.length, n = matrix[0].length;
  let row = binarySearchForRow(matrix, target);
  if (!row) return false;
  let low = 0, high = n - 1;
  while (low <= high) {
    let mid = Math.floor((low + high) / 2);
    if (row[mid] === target) return true;
    else if (row[mid] < target) low = mid + 1;
    else high = mid - 1;
  }
  return false;
};

function binarySearchForRow(matrix, target) {
  let m = matrix.length, n = matrix[0].length;
  let low = 0, high = m - 1;
  while (low <= high) {
    let mid = Math.floor((low + high) / 2);
    if (matrix[mid][0] <= target && matrix[mid][n - 1] >= target) return matrix[mid];
    else if (matrix[mid][n - 1] < target) low = mid + 1;
    else high = mid - 1;
  }
  return null;
}

// Three test cases
console.log(searchMatrix([[1,3,5,7],[10,11,16,20],[23,30,34,60]], 3)) // true
console.log(searchMatrix([[1,3,5,7],[10,11,16,20],[23,30,34,60]], 13)) // false
console.log(searchMatrix([[1]], 2)) // false