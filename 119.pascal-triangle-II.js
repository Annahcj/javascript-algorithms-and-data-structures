// 119. Pascal's Triangle II
// Given an integer rowIndex, return the rowIndexth (0-indexed) row of the Pascal's triangle.
// In Pascal's triangle, each number is the sum of the two numbers directly above it.


// Solution: DP

// We only need to keep track of the previous row to calculate the current row.
// To get the next row, sum the adjacent numbers together and add 1 at the front.

// n = rowIndex
// Time Complexity: O(n^2) 59ms
// Space Complexity: O(n) 42.4MB
var getRow = function(rowIndex) {
  if (rowIndex === 0) return [1];
  
  let row = [1, 1];
  for (let i = 2; i <= rowIndex; i++) {
    for (let j = 0; j < row.length - 1; j++) {
      row[j] += row[j + 1];
    }
    row = [1, ...row];
  }
  return row;
};

// Three test cases
console.log(getRow(3)) // [1,3,3,1]
console.log(getRow(0)) // [1]
console.log(getRow(1)) // [1,1]