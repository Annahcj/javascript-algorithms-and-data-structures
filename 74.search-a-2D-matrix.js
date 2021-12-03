// 74. Search a 2D Matrix
// Write an efficient algorithm that searches for a value in an m x n matrix. This matrix has the following properties:
  // Integers in each row are sorted from left to right.
  // The first integer of each row is greater than the last integer of the previous row.


// Solution: Binary Search 

// Binary Search for a row where target is bigger than or equal to the first number AND target is smaller than or equal to the last number.
// When we find a row that matches the criterias, binary search to check whether the row contains target.

// Time Complexity: O(log(m) + log(n)) 64ms
// Space Complexity: O(1) 39.9MB
var searchMatrix = function(matrix, target) {
  let m = matrix.length, n = matrix[0].length;
  let start = 0, end = m - 1;
  while (start <= end) {
    let mid = Math.floor((start + end) / 2);
    if (target < matrix[mid][0]) {
      end = mid - 1;
    } else if (target > matrix[mid][n - 1]) {
      start = mid + 1;
    } else {
      return search(matrix[mid]);
    }
  }
  return false;

  function search(arr) {
    let start = 0, end = n - 1;
    while (start <= end) {
      let mid = Math.floor((start + end) / 2);
      if (arr[mid] < target) {
        start = mid + 1;
      } else if (arr[mid] > target) {
        end = mid - 1;
      } else {
        return true;
      }
    }
    return false;
  }
};

// Three test cases to run function on
console.log(searchMatrix([[1,3,5,7],[10,11,16,20],[23,30,34,60]], 3)) // true
console.log(searchMatrix([[1,3,5,7],[10,11,16,20],[23,30,34,60]], 13)) // false
console.log(searchMatrix([[1]], 2)) // false