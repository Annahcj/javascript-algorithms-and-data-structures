// 51. N-Queens
// The n-queens puzzle is the problem of placing n queens on an n x n chessboard such that no two queens attack each other.
// Given an integer n, return all distinct solutions to the n-queens puzzle. You may return the answer in any order.
// Each solution contains a distinct board configuration of the n-queens' placement, where 'Q' and '.' both indicate a queen and an empty space, respectively.


// Solution: Backtracking

// Create a new board 
// We can loop through every cell in the board,
  // use row as base point -> once we put a queen, call backtrack for row + 1
  // loop through from 0 to n (column)
    // keep track of cols that we have visited already
    // keep track of left to right diagonals we have visited already -> row + col
    // keep track of right to left diagonals we have visited already -> row - col

// Time Complexity: O(n!) 80ms
// Space Complexity: O(n^2) 41.1MB
var solveNQueens = function(n) {
  let board = Array(n), res = [];
  for (var i = 0; i < n; i++) {
    board[i] = Array(n).fill('.');
  }  
  backtrack(0, {}, {}, {});
  return res;
  function backtrack(row, cols, lrDiag, rlDiag) {
    // base case -> call saveBoard to create deep copy and push into result
    if (row === n) {
      saveBoard(board);
      return;
    }
    for (var col = 0; col < n; col++) {
      let currLRDiag = row + col;
      let currRLDiag = row - col;
      if (cols[col] || lrDiag[currLRDiag] || rlDiag[currRLDiag]) {
        continue;
      }
      cols[col] = true;
      lrDiag[currLRDiag] = true;
      rlDiag[currRLDiag] = true;
      board[row][col] = 'Q';
      backtrack(row + 1, cols, lrDiag, rlDiag);
      cols[col] = false;
      lrDiag[currLRDiag] = false;
      rlDiag[currRLDiag] = false;
      board[row][col] = '.';
    }
  }
  function saveBoard(board) {
    let copy = Array(n);
    for (var i = 0; i < n; i++) {
      copy[i] = board[i].join("");
    }
    res.push(copy);
  } 
};

// Two test cases to run function on
console.log(solveNQueens(4)) // [[".Q..","...Q","Q...","..Q."],["..Q.","Q...","...Q",".Q.."]]
console.log(solveNQueens(1)) // [["Q"]]