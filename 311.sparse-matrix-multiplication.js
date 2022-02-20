// 311. Sparse Matrix Multiplication
// Given two sparse matrices mat1 of size m x k and mat2 of size k x n, return the result of mat1 x mat2. You may assume that multiplication is always possible.


// Solution 1: Brute Force

// Return an m * n matrix.
// Multiply each row of mat1 with all columns of mat2. 

// e.g: mat1 = [[1,0,0,0]]
// mat2 = [
//   [7,0,0],
//   [0,0,0],
//   [0,0,1],
//   [0,0,0]
// ]
// mat1 row 0 * mat2 col 0 = mat[0][0].
// mat1 row 0 * mat2 col 1 = mat[0][1].
// mat1 row 0 * mat2 col 2 = mat[0][2].
// ans = [7,0,0].

// Time Complexity: O(mnk) 111ms
// Space Complexity: O(1) (not including output) 44.2MB 
var multiply = function(mat1, mat2) {
  let m = mat1.length, n = mat2[0].length, k = mat1[0].length;
  let mat = Array(m).fill(0).map(() => Array(n));
  for (let i = 0; i < m; i++) {
    for (let j = 0; j < n; j++) {
      let sum = 0;
      for (let h = 0; h < k; h++) {
        sum += mat1[i][h] * mat2[h][j];
      }
      mat[i][j] = sum;
    }
  }
  return mat;
};

// Solution 2: Keep Coordinates of Non-Zero Numbers

// Only keep the coordinates of non-zero numbers.
// Keep the coordinates from mat1 in an array, and the coordinates from mat2 in a nested array.
  // The coordinates from mat2 should be multiplied with the numbers from mat1 in the column equal to mat2's row.
  // Put the coordinates of mat2 in a nested array in the index of mat2's row number.

// Time Complexity: O(mnk) (faster on average) 87ms
// Space Complexity: O(mnk) 42.8MB
var multiply = function(mat1, mat2) {
  let m = mat1.length, n = mat2[0].length, k = mat1[0].length;
  let mat = Array(m).fill(0).map(() => Array(n).fill(0));
  let pos1 = [], pos2 = Array(k).fill(0).map(() => []);
  for (let i = 0; i < m; i++) {
    for (let j = 0; j < k; j++) {
      if (mat1[i][j] !== 0) pos1.push([i, j]);
    }
  }
  for (let i = 0; i < k; i++) {
    for (let j = 0; j < n; j++) {
      if (mat2[i][j] !== 0) pos2[i].push([i, j]);
    }
  }
  for (let [x, y] of pos1) {
    // y -> pos2[y]
    for (let [i, j] of pos2[y]) {
      let row = x, col = j;
      mat[row][col] += mat1[x][y] * mat2[i][j];
    }
  }
  return mat;
};

// A test case to run function on
console.log(multiply([[1,0,0],[-1,0,3]], [[7,0,0],[0,0,0],[0,0,1]])) // [[7,0,0],[-7,0,3]]