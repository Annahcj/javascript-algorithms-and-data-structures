// 542. 01 Matrix
// Given an m x n binary matrix mat, return the distance of the nearest 0 for each cell.
// The distance between two adjacent cells is 1.


// Solution: Dynamic Programming

// Thoughts:
// Store distances in a matrix.
// We can traverse the matrix once from left to right/top to bottom,
// and check for the closest spot to zero with the number directly on the left, and the number directly on top. (left, top)
// We can then traverse the matrix from right to left/bottom to top,
// and check for the closest spot to zero with the number directly on the right, and the number directly below. (right, bottom)

// For e.g:
  // [1,1,1]
  // [1,1,1]
  // [1,1,0]
  // dp: []
// L-R T-B traversal
  // first row of dp (set all to Infinity initially): [Infinity, Infinity, Infinity]
  // 00 (1) -> Number is not 0, position is first row and is first item of row, do nothing.
  // 01 (1) -> Number is not 0, position is first row and not first item of row, set dp[0][1] to left item in dp + 1.
  // 02 (1) -> Number is not 0, position is first row and not first item of row, set dp[0][1] to left item in dp + 1.
  // second row of dp: [Infinity, Infinity, Infinity]
  // 10 (1) -> Number is not 0, position is not first row and is first item of row, set dp[1][0] to directly above item + 1.
  // 11 (1) -> Number is not 0, position is not first row and not first item of row, set dp[1][1] to closer distance of (directly left item, directly above item) + 1
  // 12 (1) -> Number is not 0, position is not first row and not first item of row, set dp[1][2] to closer distance of (directly left item, directly above item) + 1
  // third row of dp: [Infinity, Infinity, Infinity] 
  // 20 (1) -> Number is not 0, position is not first row and is first item of row, set dp[2][0] to directly above item + 1.
  // 21 (1) -> Number is not 0, position is not first row and not first item of row, set dp[2][1] to closer distance of (directly left item, directly above item) + 1
  // 22 (0) -> Number is 0, set dp[2][2] to 0.

  // dp is now :
  // [Infinity, Infinity, Infinity]
  // [Infinity, Infinity, Infinity]
  // [Infinity, Infinity, 0]
// We now need to go from bottom up, right to left to finish updating the distances.

  // third row of dp: [Infinity, Infinity, 0]
  // 22 (0) -> Number is 0, since it is already 0, no updates are required.
  // 21 (1) -> Number is not 0, set dp[2][1] to closer distance of (directly right item + 1, directly below item + 1, or itself) + 1 (Infinity or 0 + 1 or Infinity => 1)
  // 20 (1) -> Number is not 0, set dp[2][0] to closer distance of (directly right item + 1, directly below item + 1, or itself) (Infinity or 1 + 1 or Infinity => 2)
  // second row of dp: [Infinity, Infinity, Infinity] (third row is now [2, 1, 0])
  // 12 (1) -> Number is not 0, set dp[1][2] to closer distance of (directly below item + 1, itself) (0 + 1, Infinity => 1)
  // 11 (1) -> Number is not 0, set dp[1][1] to closer distance of (directly right item + 1, directly below item + 1, or itself) (1 + 1, 1 + 1, Infinity => 2)
  // 10 (1) -> Number is not 0, set dp[1][0] to closer distance of (directly right item + 1, directly below item + 1, or itself) (2 + 1, 2 + 1, Infinity => 3)
  // first row of dp:  [Infinity, Infinity, Infinity] (second row is now [3, 2, 1])
  // 02 (1) -> Number is not 0, set dp[0][2] to closer distance of (directly below item + 1, itself) (1 + 1, Infinity => 2)
  // 01 (1) -> Number is not 0, set dp[0][1] to closer distance of (directly right item + 1, directly below item + 1, or itself) (2 + 1, 2 + 1, Infinity => 3)
  // 00 (1) -> Number is not 0, set dp[0][0] to closer distance of (directly right item + 1, directly below item + 1, or itself) (3 + 1, 3 + 1, Infinity => 4)

// dp is now:
  // [4, 3, 2]
  // [3, 2, 1]
  // [2, 1, 0]

// Time Complexity: O(mn) (two passes) 136ms
// Space Complexity: O(mn) 48MB
  var updateMatrix = function(mat) {
    let dp = [], width = mat[0].length, length = mat.length; 
    for (var i = 0; i < length; i++) {
      dp.push(Array(width).fill(Infinity));
      for (var j = 0; j < width; j++) {
        if (i > 0) {
          if (mat[i][j] === 0) dp[i][j] = 0;
          else {
            if (j > 0) dp[i][j] = Math.min(dp[i - 1][j], dp[i][j - 1]) + 1;
            else dp[i][j] = dp[i - 1][j] + 1;
          }
        } else {
          if (mat[i][j] === 0) dp[i][j] = 0;
          else if (j > 0) dp[i][j] = dp[i][j - 1] + 1;
        }
      }
    }
    for (var h = length - 1; h >= 0; h--) {
      for (var k = width - 1; k >= 0; k--) {
        if (h !== length - 1) {
          if (k !== width - 1) dp[h][k] = Math.min(dp[h][k], dp[h][k + 1] + 1, dp[h + 1][k] + 1); 
          else dp[h][k] = Math.min(dp[h][k], dp[h + 1][k] + 1);
        } else {
          if (k !== width - 1) dp[h][k] = Math.min(dp[h][k], dp[h][k + 1] + 1);
        }
      }
    }
    return dp;
  };
  
  // Four test cases to run function on
  console.log(updateMatrix([[1,1,1],[1,1,1],[1,1,0]])) // [[4,3,2],[3,2,1],[2,1,0]]
  console.log(updateMatrix([[0,0,0],[1,1,1],[1,1,0]])) // [[0,0,0],[1,1,1],[2,1,0]]
  console.log(updateMatrix([[0,0,0],[0,1,0],[0,0,0]])) // [[0,0,0],[0,1,0],[0,0,0]]
  console.log(updateMatrix([[0,0,0],[0,1,0],[1,1,1]])) // [[0,0,0],[0,1,0],[1,2,1]]