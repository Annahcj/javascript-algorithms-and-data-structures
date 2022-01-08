// 1463. Cherry Pickup II
// You are given a rows x cols matrix grid representing a field of cherries where grid[i][j] represents the number of cherries that you can collect from the (i, j) cell.
// You have two robots that can collect cherries for you:
  // Robot #1 is located at the top-left corner (0, 0), and
  // Robot #2 is located at the top-right corner (0, cols - 1).
// Return the maximum number of cherries collection using both robots by following the rules below:
  // From a cell (i, j), robots can move to cell (i + 1, j - 1), (i + 1, j), or (i + 1, j + 1).
  // When any robot passes through a cell, It picks up all cherries, and the cell becomes an empty cell.
  // When both robots stay in the same cell, only one takes the cherries.
  // Both robots cannot move outside of the grid at any moment.
  // Both robots should reach the bottom row in grid.


// Solution: Recursion w/ Memoization

// In order to calculate the results correctly, we must simulate both robots moving at the same time.
// When the two robots are on the same spot, we only add the cherries once.

// Each robot has 3 different locations they can move to: Left down, straight down, right down.
// In total, that means that there are 9 different combinations of how the two robots can move.

// Time Complexity: O(mn^2) 925ms
// Space Complexity: O(mn^2) 67.5MB
var cherryPickup = function(grid) {
  // they will be on the same row anyway
  // so we just need to keep track of row, col1, col2
  let m = grid.length, n = grid[0].length;
  let memo = {};
  return recurse(0, 0, n - 1);

  function recurse(row, col1, col2) {
    if (row >= m || col1 < 0 || col1 >= n|| col2 < 0 || col2 >= n) return 0;
    if (memo[`${row},${col1},${col2}`] !== undefined) return memo[`${row},${col1},${col2}`];

    let ans = 0;
    ans += grid[row][col1];
    if (col1 !== col2) ans += grid[row][col2];

    let max = 0;
    for (var newCol1 = col1 - 1; newCol1 <= col1 + 1; newCol1++) {
      for (var newCol2 = col2 - 1; newCol2 <= col2 + 1; newCol2++) {
        max = Math.max(max, recurse(row + 1, newCol1, newCol2));
      }
    }
    ans += max;
    memo[`${row},${col1},${col2}`] = ans;
    return ans;
  }
};

// Two test cases to run function on
console.log(cherryPickup([[3,1,1],[2,5,1],[1,5,5],[2,1,1]])) // 24
console.log(cherryPickup([[1,0,0,0,0,0,1],[2,0,0,0,0,3,0],[2,0,9,0,0,0,0],[0,3,0,5,4,0,0],[1,0,2,3,0,0,6]])) // 28