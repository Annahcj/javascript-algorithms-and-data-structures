 // 741. Cherry Pickup
// You are given an n x n grid representing a field of cherries, each cell is one of three possible integers.
  // 0 means the cell is empty, so you can pass through,
  // 1 means the cell contains a cherry that you can pick up and pass through, or
  // -1 means the cell contains a thorn that blocks your way.
// Return the maximum number of cherries you can collect by following the rules below:
  // Starting at the position (0, 0) and reaching (n - 1, n - 1) by moving right or down through valid path cells (cells with value 0 or 1).
  // After reaching (n - 1, n - 1), returning to (0, 0) by moving left or up through valid path cells.
  // When passing through a path cell containing a cherry, you pick it up, and the cell becomes an empty cell 0.
  // If there is no valid path between (0, 0) and (n - 1, n - 1), then no cherries can be collected.


// Solution: Recursion w/ Memoization

// Going from (0,0) to (n-1,n-1) is equivalent to going from (n-1,n-1) to (0,0).
// So we can make both trips at the same time from (0,0) to (n-1,n-1).
// If both people are on the same cell, only count it once.
// Memoize the maximum amount of cherries picked for both people at their locations.

// Time Complexity: O(n^4) 456ms
// Space Complexity: O(n^4) 61.8MB
var cherryPickup = function(grid) {
  let n = grid.length, memo = {};
  return Math.max(recurse(0, 0, 0, 0), 0);

  function recurse(row1, col1, row2, col2) {
    if (row1 >= n || col1 >= n || row2 >= n || col2 >= n || grid[row1][col1] === -1 || grid[row2][col2] === -1) return -Infinity;
    if (row1 === n - 1 && col1 === n - 1) return grid[row1][col1];
    if (row2 === n - 1 && col2 === n - 1) return grid[row2][col2];

    if (memo[`${row1},${col1},${row2},${col2}`] !== undefined) return memo[`${row1},${col1},${row2},${col2}`];

    let ans = 0;
    if (row1 === row2 && col1 === col2) ans = grid[row1][col1];
    else ans = grid[row1][col1] + grid[row2][col2];

    ans += Math.max(recurse(row1 + 1, col1, row2 + 1, col2), recurse(row1 + 1, col1, row2, col2 + 1), recurse(row1, col1 + 1, row2 + 1, col2), recurse(row1, col1 + 1, row2, col2 + 1));
    memo[`${row1},${col1},${row2},${col2}`] = ans;
    return ans;
  }
};

// Two test cases to run function on
console.log(cherryPickup([[0,1,-1],[1,0,-1],[1,1,1]])) // 5
console.log(cherryPickup([[1,1,-1],[1,-1,1],[-1,1,1]])) // 0