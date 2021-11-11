// 576. Out of Boundary Paths
// There is an m x n grid with a ball. The ball is initially at the position [startRow, startColumn]. You are allowed to move the ball to one of the four adjacent cells in the grid (possibly out of the grid crossing the grid boundary). You can apply at most maxMove moves to the ball.
// Given the five integers m, n, maxMove, startRow, startColumn, return the number of paths to move the ball out of the grid boundary. Since the answer can be very large, return it modulo 109 + 7.


// Solution: Recursion w/ Memoization

// Memoize result at specific row, column, and number of moves left.

// m = number of rows, n = number of columns, k = maxMove
// Time Complexity: O(nmk) 128ms
// Space Complexity: O(nmk) 49MB
var findPaths = function(m, n, maxMove, startRow, startColumn) {
  let memo = new Map();
  const directions = [[0, 1], [1, 0], [0, -1], [-1, 0]];
  return dfs(startRow, startColumn, maxMove);

  function dfs(row, col, moves) {
    // if out of bounds, return 1
    if (row < 0 || row >= m || col < 0 || col >= n) return 1;
    // if memo already contains row, col, moves, -> return what is saved in memo
    if (memo.has(`${row},${col},${moves}`)) return memo.get(`${row},${col},${moves}`);
    // if we run out of moves, return 0
    if (moves === 0) return 0;
    let ans = 0;
    // traverse all four directions, mod by 10^9 + 7
    for (var [x, y] of directions) {
      let newX = row + x, newY = col + y;
      ans = (ans + dfs(newX, newY, moves - 1)) % 1000000007;
    }
    // save ans in memo at current state and return for earlier calls
    memo.set(`${row},${col},${moves}`, ans);
    return ans;
  }  
};

// Two test cases to run function on
console.log(findPaths(2, 2, 2, 0, 0)) // 6
console.log(findPaths(1, 3, 3, 0, 1)) // 12