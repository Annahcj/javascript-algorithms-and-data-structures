// 289. Game of Life
// According to Wikipedia's article: "The Game of Life, also known simply as Life, is a cellular automaton devised by the British mathematician John Horton Conway in 1970."
// The board is made up of an m x n grid of cells, where each cell has an initial state: live (represented by a 1) or dead (represented by a 0). Each cell interacts with its eight neighbors (horizontal, vertical, diagonal) using the following four rules (taken from the above Wikipedia article):
  // 1. Any live cell with fewer than two live neighbors dies as if caused by under-population.
  // 2. Any live cell with two or three live neighbors lives on to the next generation.
  // 3. Any live cell with more than three live neighbors dies, as if by over-population.
  // 4. Any dead cell with exactly three live neighbors becomes a live cell, as if by reproduction.
// The next state is created by applying the above rules simultaneously to every cell in the current state, where births and deaths occur simultaneously. Given the current state of the m x n grid board, return the next state.

 
// Solution 1: Copy Board

// Copy the board.
// Modifiy the original board and use the copy to check the original values.

// Time Complexity: O(mn) 110ms
// Space Complexity: O(mn) 41.2MB
var gameOfLife = function(board) {
  let m = board.length, n = board[0].length;
  let copy = Array(m);
  for (var i = 0; i < m; i++) {
    copy[i] = [...board[i]];
  }
  const directions = [[-1, -1], [-1, 0], [-1, 1], [0, -1], [0, 1], [1, -1], [1, 0], [1, 1]];
  for (var row = 0; row < m; row++) {
    for (var col = 0; col < n; col++) {
      let liveNeighbors = 0;
      for (var [x, y] of directions) {
        let newX = row + x, newY = col + y;
        if (newX < 0 || newX >= m || newY < 0 || newY >= n || copy[newX][newY] === 0) continue;
        liveNeighbors++;
      }
      board[row][col] = 0;
      if (liveNeighbors === 3) board[row][col] = 1;
      if (copy[row][col] === 1) {
        if (liveNeighbors === 2) board[row][col] = 1;
      } 
    }
  } 
  return board; 
};

// Solution 2: Optimized Space

// Use special values to mark cells.
// originally live but now dead: -1
// originally dead but now live: 2

// To check whether a neighboring cell is live, check the absolute value (-1 becomes 1, 1 is 1).

// Time Complexity: O(mn) 94ms
// Space Complexity: O(1) 41.5MB
var gameOfLife = function(board) {
  let m = board.length, n = board[0].length;
  const directions = [[-1, -1], [-1, 0], [-1, 1], [0, -1], [0, 1], [1, -1], [1, 0], [1, 1]];
  for (var row = 0; row < m; row++) {
    for (var col = 0; col < n; col++) {
      let liveNeighbors = 0;
      for (var [x, y] of directions) {
        let newX = row + x, newY = col + y;
        if (newX < 0 || newX >= m || newY < 0 || newY >= n) continue;
        if (Math.abs(board[newX][newY]) === 1) liveNeighbors++;
      }
      if (board[row][col] === 1 && (liveNeighbors < 2 || liveNeighbors > 3)) {
        board[row][col] = -1; // originally live but now dead
      } 
      if (board[row][col] === 0 && liveNeighbors === 3) {
        board[row][col] = 2; // originally dead but now live
      }
    }
  } 
  for (row = 0; row < m; row++) {
    for (col = 0; col < n; col++) {
      if (board[row][col] >= 1) board[row][col] = 1;
      else board[row][col] = 0;
    }
  }
  return board; 
};

// Two test cases to run function on
console.log(gameOfLife([[0,1,0],[0,0,1],[1,1,1],[0,0,0]])) // [[0,0,0],[1,0,1],[0,1,1],[0,1,0]]
console.log(gameOfLife([[1,1],[1,0]])) // [[1,1],[1,1]]