// 2267. Check if There Is a Valid Parentheses String Path
// A parentheses string is a non-empty string consisting only of '(' and ')'. It is valid if any of the following conditions is true:
  // It is ().
  // It can be written as AB (A concatenated with B), where A and B are valid parentheses strings.
  // It can be written as (A), where A is a valid parentheses string.
// You are given an m x n matrix of parentheses grid. A valid parentheses string path in the grid is a path satisfying all of the following conditions:
  // The path starts from the upper left cell (0, 0).
  // The path ends at the bottom-right cell (m - 1, n - 1).
  // The path only ever moves down or right.
  // The resulting parentheses string formed by the path is valid.
// Return true if there exists a valid parentheses string path in the grid. Otherwise, return false.


// Solution: DP - Recursion w/ Memoization

// Note: The length of a valid path will always be -> m + n.
  // This is because the path only ever moves down or right.
// Memoize the results in a 3D array with the sizes [m][n][201] = [row][col][balance]
  // 201 is the maximum balance since 1 <= m, n <= 100

// For a path to be valid, the balance must be 0 when it gets to cell [m - 1][n - 1]
// For the balance, when cell is "(" +1, when cell is ")" -1

// Edge/base cases:
  // 1. Out of bounds (row === m || col === n), return false.
  // 2. Reached the target, return true if the balance is 0, otherwise return false.
  // 3. Balance is negative, meaning there are more ")" than "(" and indicating invalid paretheses. Return false.
  // 4. Already been in this situation before, return memoized result.
// Return true if is either going down or right returns true.

// Time Complexity: O(mn * (m + n)) 974ms
// Space Complexity: O(mn * (m + n)) 145.1MB
var hasValidPath = function(grid) {
  let m = grid.length, n = grid[0].length;
  let memo = Array(m).fill(0).map(() => Array(n).fill(0).map(() => Array(201).fill(-1)));
  return dfs(0, 0, 0);

  function dfs(row, col, bal) {
    // ( -> +1
    // ) -> -1
    if (row === m || col === n) return false; // out of bounds
    let newBalance = bal + (grid[row][col] === '(' ? 1 : -1);
    if (row === m - 1 && col === n - 1) return newBalance === 0;
    if (newBalance < 0) return false;
    if (memo[row][col][newBalance] !== -1) return memo[row][col][newBalance];
    
    return memo[row][col][newBalance] = dfs(row + 1, col, newBalance) || dfs(row, col + 1, newBalance);
  }
};

// Two test cases to run function on
console.log(hasValidPath([["(","(","("],[")","(",")"],["(","(",")"],["(","(",")"]])) // true
console.log(hasValidPath([[")",")"],["(","("]])) // false