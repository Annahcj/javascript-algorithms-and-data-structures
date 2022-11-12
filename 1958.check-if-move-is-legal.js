// 1958. Check if Move is Legal
// You are given a 0-indexed 8 x 8 grid board, where board[r][c] represents the cell (r, c) on a game board. On the board, free cells are represented by '.', white cells are represented by 'W', and black cells are represented by 'B'.
// Each move in this game consists of choosing a free cell and changing it to the color you are playing as (either white or black). However, a move is only legal if, after changing it, the cell becomes the endpoint of a good line (horizontal, vertical, or diagonal).
// A good line is a line of three or more cells (including the endpoints) where the endpoints of the line are one color, and the remaining cells in the middle are the opposite color (no cells in the line are free). 
// Given two integers rMove and cMove and a character color representing the color you are playing as (white or black), return true if changing cell (rMove, cMove) to color color is a legal move, or false if it is not legal.


// Solution: Simulation

// There are eight different directions in which board[rMove][cMove] can be an endpoint for.
  // Straight: Up, down, left, right
  // Diagonal: Left-up diagonal, right-up diagonal, left-down diagonal, right-down diagonal

// Check all eight directions, if any direction is valid, return true.
  // Traverse in each direction and find the second cell in the line with the endpoint color.
  // If any free cell is found, it is not a good line.
  // If there was at least one cell in between them, it is a good line.

// Time Complexity: O(mn) 58ms
// Space Complexity: O(1) 43.8MB
var checkMove = function(board, rMove, cMove, color) {
  const directions = [[-1, 0], [-1, 1], [0, 1], [1, 1], [1, 0], [1, -1], [0, -1], [-1, -1]];
  let m = board.length, n = board[0].length;
  board[rMove][cMove] = color;
  
  for (let [x, y] of directions) {
    let row = rMove + x, col = cMove + y;
    let isGoodLine = false, cells = 1;
    while (row >= 0 && row < m && col >= 0 && col < n) {
      cells++;
      if (board[row][col] === '.') break; // a good line cannot have free cells
      if (board[row][col] === color) { // found the other endpoint, must have at least one cell in between to be a good line
        isGoodLine = cells >= 3;
        break;
      }
      row += x, col += y;
    }
    if (isGoodLine) return true;
  }
  return false;
};

// Two test cases
console.log(checkMove([[".",".",".","B",".",".",".","."],[".",".",".","W",".",".",".","."],[".",".",".","W",".",".",".","."],[".",".",".","W",".",".",".","."],["W","B","B",".","W","W","W","B"],[".",".",".","B",".",".",".","."],[".",".",".","B",".",".",".","."],[".",".",".","W",".",".",".","."]], 4, 3, "B")) // true
console.log(checkMove([[".",".",".",".",".",".",".","."],[".","B",".",".","W",".",".","."],[".",".","W",".",".",".",".","."],[".",".",".","W","B",".",".","."],[".",".",".",".",".",".",".","."],[".",".",".",".","B","W",".","."],[".",".",".",".",".",".","W","."],[".",".",".",".",".",".",".","B"]], 4, 4, "W")) // false