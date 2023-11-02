// 2194. Cells in a Range on an Excel Sheet
// A cell (r, c) of an excel sheet is represented as a string "<col><row>" where:
  // <col> denotes the column number c of the cell. It is represented by alphabetical letters.
    // For example, the 1st column is denoted by 'A', the 2nd by 'B', the 3rd by 'C', and so on.
  // <row> is the row number r of the cell. The rth row is represented by the integer r.
// You are given a string s in the format "<col1><row1>:<col2><row2>", where <col1> represents the column c1, <row1> represents the row r1, <col2> represents the column c2, and <row2> represents the row r2, such that r1 <= r2 and c1 <= c2.
// Return the list of cells (x, y) such that r1 <= x <= r2 and c1 <= y <= c2. The cells should be represented as strings in the format mentioned above and be sorted in non-decreasing order first by columns and then by rows.


// Solution: Two Loops

// Rows: s[0] to s[3]
// Columns: s[1] to s[4]

// Convert the uppercase letters to their character code - 65.
// Generate each uppercase letter between s[0] and s[3] using String.fromCharCode(i + 65).

// n = rows, m = columns
// Time Complexity: O(nm) 89ms
// Space Complexity: O(1) (not including output) 44MB
var cellsInRange = function(s) {
  let res = [];
  let startRow = s[0], endRow = s[3];
  let startCol = +s[1], endCol = +s[4];
  let startRowCharCode = startRow.charCodeAt() - 65, endRowCharCode = endRow.charCodeAt() - 65;
  for (let i = startRowCharCode; i <= endRowCharCode; i++) {
    let row = String.fromCharCode(i + 65);
    for (let j = startCol; j <= endCol; j++) {
      res.push(row + j);
    }
  }
  return res;
};

// Two test cases
console.log(cellsInRange("K1:L2")) // ["K1","K2","L1","L2"]
console.log(cellsInRange("A1:F1")) // ["A1","B1","C1","D1","E1","F1"]