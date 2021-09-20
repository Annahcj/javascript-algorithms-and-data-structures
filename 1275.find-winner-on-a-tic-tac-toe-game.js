// 1275. Find Winner on a Tic Tac Toe Game
// Tic-tac-toe is played by two players A and B on a 3 x 3 grid.
// Here are the rules of Tic-Tac-Toe:
// Players take turns placing characters into empty squares (" ").
// The first player A always places "X" characters, while the second player B always places "O" characters.
// "X" and "O" characters are always placed into empty squares, never on filled ones.
// The game ends when there are 3 of the same (non-empty) character filling any row, column, or diagonal.
// The game also ends if all squares are non-empty.
// No more moves can be played if the game is over.
// Given an array moves where each element is another array of size 2 corresponding to the row and column of the grid where they mark their respective character in the order in which A and B play.
// Return the winner of the game if it exists (A or B), in case the game ends in a draw return "Draw", if there are still movements to play return "Pending".
// You can assume that moves is valid (It follows the rules of Tic-Tac-Toe), the grid is initially empty and A will play first.


// Solution: Flexible Solution

// Create a 3-by-3 grid/matrix
// Since player A always starts first, the indexes of the moves of player A will always be even, and odd for player B.
// We can loop through moves (pointer = i)
  // [x, y] = moves[i]
  // if i is even,
    // set grid[x][y] to 'X'
    // if won(x, y, 'X') returns true, return 'A'.
  // otherwise if i is odd,
    // set grid[x][y] to 'O'
    // if won(x, y, 'O') returns true, return 'B'
// If the loop finishes, return 'Draw' if moves.length is equal to 9, otherwise return 'Pending'.

// won: (row, column, player (either X or O))
  // (check if the horizontal row is full of only 'player')
  // (check if the vertical row is full of only 'player')
  // (check if the left diagonal row is full of only 'player')
  // (check if the right diagonal row is full of only 'player')
  // (after every check, return true if any of these conditions are fulfilled)

// Time Complexity: O(n^2) 91ms
// Space Complexity: O(n^2) 38.6MB
var tictactoe = function(moves) {
  let n = 3;
  let grid = Array(n);
  for (var i = 0; i < n; i++) {
    grid[i] = Array(n);
  } 
  for (var i = 0; i < moves.length; i++) {
    let [x, y] = moves[i];
    if (i % 2 === 0) {
      grid[x][y] = 'X';
      if (won(x, y, 'X')) return 'A';
    } else {
      grid[x][y] = 'O';
      if (won(x, y, 'O')) return 'B';
    }
  }
  return moves.length === n * n ? 'Draw' : 'Pending';

  function won(row, col, player) {
    // check for horizontal win
    let rowCount = 0;
    for (var j = 0; j < n; j++) {
      if (grid[row][j] === player) rowCount++;
    }
    if (rowCount === n) return true;
    // check for vertical win
    let colCount = 0;
    for (var i = 0; i < n; i++) {
      if (grid[i][col] === player) colCount++;
    }
    if (colCount === n) return true;
    // check for left diagonal win
    if (row === col) {
      let leftDiagCount = 0;
      for (i = 0; i < n; i++) {
        if (grid[i][i] === player) leftDiagCount++;
      }
      if (leftDiagCount === n) return true;
    }
    // check for right diagonal win
    if (row + col === n - 1) {
      let rightDiagCount = 0;
      for (i = 0; i < n; i++) {
        j = n - 1 - i;
        if (grid[i][j] === player) rightDiagCount++;
      }
      if (rightDiagCount === n) return true;
    } 
  }
};

// Four test cases to run function on
console.log(tictactoe([[0,0],[2,0],[1,1],[2,1],[2,2]])) // "A"
console.log(tictactoe([[0,0],[1,1],[0,1],[0,2],[1,0],[2,0]])) // "B"
console.log(tictactoe([[0,0],[1,1],[2,0],[1,0],[1,2],[2,1],[0,1],[0,2],[2,2]])) // "Draw"
console.log(tictactoe([[0,0],[1,1]])) // "Pending"