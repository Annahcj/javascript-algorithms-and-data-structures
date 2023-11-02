// 562. Longest Line of Consecutive One in Matrix
// Given an m x n binary matrix mat, return the length of the longest line of consecutive one in the matrix.
// The line could be horizontal, vertical, diagonal, or anti-diagonal.


// Solution: Dynamic Programming

// Give each point in the matrix four properties ->
  // hori -> longest horizontal sequence
  // vert -> longest vertical sequence
  // diag -> longest diagonal sequence
  // angiDiag -> longest anti diagonal sequence

// Time Complexity: O(nm) 104ms
// Space Complexity: O(nm) 46.1MB
var longestLine = function(mat) {
  let n = mat.length, m = mat[0].length;
  let ans = 0;
  let dp = Array(n);
  // populate initial dp array
  for (var i = 0; i < n; i++) {
    dp[i] = [];
    for (var j = 0; j < m; j++) {
      dp[i][j] = {hori: 0, vert: 0, diag: 0, antiDiag: 0};
    }
  }
  // set left top corner
  if (mat[0][0] === 1) {
    dp[0][0] = {hori: 1, vert: 1, diag: 1, antiDiag: 1};
    ans = 1;
  }

  for (var i = 0; i < n; i++) {
    for (var j = 0; j < m; j++) {
      // skip top left corner
      if (i === 0 && j === 0) continue;
      // if cell is a 1
      if (mat[i][j] === 1) {
        // calculate each horizontal, vertical, diagonal, and anti diagonal sequence for this current cell
        dp[i][j].hori = (j > 0 ? dp[i][j - 1].hori : 0) + 1;
        dp[i][j].vert = (i > 0 ? dp[i - 1][j].vert : 0) + 1;
        dp[i][j].diag = (i > 0 && j > 0 ? dp[i - 1][j - 1].diag : 0) + 1;
        dp[i][j].antiDiag = (i > 0 && j + 1 < m ? dp[i - 1][j + 1].antiDiag : 0) + 1;
        // update answer if longer sequence is found
        ans = Math.max(ans, dp[i][j].hori, dp[i][j].vert, dp[i][j].diag, dp[i][j].antiDiag);
      }
    }
  }  
  return ans;
};

// Three test cases to run function on
console.log(longestLine([[0,1,1,0],[0,1,1,0],[0,0,0,1]])) // 3
console.log(longestLine([[1,1,1,1],[0,1,1,0],[0,0,0,1]])) // 4
console.log(longestLine([[0,1,0,1,1],[1,1,0,0,1],[0,0,0,1,0],[1,0,1,1,1],[1,0,0,0,1]])) // 3