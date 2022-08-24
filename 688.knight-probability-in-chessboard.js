// 688. Knight Probability in Chessboard
// On an n x n chessboard, a knight starts at the cell (row, column) and attempts to make exactly k moves. The rows and columns are 0-indexed, so the top-left cell is (0, 0), and the bottom-right cell is (n - 1, n - 1).
// A chess knight has eight possible moves it can make, as illustrated below. Each move is two cells in a cardinal direction, then one cell in an orthogonal direction.
// Each time the knight is to move, it chooses one of eight possible moves uniformly at random (even if the piece would go off the chessboard) and moves there.
// The knight continues moving until it has made exactly k moves or has moved off the chessboard.
// Return the probability that the knight remains on the board after it has stopped moving.


// Solution: DP - Recursion w/ Memoization

// Memoize each dp(i, j, k), where
  // i = row number
  // j = column number
  // k = amount of moves left over

// If we go out of bounds, return 0.
// If k === 0, return 1.

// At each cell, the probability to go to a next cell is 1/8.
  // From that next cell, the probability to go to a next cell is 1/8, so in total 1/8 * 1/8 = 1/64.

// Time Complexity: O(n^2 * k * 8) 92ms
// Space Complexity: O(n^2 * k) 48.4MB
var knightProbability = function(n, k, row, column) {
  const directions = [[1, 2], [1, -2], [-1, 2], [-1, -2], [2, 1], [2, -1], [-2, 1], [-2, -1]];
  let memo = Array(n).fill(0).map(() => Array(n).fill(0).map(() => Array(k + 1).fill(-1)));
  return dp(row, column, k);
  
  function dp(i, j, k) {
    if (i < 0 || i >= n || j < 0 || j >= n) return 0;
    if (k === 0) return 1;
    if (memo[i][j][k] !== -1) return memo[i][j][k];
    
    let ways = 0;
    for (let [x, y] of directions) {
      let newX = i + x, newY = j + y;
      ways += dp(newX, newY, k - 1) * 0.125;
    }
    return memo[i][j][k] = ways;
  } 
};

// Two test cases to run function on
console.log(knightProbability(3, 2, 0, 0)) // 0.0625
console.log(knightProbability(1, 0, 0, 0)) // 1.00000