// 1428. Leftmost Column with at Least a One
// A row-sorted binary matrix means that all elements are 0 or 1 and each row of the matrix is sorted in non-decreasing order.
// Given a row-sorted binary matrix binaryMatrix, return the index (0-indexed) of the leftmost column with a 1 in it. If such an index does not exist, return -1.
// You can't access the Binary Matrix directly. You may only access the matrix using a BinaryMatrix interface:
  // BinaryMatrix.get(row, col) returns the element of the matrix at index (row, col) (0-indexed).
  // BinaryMatrix.dimensions() returns the dimensions of the matrix as a list of 2 elements [rows, cols], which means the matrix is rows x cols.
// Submissions making more than 1000 calls to BinaryMatrix.get will be judged Wrong Answer. Also, any solutions that attempt to circumvent the judge will result in disqualification.
// For custom testing purposes, the input will be the entire binary matrix mat. You will not have access to the binary matrix directly.


// Solution: Binary Search on each Row

// Since each row is sorted, we can use binary search to get the position of the leftmost 1 in a row.
// Keep track of the minimum column from each row.

// m = rows, n = columns
// Time Complexity: O(n log(m)) 88ms
// Space Complexity: O(1) 44.6MB
var leftMostColumnWithOne = function(binaryMatrix) {
  let [rows, cols] = binaryMatrix.dimensions();
  let minCol = Infinity;
  for (let i = 0; i < rows; i++) {
    let col = getCol(i);
    if (col !== -1) minCol = Math.min(minCol, col);
  }
  return minCol === Infinity ? -1 : minCol;
  
  function getCol(row) { // returns the leftmost column with a 1
    let low = 0, high = cols;
    while (low < high) {
      let mid = Math.floor((low + high) / 2);
      if (binaryMatrix.get(row, mid)) high = mid;
      else low = mid + 1;
    }
    if (low === cols) return -1;
    return low;
  }
};