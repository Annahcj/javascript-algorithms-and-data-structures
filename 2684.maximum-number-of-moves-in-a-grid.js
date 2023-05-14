// 2684. Maximum Number of Moves in a Grid
// You are given a 0-indexed m x n matrix grid consisting of positive integers.
// You can start at any cell in the first column of the matrix, and traverse the grid in the following way:
  // From a cell (row, col), you can move to any of the cells: (row - 1, col + 1), (row, col + 1) and (row + 1, col + 1) such that the value of the cell you move to, should be strictly bigger than the value of the current cell.
// Return the maximum number of moves that you can perform.


// Solution: DP - Recursion w/ Memoization

// Memoize each dp(row, col), where dp(row, col) = the maximum number of moves we can perform starting from (row, col).
// For each dp(row, col), traverse in three directions and record the maximum number of moves.

// m = number of rows, n = number of columns
// Time Complexity: O(mn) 140ms
// Space Complexity: O(mn) 54.1MB
var maxMoves = function(grid) {
  let m = grid.length, n = grid[0].length;
  let memo = Array(m).fill(0).map(() => Array(n).fill(-1));
  const directions = [[-1, 1], [0, 1], [1, 1]];
  let maxMoves = 0;
  for (let i = 0; i < m; i++) {
    maxMoves = Math.max(maxMoves, dp(i, 0));
  }
  return maxMoves;
  
  function dp(row, col) {
    if (col === n - 1) return 0;
    if (memo[row][col] !== -1) return memo[row][col];
    
    let ans = 0;
    for (let [x, y] of directions) {
      let newRow = row + x, newCol = col + y;
      if (newRow < 0 || newRow >= m || newCol < 0 || newCol >= n || grid[newRow][newCol] <= grid[row][col]) continue; // out of bounds or value is not bigger
      ans = Math.max(ans, 1 + dp(newRow, newCol));
    }
    return memo[row][col] = ans;
  }
};

// Two test cases
console.log(maxMoves([[2,4,3,5],[5,4,9,3],[3,4,2,11],[10,9,13,15]])) // 3
console.log(maxMoves([[3,2,4],[2,1,9],[1,1,7]])) // 0