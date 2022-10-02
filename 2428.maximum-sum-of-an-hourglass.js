// 2428. Maximum Sum of an Hourglass


// Solution: Brute Force

// Take each grid[i][j] as the top left cell of an hourglass.
// Record the maximum sum out of each hourglass.

// Time Complexity: O(mn) 108ms
// Space Complexity: O(1) 45.7MB
var maxSum = function(grid) {
  let m = grid.length, n = grid[0].length;
  let ans = 0;
  for (let i = 0; i < m - 2; i++) {
    for (let j = 0; j < n - 2; j++) {
      ans = Math.max(ans, getSum(i, j));
    }
  }
  return ans;
  
  function getSum(i, j) {
    let row1 = grid[i][j] + grid[i][j + 1] + grid[i][j + 2];
    let row2 = grid[i + 1][j + 1];
    let row3 = grid[i + 2][j] + grid[i + 2][j + 1] + grid[i + 2][j + 2];
    return row1 + row2 + row3;
  }
};

// Two test cases
console.log(maxSum([[6,2,1,3],[4,2,1,5],[9,2,8,7],[4,1,2,9]])) // 30
console.log(maxSum([[1,2,3],[4,5,6],[7,8,9]])) // 35