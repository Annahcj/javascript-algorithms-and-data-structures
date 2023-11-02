// 37. Sudoku Solver
// Write a program to solve a Sudoku puzzle by filling the empty cells.
// A sudoku solution must satisfy all of the following rules:
// Each of the digits 1-9 must occur exactly once in each row.
// Each of the digits 1-9 must occur exactly once in each column.
// Each of the digits 1-9 must occur exactly once in each of the 9 3x3 sub-boxes of the grid.
// The '.' character indicates empty cells.


// Solution: DFS Recursive

// let n be the length of board (9)
// call dfs(board, n)

// isValid: board, row, col, n, num 
  // (checks horizontal, vertical, and 3-by-3 box for num (if it's already there, its invalid))
  // now, find the coordinates of the left top corner of the 3-by-3 box
  // set r to Math.floor(row / 3) * 3
  // set c to Math.floor(col / 3) * 3
  // loop through from 0 to n (9) (pointer = i) *
    // (check for horizontal and vertical)
    // if board[row][i] is equal to num OR board[i][col] is equal to num, return false.
    // (currRow, currCol are current coordinates of 3-by-3 box)
    // set currRow to r + Math.floor(i / 3)
    // set currCol to c + (i % 3)
    // if board[currRow][currCol] is equal to num, return false.
  // *
  // if we have reached the end, return true.

// dfs: (board, n) 
  // Loop through each row in board *
    // loop through each cell/column in row **
      // If board[row][column] is already filled, continue (skip).
      // Otherwise,
        // loop through from 1 to 9 (pointer = i) (trying out each possibility) ***
          // let num be i as a string. (numbers on the board are strings)
          // if isValid returns true for num,
            // set board[row][col] to num
            // (next step is recursive call to see if the solution is correct)
            // if dfs(board, n) returns true, return true.
        // ***
        // if we have got to the end, reset board[row][col] to '.', and return false (none of the numbers were valid)
    // **
  // *
  // if we have reached the end without returning false, return true.

// Time Complexity: O(9 ^ mn) 108ms
// Space Complexity: O(mn)
var solveSudoku = function(board) {
  let n = board.length;
  dfs(board, n); 
};
function dfs(board, n) {
  for (var row = 0; row < n; row++) {
    for (var col = 0; col < n; col++) {
      if (board[row][col] !== '.') continue;
      for (let i = 1; i <= 9; i++) {
        let num = i.toString();
        if (isValid(board, row, col, n, num)) {
          board[row][col] = num;
          if (dfs(board, n)) return true;
        }
      }
      board[row][col] = '.';
      return false;
    }
  }
  return true;
}
function isValid(board, row, col, n, num) {
  const r = Math.floor(row / 3) * 3;
  const c = Math.floor(col / 3) * 3;
  for (let i = 0; i < n; i++) {
    if (board[row][i] === num || board[i][col] === num) return false;
    const currRow = r + Math.floor(i / 3);
    const currCol = c + (i % 3);
    if (board[currRow][currCol] === num) return false;
  }
  return true;
}

// A test case
console.log(solveSudoku([["5","3",".",".","7",".",".",".","."],["6",".",".","1","9","5",".",".","."],[".","9","8",".",".",".",".","6","."],["8",".",".",".","6",".",".",".","3"],["4",".",".","8",".","3",".",".","1"],["7",".",".",".","2",".",".",".","6"],[".","6",".",".",".",".","2","8","."],[".",".",".","4","1","9",".",".","5"],[".",".",".",".","8",".",".","7","9"]]))
// [["5","3","4","6","7","8","9","1","2"],["6","7","2","1","9","5","3","4","8"],["1","9","8","3","4","2","5","6","7"],["8","5","9","7","6","1","4","2","3"],["4","2","6","8","5","3","7","9","1"],["7","1","3","9","2","4","8","5","6"],["9","6","1","5","3","7","2","8","4"],["2","8","7","4","1","9","6","3","5"],["3","4","5","2","8","6","1","7","9"]]