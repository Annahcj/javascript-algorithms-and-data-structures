// 2128. Remove All Ones With Row and Column Flips
// You are given an m x n binary matrix grid.
// In one operation, you can choose any row or column and flip each value in that row or column (i.e., changing all 0's to 1's, and all 1's to 0's).
// Return true if it is possible to remove all 1's from grid using any number of operations or false otherwise.


// Solution: Each Row must be Equal or Inverse

// Each row must be the exact same or the inverse row.
// e.g: [0,0,1,1]
// Each row must be [0,0,1,1] or [1,1,0,0]

// If rows are inverse, that means they can all be made equal. Flipping this row [0,0,1,1] = [1,1,0,0]
// And when all rows are equal, we can flip the columns with 1's to remove all 1's. 

// Time Complexity: O(mn) 60ms
// Space Complexity: O(1) 45.7MB 
var removeOnes = function(grid) {
  let m = grid.length, n = grid[0].length;
  for (let i = 1; i < m; i++) {
    let inverse = grid[i][0] !== grid[0][0];
    for (let j = 0; j < n; j++) {
      if (inverse) {
        if (grid[i][j] === grid[0][j]) return false;
      } else {
        if (grid[i][j] !== grid[0][j]) return false;
      }
    }
  }
  return true;
};

// Three test cases to run function on
console.log(removeOnes([[0,1,0],[1,0,1],[0,1,0]])) // true
console.log(removeOnes([[1,1,0],[0,0,0],[0,0,0]])) // false
console.log(removeOnes([[0]])) // true