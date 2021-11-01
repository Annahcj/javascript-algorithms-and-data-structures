// 130. Surrounded Regions
// Given an m x n matrix board containing 'X' and 'O', capture all regions that are 4-directionally surrounded by 'X'.
// A region is captured by flipping all 'O's into 'X's in that surrounded region.


// Solution: DFS from border in

// 1. For each O on the border, dfs and mark any O's connected to them as visited (visited = connected to border).
// 2. Loop through each cell in the board, turn any non-visited O's into X.

// Time Complexity: O(nm) 104ms
// Space Complexity: O(nm) 44.5MB
var solve = function(board) {
  let visited = new Set();
  const directions = [[0, 1], [1, 0], [0, -1], [-1, 0]];
  let n = board.length, m = board[0].length;
  // dfs starting from first row and last row
  for (var j = 0; j < m; j++) {
    if (board[0][j] === 'O') dfs(0, j);
    if (board[n - 1][j] === 'O') dfs(n - 1, j);
  }
  // dfs starting from first column and last column
  for (var i = 1; i < n - 1; i++) {
    if (board[i][0] === 'O') dfs(i, 0);
    if (board[i][n - 1] === 'O') dfs(i, n - 1);
  }
  
  // turn any non-visited cells into X
  for (var i = 1; i < n - 1; i++) {
    for (var j = 1; j < m - 1; j++) {
      if (!visited.has(`${i},${j}`)) {
        board[i][j] = 'X';
      }
    }
  }
  return board;

  function dfs(row, col) {
    // if coordinates are out of bounds or cell is not 'O', return.
    if (row < 0 || row >= n || col < 0 || col >= m) return;
    if (board[row][col] !== 'O') return; 
    // loop in all four directions, dfs new coordinates if not visited yet
    for (var [x, y] of directions) {
      let newX = row + x, newY = col + y;
      if (!visited.has(`${newX},${newY}`)) {
        visited.add(`${newX},${newY}`);
        dfs(newX, newY);
      }
    }
  }
};

// Two test cases to run function on
console.log(solve([["O","O","O"],["O","O","O"],["O","O","O"]])) // [["O","O","O"],["O","O","O"],["O","O","O"]]
console.log(solve([["X","X","X","X"],["X","O","O","X"],["X","X","O","X"],["X","O","X","X"]])) // [["X","X","X","X"],["X","X","X","X"],["X","X","X","X"],["X","O","X","X"]]