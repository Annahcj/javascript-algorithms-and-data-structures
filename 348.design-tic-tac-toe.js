// 348. Design Tic-Tac-Toe
// Assume the following rules are for the tic-tac-toe game on an n x n board between two players:
  // A move is guaranteed to be valid and is placed on an empty block.
  // Once a winning condition is reached, no more moves are allowed.
  // A player who succeeds in placing n of their marks in a horizontal, vertical, or diagonal row wins the game.
// Implement the TicTacToe class:
  // TicTacToe(int n) Initializes the object the size of the board n.
  // int move(int row, int col, int player) Indicates that the player with id player plays at the cell (row, col) of the board. The move is guaranteed to be a valid move.


// Solution: Count for Rows, Columns, and Diagonals

// Keep a count for each row, column, the diagonal, and anti-diagonal.
// Since there are only two players, we can add to the count as such:
  // player 1: +1
  // player 2: -1
// If the absolute value of the count is equal to n, then the player has won.

// To check whether a cell is part of the diagonal (top left to bottom right), the row should be equal to the column.
// To check whether a cell is part of the anti-diagonal (top right to bottom left), row + column should be equal to n - 1.

// Time Complexity: 200ms
  // initialization: O(n)
  // move: O(1)
// Space Complexity: O(n) 48.4MB
var TicTacToe = function(n) {
  this.rows = Array(n).fill(0);
  this.cols = Array(n).fill(0);
  this.diag = 0; // top left to bottom right
  this.antiDiag = 0; // top right to bottom left
  this.n = n;
};

TicTacToe.prototype.move = function(row, col, player) {
  let val = player === 1 ? 1 : -1, n = this.n;
  this.rows[row] += val;
  this.cols[col] += val;
  
  if (row === col) this.diag += val;
  if (row + col === n - 1) this.antiDiag += val;
  
  if (
    Math.abs(this.rows[row]) === n ||
    Math.abs(this.cols[col]) === n ||
    Math.abs(this.diag) === n ||
    Math.abs(this.antiDiag) === n
  ) {
    return player;
  }
  return 0;
};