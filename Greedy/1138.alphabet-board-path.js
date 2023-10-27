// 1138. Alphabet Board Path
// On an alphabet board, we start at position (0, 0), corresponding to character board[0][0].
// Here, board = ["abcde", "fghij", "klmno", "pqrst", "uvwxy", "z"], as shown in the diagram below.
// We may make the following moves:
  // 'U' moves our position up one row, if the position exists on the board;
  // 'D' moves our position down one row, if the position exists on the board;
  // 'L' moves our position left one column, if the position exists on the board;
  // 'R' moves our position right one column, if the position exists on the board;
  // '!' adds the character board[r][c] at our current position (r, c) to the answer.
// (Here, the only positions that exist on the board are positions with letters on them.)
// Return a sequence of moves that makes our answer equal to target in the minimum number of moves.  You may return any path that does so.


// Solution: Greedy 

// Map each character to its position in the board.
// The minimum distance to move from one cell to another is always Math.abs(row1 - row2) + Math.abs(column1 - column2).
// We always move straight in one direction horizontally and straight in one direction vertically, depending on the row/column positions.

// However, due to the position of 'z', we need to make sure we never move off the board.
// To ensure this, we account for the two situations:
  // 1. If new position is lower than the current position: Move horizontally, then vertically. 
  // 2. If new position is higher than the current position: Move vertically, then horizontally.
// This will ensure we never move off the board when moving to/from character 'z'.
// For other characters, the directions make no difference, so we can follow the same direction pattern.

// n = length of target
// Time Complexity: O(n) 86ms
// Space Complexity: O(1) (not including output) 42.4MB
var alphabetBoardPath = function(target) {
  let position = [[0, 0],[0, 1],[0, 2],[0, 3],[0, 4],[1, 0],[1, 1],[1, 2],[1, 3],[1, 4],[2, 0],[2, 1],[2, 2],[2, 3],[2, 4],[3, 0],[3, 1],[3, 2],[3, 3],[3, 4],[4, 0],[4, 1],[4, 2],[4, 3],[4, 4],[5, 0]]; // position[i] = [row, column] of character i in the board
  let moves = "", row = 0, col = 0;
  for (let char of target) {
    let [newRow, newCol] = position[char.charCodeAt() - 97];
    let horiDirection = col <= newCol ? 'R' : 'L';
    let columnDiff = Math.abs(col - newCol);
    if (newRow > row) { // new position is lower than the current position
      moves += horiDirection.repeat(columnDiff);
      moves += 'D'.repeat(newRow - row);
    } else { // new position is higher than the current position
      moves += 'U'.repeat(row - newRow);
      moves += horiDirection.repeat(columnDiff);
    }
    moves += '!';
    row = newRow, col = newCol;
  }
  return moves;
};

// Two test cases
console.log(alphabetBoardPath("leet")) // "RDD!UURRR!!DDD!"
console.log(alphabetBoardPath("code")) // "RR!DDRR!UUL!R!"