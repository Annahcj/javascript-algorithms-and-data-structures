// 1329. Sort the Matrix Diagonally
// A matrix diagonal is a diagonal line of cells starting from some cell in either the topmost row or leftmost column and going in the bottom-right direction until reaching the matrix's end. For example, the matrix diagonal starting from mat[2][0], where mat is a 6 x 3 matrix, includes cells mat[2][0], mat[3][1], and mat[4][2].
// Given an m x n matrix mat of integers, sort each matrix diagonal in ascending order and return the resulting matrix.


// Solution: Collect Diagonal Values

// There are m + n - 1 starting points. (-1 because the top left corner is counted twice)
// For each matrix diagonal,
  // collect the values
  // sort the values
  // insert the values back

// Time Complexity: O(mn * log(min(m, n))) 74ms
// Space Complexity: O(min(m, n)) 45.3MB
var diagonalSort = function(mat) {
  let m = mat.length, n = mat[0].length;
  for (let i = 1; i < m; i++) sortDiag(i, 0); // left side except the top left corner
  for (let j = 0; j < n; j++) sortDiag(0, j); // top row
  return mat;
  
  function sortDiag(startRow, startCol) {
    let nums = [];
    let row = startRow, col = startCol;
    while (row < m && col < n) {
      nums.push(mat[row][col]);
      row++, col++;
    }
    
    nums.sort((a, b) => a - b);
    
    row = startRow, col = startCol;
    let i = 0;
    while (row < m && col < n) {
      mat[row][col] = nums[i++];
      row++, col++;
    }
  }
};

// Two test cases to run function on
console.log(diagonalSort([[3,3,1,1],[2,2,1,2],[1,1,1,2]])) // [[1,1,1,1],[1,2,2,2],[1,2,3,3]]
console.log(diagonalSort([[11,25,66,1,69,7],[23,55,17,45,15,52],[75,31,36,44,58,8],[22,27,33,25,68,4],[84,28,14,11,5,50]])) // [[5,17,4,1,52,7],[11,11,25,45,8,69],[14,23,25,44,58,15],[22,27,31,36,50,66],[84,28,75,33,55,68]]