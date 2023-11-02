// 329. Longest Increasing Path in a Matrix
// Given an m x n integers matrix, return the length of the longest increasing path in matrix.
// From each cell, you can either move in four directions: left, right, up, or down. You may not move diagonally or move outside the boundary (i.e., wrap-around is not allowed).


// Solution: Recursion w/ Memoization

// Note:
// Keep in mind that we won't have to worry about traversing the path we came from since we are looking for a strictly increaasing path (will never go to cells with smaller values)

// Algorithm:
// keep a max increasing path variable -> max = 0
// Loop through each row in matrix *
  // loop through each column in row **
    // set max to Math.max(max, dfs(row, col))
  // **
// *
// return max


// dfs: (i, j) (recursively finds the longest increasing path)
  // set ans to 1
  // if memo[i][j] is not undefined (longest increasing path already calculated for matrix[i][j]), return memo[i][j]
  // loop through [x, y] in directions (up, right, down, left) *
    // let newX (new x coordinate) be i + x
    // let newY (new y coordinate) be j + y
    // if newX and newY is in bounds AND matrix[newX][newY] is bigger than matrix[i][j]
      // set ans to Math.max(max, dfs(newX, newY) + 1)
  // *
  // cache the result -> set memo[i][j] to ans
  // return ans

// Time Complexity: O(nm) 92ms
// Space Complexity: O(nm) 42.7MB
var longestIncreasingPath = function(matrix) {
  const directions = [[0, 1], [1, 0], [0, -1], [-1, 0]];
  const n = matrix.length, m = matrix[0].length;
  let memo = Array(n);
  for (var i = 0; i < n; i++) memo[i] = Array(m);

  let max = 0;
  for (i = 0; i < n; i++) {
    for (var j = 0; j < m; j++) {
      max = Math.max(max, dfs(i, j));
    }
  }
  return max;

  function dfs(row, col) {
    if (memo[row][col] !== undefined) return memo[row][col];
    let ans = 1;
    for (var [x, y] of directions) {
      let newX = row + x, newY = col + y;
      if (newX > -1 && newX < n && newY > -1 && newY < m) {
        if (matrix[newX][newY] > matrix[row][col]) {
          ans = Math.max(ans, dfs(newX, newY) + 1);
        }
      }
    }
    memo[row][col] = ans;
    return ans;
  }
};

// Three test cases to run function on
console.log(longestIncreasingPath([[9,9,4],[6,6,8],[2,1,1]])) // 4
console.log(longestIncreasingPath( [[3,4,5],[3,2,6],[2,2,1]])) // 4
console.log(longestIncreasingPath([[1]])) // 1