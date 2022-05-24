// 419. Battleships in a Board
// Given an m x n matrix board where each cell is a battleship 'X' or empty '.', return the number of the battleships on board.
// Battleships can only be placed horizontally or vertically on board. In other words, they can only be made of the shape 1 x k (1 row, k columns) or k x 1 (k rows, 1 column), where k can be of any size. At least one horizontal or vertical cell separates between two battleships (i.e., there are no adjacent battleships).


// Solution: Count Top-Left Corners

// Count the number of battleships on the board by counting each ship's top-left corner.
// A ship will either be horizontal or vertical, so it will either be the left-most cell or the top-most cell.
// Check whether a cell is the top-left corner by looking at the cell values on the left and top.

// Time Complexity: O(mn) 101ms
// Space Complexity: O(1) 42.4MB
var countBattleships = function(board) {
  let m = board.length, n = board[0].length;
  let ans = 0;
  for (let i = 0; i < m; i++) {
    for (let j = 0; j < n; j++) {
      if (board[i][j] === '.') continue;
      if ((j > 0 && board[i][j - 1] === 'X') || (i > 0 && board[i - 1][j] === 'X')) continue;
      ans++;
    }
  }
  return ans;
};

// Two test cases to run function on
console.log(countBattleships([["X",".",".","X"],[".",".",".","X"],[".",".",".","X"]])) // 2
console.log(countBattleships([["."]])) // 0