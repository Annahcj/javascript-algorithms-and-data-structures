// 329. Longest Increasing Path in a Matrix
// Given an m x n integers matrix, return the length of the longest increasing path in matrix.
// From each cell, you can either move in four directions: left, right, up, or down. You may not move diagonally or move outside the boundary (i.e., wrap-around is not allowed).


// Solution: DFS w/ DP

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
  // set max to 1
  // if dp[i][j] is not undefined (longest increasing path already calculated for matrix[i][j]), return dp[i][j]
  // loop through [x, y] in directions (up, right, down, left) *
    // let newX (new x coordinate) be i + x
    // let newY (new y coordinate) be j + y
    // if newX and newY is in bounds AND matrix[newX][newY] is bigger than matrix[i][j]
      // set max to Math.max(max, dfs(newX, newY) + 1)
  // *
  // cache the result -> set dp[i][j] to max
  // return max

// Time Complexity: O(nm) 92ms
// Space Complexity: O(nm) 42.7MB
var longestIncreasingPath = function(matrix) {
  const directions = [[0, 1], [1, 0], [0, -1], [-1, 0]];
  const width = matrix[0].length, length = matrix.length;
  let dp = Array(length);
  for (var i = 0; i < length; i++) {
    dp[i] = Array(width);
  }
  let max = 0;
  for (var row = 0; row < length; row++) {
    for (var col = 0; col < width; col++) {
      max = Math.max(max, dfs(row, col));
    }
  }
  return max;
  function dfs(i, j) {
    let max = 1;
    if (dp[i][j]) return dp[i][j]; 
    for (var [x, y] of directions) {
      let newX = i + x;
      let newY = j + y;
      if (newX > -1 && newX < length && newY > -1 && newY < width && matrix[i][j] < matrix[newX][newY]) {
        max = Math.max(max, dfs(newX, newY) + 1);
      }
    }
    dp[i][j] = max;
    return max;
  }
};

// Three test cases to run function on
console.log(longestIncreasingPath([[9,9,4],[6,6,8],[2,1,1]])) // 4
console.log(longestIncreasingPath( [[3,4,5],[3,2,6],[2,2,1]])) // 4
console.log(longestIncreasingPath([[1]])) // 1