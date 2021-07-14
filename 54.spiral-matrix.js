// 54. Spiral Matrix
// Given an m x n matrix, return all elements of the matrix in spiral order.


// Solution 1: Calculate Ring by Ring

// Ring = The numbers on each wall of the matrix (the top row, right column, bottom row, and left column)

// Keep variable 'startIdx' which indicates which ring we are on,
// Declare width and height variables which we would set at the original width and height at first, then decrement by two each time we finish with a ring.

// TOP (left to right): Start at [startIdx][startIdx] and move across for the current length of 'width', while pushing into our result array.
// RIGHT (top down): Move down for the current length of 'height', while pushing into result.
// BOTTOM (right to left): Move left until we reach startIdx (ONLY if height is bigger than 1, otherwise we would be recording the same numbers twice)
// LEFT (ground up): Move up until startIdx - 1 is reached (since we've already recorded the first) (ONLY if width is bigger than 1, preventing overlaps again)

// Time Complexity: O(n) (size of matrix) 68ms
// Space Complexity: O(1) 38.5MB

var spiralOrder = function(matrix) {
    let width = matrix[0].length, height = matrix.length;
    let startIdx = 0;
    let result = [];
    while (width > 0 && height > 0) {
      let i = startIdx, j = startIdx;
      result.push(matrix[i][j]);
      while (j < width + startIdx - 1) j++, result.push(matrix[i][j]);
      while (i < height + startIdx - 1) i++, result.push(matrix[i][j]);
      while (j > startIdx && height > 1) j--, result.push(matrix[i][j]);
      while (i > startIdx + 1 && width > 1) i--, result.push(matrix[i][j]);
      width -= 2, height -= 2;
      startIdx++;
    }
    return result;
  };
  
  // Five test cases to run function on
  console.log(spiralOrder([[1],[2],[3]])) // [1,2,3]
  console.log(spiralOrder([[1,2,3,4], [5,6,7,8]])) // [1,2,3,4,8,7,6,5]
  console.log(spiralOrder([[1,2,3], [4,5,6], [7,8,9], [10,11,12]])) // [1,2,3,6,9,12,11,10,7,4,5,8]
  console.log(spiralOrder([[1,2,3],[4,5,6],[7,8,9]])) // [1,2,3,6,9,8,7,4,5]
  console.log(spiralOrder([[1,2,3,4],[5,6,7,8],[9,10,11,12]])) // [1,2,3,4,8,12,11,10,9,5,6,7]