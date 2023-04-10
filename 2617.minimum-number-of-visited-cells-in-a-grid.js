// 2617. Minimum Number of Visited Cells in a Grid
// You are given a 0-indexed m x n integer matrix grid. Your initial position is at the top-left cell (0, 0).
// Starting from the cell (i, j), you can move to one of the following cells:
  // Cells (i, k) with j < k <= grid[i][j] + j (rightward movement), or
  // Cells (k, j) with i < k <= grid[i][j] + i (downward movement).
// Return the minimum number of cells you need to visit to reach the bottom-right cell (m - 1, n - 1). If there is no valid path, return -1.


// Solution: DP w/ Monotonic Stacks & Binary Search

// Maintain monotonic decreasing stacks per row and column.
// Each stack of indices is in decreasing order of steps. 
// Pop off the indices from the back of the stack while the steps are greater than the dp[i][j], since there is no purpose in keeping larger indices with a larger number of steps.

// Go through the grid from bottom to top, right to left, and populate each dp[i][j].
// For each grid[i][j], 
  // Downward: Binary search through the stack for column j to find the first index where stack[index] <= grid[i][j] + i
  // Rightward: Binary search through the stack for row i to find the first index where stack[index] <= grid[i][j] + j

// Time Complexity: O(mn log(m + n)) 469ms
// Space Complexity: O(mn) 89.3MB
var minimumVisitedCells = function(grid) {
  let m = grid.length, n = grid[0].length;
  let dp = Array(m).fill(0).map(() => Array(n).fill(Infinity)), colStacks = Array(n).fill(0).map(() => []); // colStacks[j] = stack of row indexes for column j
  dp[m - 1][n - 1] = 1;
  colStacks[n - 1].push(m - 1); 
  
  for (let i = m - 1; i >= 0; i--) {
    let rowStack = i === m - 1 ? [n - 1] : []; // stack of column indexes for row i
    for (let j = n - 1; j >= 0; j--) {
      let colIndex = findIndex(rowStack, grid[i][j] + j);
      if (colIndex >= 0) dp[i][j] = Math.min(dp[i][j], 1 + dp[i][rowStack[colIndex]]);
      let colStack = colStacks[j], rowIndex = findIndex(colStack, grid[i][j] + i);
      if (rowIndex >= 0) dp[i][j] = Math.min(dp[i][j], 1 + dp[colStack[rowIndex]][j]);
      
      while (rowStack.length && dp[i][rowStack[rowStack.length - 1]] >= dp[i][j]) rowStack.pop();
      rowStack.push(j);
      while (colStack.length && dp[colStack[colStack.length - 1]][j] >= dp[i][j]) colStack.pop();
      colStack.push(i);
    }
  }
  return dp[0][0] === Infinity ? -1 : dp[0][0];
};

function findIndex(stack, maxIndex) {
  if (!stack.length) return -1;
  let low = 0, high = stack.length - 1;
  while (low < high) {
    let mid = Math.floor((low + high) / 2);
    if (stack[mid] <= maxIndex) high = mid;
    else low = mid + 1;
  }
  return stack[low] <= maxIndex ? low : -1;
}

// Three test cases
console.log(minimumVisitedCells([[3,4,2,1],[4,2,3,1],[2,1,0,0],[2,4,0,0]])) // 4
console.log(minimumVisitedCells([[3,4,2,1],[4,2,1,1],[2,1,1,0],[3,4,1,0]])) // 3
console.log(minimumVisitedCells([[2,1,0],[1,0,0]])) // -1