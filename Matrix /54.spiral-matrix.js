// 54. Spiral Matrix
// Given an m x n matrix, return all elements of the matrix in spiral order.


// Solution: Row & Column Boundaries

// Keep track of the boundary of the matrix
// Set rowStart to 0, rowEnd to the height of matrix - 1
// set colStart to 0, colEnd to the width of matrix - 1

// loop while colStart is smaller than or equal to colEnd AND rowStart is smaller than or equal to rowEnd
  // (compute top row left to right)
  // loop through from colStart to colEnd (pointer = j)
    // push matrix[rowStart][j] to res
  // (compute right row top down)
  // loop through from rowStart to rowEnd (pointer = i)
    // push matrix[i][colEnd] to res
  // (compute bottom row right to left)
  // only compute bottom row if rowStart is not equal to rowEnd (to avoid computing duplicates)
    // loop through from colEnd to colStart (pointer = j)
      // push matrix[rowEnd][j] to res
  // (compute left row bottom up)
  // compute only if colStart is not equal to colEnd
    // loop through from rowEnd to rowStart (pointer = i)
      // push matrix[i][rowStart] to res
  // increment rowStart and colStart by one and decrement rowEnd and colEnd by one
// return res

// Time Complexity: O(mn) (width * height) 70ms
// Space Complexity: O(1) 38MB
var spiralOrder = function(matrix) {
  let width = matrix[0].length, height = matrix.length;
  let res = [];
  let rowStart = 0, rowEnd = height - 1;
  let colStart = 0, colEnd = width - 1;
  while (colStart <= colEnd && rowStart <= rowEnd) {
    for (var j = colStart; j <= colEnd; j++) {
      res.push(matrix[rowStart][j]);
    }
    for (var i = rowStart + 1; i <= rowEnd; i++) {
      res.push(matrix[i][colEnd]);
    }
    if (rowStart !== rowEnd) {
      for (j = colEnd - 1; j >= colStart; j--) {
        res.push(matrix[rowEnd][j]);
      }
    }
    if (colStart !== colEnd) {
      for (i = rowEnd - 1; i > rowStart; i--) {
        res.push(matrix[i][colStart]);
      }
    }
    rowStart++, rowEnd--, colStart++, colEnd--;
  }
  return res;
};

// Five test cases to run function on
console.log(spiralOrder([[1],[2],[3]])) // [1,2,3]
console.log(spiralOrder([[1,2,3,4], [5,6,7,8]])) // [1,2,3,4,8,7,6,5]
console.log(spiralOrder([[1,2,3], [4,5,6], [7,8,9], [10,11,12]])) // [1,2,3,6,9,12,11,10,7,4,5,8]
console.log(spiralOrder([[1,2,3],[4,5,6],[7,8,9]])) // [1,2,3,6,9,8,7,4,5]
console.log(spiralOrder([[1,2,3,4],[5,6,7,8],[9,10,11,12]])) // [1,2,3,4,8,12,11,10,9,5,6,7]