// 1380. Lucky Numbers in a Matrix
// Given an m x n matrix of distinct numbers, return all lucky numbers in the matrix in any order.
// A lucky number is an element of the matrix such that it is the minimum element in its row and maximum in its column.


// Solution: 

// Precompute the minimum number on each row and the maximum number on each column.
  // minRow[i] = minimum number on row i
  // maxCol[j] = maximum number on column j
// Return an array of matrix[i][j] where matrix[i][j] is equal to the minimum in row i and maximum in column j.

// Time Complexity: O(mn) 65ms
// Space Complexity: O(m + n) 52.1MB
function luckyNumbers(matrix) {
  let m = matrix.length, n = matrix[0].length;
  let minRow = Array(m).fill(Infinity);
  let maxCol = Array(n).fill(0);
  for (let i = 0; i < m; i++) {
    for (let j = 0; j < n; j++) {
      minRow[i] = Math.min(minRow[i], matrix[i][j]);
      maxCol[j] = Math.max(maxCol[j], matrix[i][j]);
    }
  }
  let lucky = [];
  for (let i = 0; i < m; i++) {
    for (let j = 0; j < n; j++) {
      if (matrix[i][j] === minRow[i] && matrix[i][j] === maxCol[j]) {
        lucky.push(matrix[i][j]);
      }
    }
  }
  return lucky;
};

// Three test cases
console.log(luckyNumbers([[3,7,8],[9,11,13],[15,16,17]])) // [15]
console.log(luckyNumbers([[1,10,4,2],[9,3,8,7],[15,16,17,12]])) // [12]
console.log(luckyNumbers([[7,8],[1,2]])) // [7]