// 3122. Minimum Number of Operations to Satisfy Conditions
// You are given a 2D matrix grid of size m x n. In one operation, you can change the value of any cell to any non-negative number. You need to perform some operations such that each cell grid[i][j] is:
  // Equal to the cell below it, i.e. grid[i][j] == grid[i + 1][j] (if it exists).
  // Different from the cell to its right, i.e. grid[i][j] != grid[i][j + 1] (if it exists).
// Return the minimum number of operations needed.

 
// Solution 1: DP - Recursion w/ Memoization

// 1. Precompute the count of values in each column.
// 2. Use DP to calculate the minimum operations.
  // Memoize each dp(col, prevVal), where col = the current column and prevVal is the value from the previous column.
  // For each dp(col, prevVal), go through each possible value for the column and calculate the number of operations to turn all cells into this new value (m - colCount[col][j]).
  // Record and return the minimum operations out of all the choices.

// m = number of rows, n = number of columns, k = number of unique values in the grid
// Time Complexity: O(mn + k^2 * n) 179ms
// Space Complexity: O(kn) 77.8MB
var minimumOperations = function(grid) {
  let m = grid.length, n = grid[0].length;
  let colCount = Array(n).fill(0).map(() => Array(10).fill(0));
  for (let j = 0; j < n; j++) {
    for (let i = 0; i < m; i++) {
      colCount[j][grid[i][j]]++;
    }
  }
  let memo = Array(n).fill(0).map(() => Array(10).fill(-1));
  return dp(0, -1);
  
  function dp(col, prevVal) {
    if (col === n) return 0;
    if (prevVal > -1 && memo[col][prevVal] !== -1) return memo[col][prevVal];
    
    let ans = Infinity;
    for (let val = 0; val < 10; val++) {
      if (val === prevVal) continue;
      let operations = m - colCount[col][val];
      ans = Math.min(ans, operations + dp(col + 1, val));
    }
    return memo[col][prevVal] = ans;
  }
};

// Solution 2: Bottom-up DP & Space Optimized

// Observe that we only need the previous column's state.
// Keep track of the results from the previous column and update the current column's results based on the previous column.

// m = number of rows, n = number of columns, k = number of unique values in the grid
// Time Complexity: O(mn + k^2 * n) 159ms
// Space Complexity: O(k) 76.3MB
var minimumOperations = function(grid) {
  let m = grid.length, n = grid[0].length;
  let colCount = Array(n).fill(0).map(() => Array(10).fill(0));
  for (let j = 0; j < n; j++) {
    for (let i = 0; i < m; i++) {
      colCount[j][grid[i][j]]++;
    }
  }
  let prev = Array(10).fill(0);
  for (let j = 0; j < n; j++) {
    let curr = Array(10).fill(Infinity);
    for (let newVal = 0; newVal < 10; newVal++) {
      for (let oldVal = 0; oldVal < 10; oldVal++) {
        if (newVal === oldVal) continue;
        curr[newVal] = Math.min(curr[newVal], prev[oldVal] + m - colCount[j][newVal]);
      }
    }
    prev = curr;
  }
  return Math.min(...prev);
};

// Three test cases
console.log(minimumOperations([[1,0,2],[1,0,2]])) // 0
console.log(minimumOperations([[1,1,1],[0,0,0]])) // 3
console.log(minimumOperations([[1],[2],[3]])) // 2