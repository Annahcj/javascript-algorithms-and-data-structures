// 52. N-Queens II
// The n-queens puzzle is the problem of placing n queens on an n x n chessboard such that no two queens attack each other.
// Given an integer n, return the number of distinct solutions to the n-queens puzzle.


// Solution: Backtracking

// backtrack: (row, cols, lrDiag, rlDiag)
  // use row as base point -> once we put a queen, call backtrack for row + 1
  // loop through from 0 to n (column)
    // keep track of cols that we have visited already
    // keep track of left to right diagonals we have visited already -> row + col
    // keep track of right to left diagonals we have visited already -> row - col

// Time Complexity: O(n!) 87ms
// Space Complexity: O(n) 39.2MB
var totalNQueens = function(n) {
  let total = 0;
  backtrack(0, {}, {}, {});
  return total;
  function backtrack(row, cols, lrDiag, rlDiag) {
    // base case: increase total count by one and return
    if (row === n) {
      total++;
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
      backtrack(row + 1, cols, lrDiag, rlDiag);
      cols[col] = false;
      lrDiag[currLRDiag] = false;
      rlDiag[currRLDiag] = false;
    }
  }  
};

// Two test cases to run function on
console.log(totalNQueens(4)) // 2
console.log(totalNQueens(1)) // 1