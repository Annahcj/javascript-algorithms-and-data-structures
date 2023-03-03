// 2087. Minimum Cost Homecoming of a Robot in a Grid
// There is an m x n grid, where (0, 0) is the top-left cell and (m - 1, n - 1) is the bottom-right cell. You are given an integer array startPos where startPos = [startrow, startcol] indicates that initially, a robot is at the cell (startrow, startcol). You are also given an integer array homePos where homePos = [homerow, homecol] indicates that its home is at the cell (homerow, homecol).
// The robot needs to go to its home. It can move one cell in four directions: left, right, up, or down, and it can not move outside the boundary. Every move incurs some cost. You are further given two 0-indexed integer arrays: rowCosts of length m and colCosts of length n.
  // If the robot moves up or down into a cell whose row is r, then this move costs rowCosts[r].
  // If the robot moves left or right into a cell whose column is c, then this move costs colCosts[c].
// Return the minimum total cost for this robot to return home.


// Solution: Greedy

// For the robot to get home, crossing the rows and columns in between are inevitable, so we may as well only cross each row/column once.
// Count the total cost crossing each row/column in between the house and the robot.

// m = number of rows in between start and end rows, n = number of columns in between start and end columns
// Time Complexity: O(m + n) 90ms
// Space Complexity: O(1) 54.4MB
var minCost = function(startPos, homePos, rowCosts, colCosts) {
  let [startRow, startCol] = startPos;
  let rowCost = 0, colCost = 0;
  while (startRow < homePos[0]) {
    rowCost += rowCosts[++startRow];
  }
  while (startRow > homePos[0]) {
    rowCost += rowCosts[--startRow];
  }
  while (startCol < homePos[1]) {
    colCost += colCosts[++startCol];
  }
  while (startCol > homePos[1]) {
    colCost += colCosts[--startCol];
  }
  return rowCost + colCost;
};

// Two test cases
console.log(minCost([1, 0], [2, 3], [5, 4, 3], [8, 2, 6, 7])) // 18
console.log(minCost([0, 0], [0, 0], [5], [26])) // 0