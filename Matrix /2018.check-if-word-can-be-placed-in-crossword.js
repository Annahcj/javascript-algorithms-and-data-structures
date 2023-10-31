// 2018. Check if Word Can Be Placed In Crossword
// You are given an m x n matrix board, representing the current state of a crossword puzzle. The crossword contains lowercase English letters (from solved words), ' ' to represent any empty cells, and '#' to represent any blocked cells.
// A word can be placed horizontally (left to right or right to left) or vertically (top to bottom or bottom to top) in the board if:
// It does not occupy a cell containing the character '#'.
// The cell each letter is placed in must either be ' ' (empty) or match the letter already on the board.
// There must not be any empty cells ' ' or other lowercase letters directly left or right of the word if the word was placed horizontally.
// There must not be any empty cells ' ' or other lowercase letters directly above or below the word if the word was placed vertically.
// Given a string word, return true if word can be placed in board, or false otherwise.


// Solution: Row by Row, Transpose

// Time Complexity: O(nm) 207ms
// Space Complexity: O(nm) 
var placeWordInCrossword = function(board, word) {
  let width = board[0].length, length = board.length;
  let board2 = [];
  // creates another board to that we can check the columns horizontally 
  for (let i = 0; i < width; i++) {
    board2.push(Array(length));
    for (let j = 0; j < length; j++) {
      board2[i][j] = board[j][i];
    }
  }
  return gridMatch(board) || gridMatch(board2);

  // checks each row of the grid (horizontal matches)
  function gridMatch(grid) {
    let width = grid[0].length, length = grid.length;
    for (let i = 0; i < length; i++) {
      let j = 0, start;
      while (j < width) {
        while (grid[i][j] === '#') j++;
        start = j;
        while (grid[i][j] !== '#' && j < width) j++;
        if (match(grid, i, start, j, word)) return true;
      }
    }
    return false;
  }  

  // checks if word can be placed in patch
    // checks left to right and right to left
  function match(grid, row, start, end, str) {
    if (end - start !== str.length) return false;
    let left = true, right = true;
    for (let j = start; j < end; j++) {
      if (grid[row][j] !== ' ' && grid[row][j] !== str[j - start]) {
        left = false;
        break;
      }
    }
    if (left) return true;
    let idx = 0;
    for (let j = end - 1; j >= start; j--, idx++) {
      if (grid[row][j] !== ' ' && grid[row][j] !== str[idx]) {
        right = false;
        break;
      }
    }
    return right;
  }
};

// Three test cases
console.log(placeWordInCrossword([[" "],["#"],["o"],[" "],["t"],["m"],["o"],[" "],["#"],[" "]], "octmor")) // true
console.log(placeWordInCrossword([["#", " ", "#"], [" ", " ", "#"], ["#", "c", " "]], "abc")) // true
console.log(placeWordInCrossword([[" ", "#", "a"], [" ", "#", "c"], [" ", "#", "a"]], "ac")) // false
console.log(placeWordInCrossword([["#", " ", "#"], [" ", " ", "#"], ["#", " ", "c"]], "ca")) // true
console.log(placeWordInCrossword([["#", " ", "#"], ["#", " ", "#"], ["#", " ", "c"]], "ca")) // true