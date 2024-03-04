// 3071. Minimum Operations to Write the Letter Y on a Grid
// You are given a 0-indexed n x n grid where n is odd, and grid[r][c] is 0, 1, or 2.
// We say that a cell belongs to the Letter Y if it belongs to one of the following:
  // The diagonal starting at the top-left cell and ending at the center cell of the grid.
  // The diagonal starting at the top-right cell and ending at the center cell of the grid.
  // The vertical line starting at the center cell and ending at the bottom border of the grid.
// The Letter Y is written on the grid if and only if:
  // All values at cells belonging to the Y are equal.
  // All values at cells not belonging to the Y are equal.
  // The values at cells belonging to the Y are different from the values at cells not belonging to the Y.
// Return the minimum number of operations needed to write the letter Y on the grid given that in one operation you can change the value at any cell to 0, 1, or 2.


// Solution: Counting & Enumeration

// 1. Count the occurances of each value in the grid, inside the Y and outside the Y.
// 2. Enumerate through all combinations of the values inside the Y and outside the Y.
  // For a combination of values (i, j),
  // calculate the number of operations to change all values inside the Y to i, and all values outside the Y to j.
  // Record and return the minimum operations out of all combinations.

// How to check if (row, col) is inside the Y:
  // Separate the checks into three segments, the left part (\), the right part (/), and the middle part (|).
  // The left part (\): row <= floor(n / 2) and row === col
  // The right part (/): row <= floor(n / 2) and row + col === n - 1
  // The middle part (|): row >= floor(n / 2) and col === floor(n / 2)

// Time Complexity: O(n^2) 81ms
// Space Complexity: O(1) 53.5MB
var minimumOperationsToWriteY = function(grid) {
  let countY = Array(3).fill(0);
  let countOutside = Array(3).fill(0);
  let n = grid.length;
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < n; j++) {
      if (isPartOfY(i, j, n)) {
        countY[grid[i][j]]++;
      } else {
        countOutside[grid[i][j]]++;
      }
    }
  }
  let ans = Infinity;
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      if (i === j) continue;
      let costY = countY[0] + countY[1] + countY[2] - countY[i];
      let costOutsideY = countOutside[0] + countOutside[1] + countOutside[2] - countOutside[j];
      ans = Math.min(ans, costY + costOutsideY);
    }
  }
  return ans;
};

function isPartOfY(row, col, n) {
  let isLeftPart = row <= Math.floor(n / 2) && row === col;
  let isRightPart = row <= Math.floor(n / 2) && row + col === n - 1;
  let isMiddlePart = row >= Math.floor(n / 2) && col === Math.floor(n / 2);
  return isLeftPart || isRightPart || isMiddlePart;
}

// Two test cases
console.log(minimumOperationsToWriteY([[1,2,2],[1,1,0],[0,1,0]])) // 3
console.log(minimumOperationsToWriteY([[0,1,0,1,0],[2,1,0,1,2],[2,2,2,0,1],[2,2,2,2,2],[2,1,2,2,2]])) // 12