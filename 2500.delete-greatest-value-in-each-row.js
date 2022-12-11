// 2500. Delete Greatest Value in Each Row
// You are given an m x n matrix grid consisting of positive integers.
// Perform the following operation until grid becomes empty:
  // Delete the element with the greatest value from each row. If multiple such elements exist, delete any of them.
  // Add the maximum of deleted elements to the answer.
// Note that the number of columns decreases by one after each operation.
// Return the answer after performing the operations described above.


// Solution: Sort each Row

// 1. Sort the values in each row of the grid.
// 2. For each column (from last to first since values are sorted),
  // Remove the last value in each row.
  // Record the maximum value that we have removed.
  // Add the maximum value to our answer.

// Time Complexity: O(mn log(n)) 78ms
// Space Complexity: O(log(n)) (space for sorting) 44.3MB
var deleteGreatestValue = function(grid) {
  let m = grid.length, n = grid[0].length;
  for (let i = 0; i < m; i++) {
    grid[i].sort((a, b) => a - b);
  }
  
  let ans = 0;
  for (let j = 0; j < n; j++) {
    let max = 0;
    for (let i = 0; i < m; i++) {
      max = Math.max(max, grid[i][grid[i].length - 1]);
      grid[i].pop(); // remove the last value of row i
    }
    ans += max;
  }
  return ans;
};

// Two test cases
console.log(deleteGreatestValue([[1,2,4],[3,3,1]])) // 8
console.log(deleteGreatestValue([[10]])) // 10