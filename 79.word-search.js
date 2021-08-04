// 79. Word Search
// Given an m x n grid of characters board and a string word, return true if word exists in the grid.
// The word can be constructed from letters of sequentially adjacent cells, where adjacent cells are horizontally or vertically neighboring. The same letter cell may not be used more than once.


// Solution: Backtracking

// Logic:
// Basically loop through the board until you find a cell that matches the first letter in word.
// For every cell that matches, run a backtrack function on it, if it return true, return true, otherwise keep going.
// (the backtrack function is basically like a dfs to find the next letter in word)
// the backtrack function: has the indexes of the position in the board as well as the index of the letter we are up to.
// set the cell to something else (like '.') so that we will not go back to it again.
// run backtrack function for all four directions (up, right, down, left)
// then set the cell back to it's original value.

// Algorithm:
// Length is board.length, width is board[0].length
// Set the four directions which you will try to go each time
// Loop through each cell in board (i, j)
  // If cell is equal to word[0]
    // If backtrack(i, j, 0) returns true, return true, otherwise keep going.
// If we have reached the end, return false (not found)
// backtrack: (accepts i, j, k) 
// Edge case to stop function: If i or j is out of bounds OR value at board[i][j] is not equal to word[k], return.
// Otherwise, if k is equal to word.length - 1 (meaning we found the entire word) return true.
// Otherwise, set board[i][j] to '.' (basically marking it as visited)
// Loop through directions
  // Recursively call backtrack for current coordinates + the coordinates in directions, as well as k + 1 (next letter in word),
    // If this returns true, return true.
// Reset board[i][j] back to word[k] (so that it will be back to original for the next occurance of first letter in word)
// If it got to this point, return false (not found)

// Time Complexity: O(n * 3^l) n = cells in board, l = length of word. 364ms
// Space Complexity: O(l) 39.2MB
  var exist = function(board, word) {
    const length = board.length, width = board[0].length;
    const directions = [[0, 1], [1, 0], [0, -1], [-1, 0]];
    for (var i = 0; i < length; i++) {
      for (var j = 0; j < width; j++) {
        if (board[i][j] === word[0]) {
          if (backtrack(i, j, 0)) return true;
        }
      }
    }
    return false;
    function backtrack(i, j, k) {
      if (i < 0 || i >= length || j < 0 || j >= width || board[i][j] !== word[k]) return;
      if (k === word.length - 1) return true;
      board[i][j] = '.';
      for (var l = 0; l < directions.length; l++) {
        if (backtrack(i + directions[l][0], j + directions[l][1], k + 1)) return true;
      }
      board[i][j] = word[k];
      return false;
    }
  };
  
  // Three test cases to run function on
  console.log(exist([["A","B","C","E"],["S","F","C","S"],["A","D","E","E"]], "ABCCED")) // true
  console.log(exist([["A","B","C","E"],["S","F","C","S"],["A","D","E","E"]], "SEE")) // true
  console.log(exist([["A","B","C","E"],["S","F","C","S"],["A","D","E","E"]], "ABCB")) // false