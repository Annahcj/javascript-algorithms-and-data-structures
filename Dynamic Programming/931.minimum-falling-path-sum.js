// 931. Minimum Falling Path Sum
// Given an n x n array of integers matrix, return the minimum sum of any falling path through matrix.
// A falling path starts at any element in the first row and chooses the element in the next row that is either directly below or diagonally left/right. Specifically, the next element from position (row, col) will be (row + 1, col - 1), (row + 1, col), or (row + 1, col + 1).


// Solution: Dynamic Programming - Tabulation

// Starting from the second last row, work your way upwards for each row, taking the minimum path from each cell.
// Here we modify the input matrix to save space, but we can always create an extra matrix if we want to avoid modifying the input.

// Time Complexity: O(n^2) 145ms
// Space Complexity: O(1) 48.5MB
var minFallingPathSum = function(matrix) {
  let n = matrix.length;
  for (let i = n - 2; i >= 0; i--) {
    for (let j = 0; j < n; j++) {
      let paths = [[i + 1, j - 1], [i + 1, j], [i + 1, j + 1]];
      let min = Infinity;
      for (let [x, y] of paths) {
        if (y < 0 || y >= n) continue;
        min = Math.min(min, matrix[x][y]);
      }
      matrix[i][j] += min;
    }
  }
  return Math.min(...matrix[0]);
};

// Two test cases 
console.log(minFallingPathSum([[2,1,3],[6,5,4],[7,8,9]])) // 13
console.log(minFallingPathSum([[-19,57],[-40,-5]])) // -59