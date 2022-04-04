// 1284. Minimum Number of Flips to Convert Binary Matrix to Zero Matrix
// Given a m x n binary matrix mat. In one step, you can choose one cell and flip it and all the four neighbors of it if they exist (Flip is changing 1 to 0 and 0 to 1). A pair of cells are called neighbors if they share one edge.
// Return the minimum number of steps required to convert mat to a zero matrix or -1 if you cannot.
// A binary matrix is a matrix with all cells equal to 0 or 1 only.
// A zero matrix is a matrix with all cells equal to 0.


// Solution: DFS

// The order of flipping cells doesn't matter because the amount of flips performed on each cell will be the same regardless of the order.
// We only need to flip each cell at most once because 2 flips = 0 flips.
// For each cell in the matrix:
  // 1. Don't flip it
  // 2. Flip it (moves +1)

// Time Complexity: O(2^(mn)) 136ms
// Space Complexity: O(2^(mn)) 44.3MB
var minFlips = function(mat) {
  let m = mat.length, n = mat[0].length;
  let moves = dfs(mat, 0, 0);
  return moves === Infinity ? -1 : moves;
  
  function dfs(matrix, row, col) {
    if (col === n) row++, col = 0;
    if (row === m) return isAllZero(matrix) ? 0 : Infinity;
    
    let min = dfs(matrix, row, col + 1);
    flip(matrix, row, col);
    min = Math.min(min, dfs(matrix, row, col + 1) + 1);
    flip(matrix, row, col);
    
    return min;
  }
  
  function isAllZero(matrix) {
    for (let i = 0; i < m; i++) {
      for (let j = 0; j < n; j++) {
        if (matrix[i][j]) return false;
      }
    }
    return true;
  }
  
  function flip(matrix, row, col) {
    const directions = [[-1, 0], [0, 1], [1, 0], [0, -1]];
    matrix[row][col] ^= 1;
    for (let [x, y] of directions) {
      let newX = row + x, newY = col + y;
      if (newX < 0 || newX >= m || newY < 0 || newY >= n) continue;
      matrix[newX][newY] ^= 1;
    }
  }
};

// Two test cases to run function on
console.log(minFlips([[0,0],[0,1]])) // 3
console.log(minFlips([[0]])) // 0