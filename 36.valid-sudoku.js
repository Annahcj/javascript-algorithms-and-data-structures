// 36. Valid Sudoku
// Determine if a 9 x 9 Sudoku board is valid. Only the filled cells need to be validated according to the following rules:
// Each row must contain the digits 1-9 without repetition.
// Each column must contain the digits 1-9 without repetition.
// Each of the nine 3 x 3 sub-boxes of the grid must contain the digits 1-9 without repetition.
// Note:
// A Sudoku board (partially filled) could be valid but is not necessarily solvable.
// Only the filled cells need to be validated according to the mentioned rules.


// Solution: Arrays

// Loop through each row in board 
  // Check the row
  // Check the column (simply swapping the indexes (ij -> ji))
  // Check the box (3 * Math.floor(i / 3) + Math.floor(j / 3), 3 * (i % 3) + (j % 3))

  // 00 01 02 | 03 04 05 | 06 07 08
  // 10 11 12 | 13 14 15 | 16 17 18  // i = 0, 1, 2
  // 20 21 22 | 23 24 25 | 26 27 28
  // ------------------------------
  // 30 31 32 | 33 34 35 | 36 37 38
  // 40 41 42 | 43 44 45 | 46 47 48  // i = 3, 4, 5
  // 50 51 52 | 53 54 55 | 56 57 58
  // ------------------------------
  // 60 61 62 | 63 64 65 | 66 67 68 
  // 70 71 72 | 73 74 75 | 76 77 78  // i = 6, 7, 8
  // 80 81 82 | 83 84 85 | 86 87 88

  // For i: 
  // 00 -> 00
  // 01 -> 01
  // 02 -> 02
  // 03 -> 10
  // 04 -> 11
  // 05 -> 12
  // 06 -> 20
  // 07 -> 21
  // 08 -> 22

  // 10 -> 03
  // 11 -> 04
  // 12 -> 05
  // 13 -> 13
  // 14 -> 14
  // 15 -> 15
  // 16 -> 23
  // 17 -> 24
  // 18 -> 25

  // so, the pattern we can see here is that 'i' always becomes 3 * Math.floor(i / 3) + Math.floor(j / 3)
  // j always becomes 3 * (i % 3) + (j % 3)

// Algorithm:
// Loop through each row in board (pointer = i)
  // set rows, cols, boxes to new arrays with lengths of 9
  // loop through each cell in row (pointer = j)
    // let row = board[i][j] (turn into number)
    // let col = board[j][i] (01 -> 10, 02 -> 20)
    // let box = board[3 * Math.floor(i / 3) + Math.floor(j / 3)][3 * (i % 3) + (j % 3)]
    // If row is valid (not '.'),
      // If rows already contains row, return false.
      // Otherwise, set rows[row] to 1
    // If col is valid
      // If cols already contains col, return false.
      // Otherwise, set cols[col] to 1
    // If box is valid
      // If boxes already contains box, return false.
      // Otherwise, set boxes[box] to 1
// If end of loops are reached, return true.

// Time Complexity: O(n^2) 100ms
// Space Complexity: O(n) 42ms
  var isValidSudoku = function(board) {
    let length = board.length;
    for (var i = 0; i < length; i++) {
      let rows = new Array(length);
      let cols = new Array(length);
      let boxes = new Array(length);
      for (var j = 0; j < length; j++) {
        let row = +board[i][j];
        let col = +board[j][i];
        let box = +board[3 * Math.floor(i / 3) + Math.floor(j / 3)][3 * (i % 3) + (j % 3)];
        if (row) {
          if (rows[row]) return false;
          rows[row] = 1;
        }
        if (col) {
          if (cols[col]) return false;
          cols[col] = 1;
        }
        if (box) {
          if (boxes[box]) return false; 
          boxes[box] = 1;
        }
      }
    }
    return true;
  };
  console.log(isValidSudoku([
    ["5","3",".",".","7",".",".",".","."]
  ,["6",".",".","1","9","5",".",".","."]
  ,[".","9","8",".",".",".",".","6","."]
  ,["8",".",".",".","6",".",".",".","3"]
  ,["4",".",".","8",".","3",".",".","1"]
  ,["7",".",".",".","2",".",".",".","6"]
  ,[".","6",".",".",".",".","2","8","."]
  ,[".",".",".","4","1","9",".",".","5"]
  ,[".",".",".",".","8",".",".","7","9"]
  ])) // true
  console.log(isValidSudoku([
    ["8","3",".",".","7",".",".",".","."]
  ,["6",".",".","1","9","5",".",".","."]
  ,[".","9","8",".",".",".",".","6","."]
  ,["8",".",".",".","6",".",".",".","3"]
  ,["4",".",".","8",".","3",".",".","1"]
  ,["7",".",".",".","2",".",".",".","6"]
  ,[".","6",".",".",".",".","2","8","."]
  ,[".",".",".","4","1","9",".",".","5"]
  ,[".",".",".",".","8",".",".","7","9"]
  ])) // false