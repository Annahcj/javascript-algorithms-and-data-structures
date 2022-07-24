// 2352. Equal Row and Column Pairs
// Given a 0-indexed n x n integer matrix grid, return the number of pairs (Ri, Cj) such that row Ri and column Cj are equal.
// A row and column pair is considered equal if they contain the same elements in the same order (i.e. an equal array).


// Solution: Brute Force

// Go through each pair of rows and columns and check whether they contain the same elements.

// Time Complexity: O(n^3) 169ms
// Space Complexity: O(1) 46.6MB
var equalPairs = function(grid) {
  let n = grid.length, ans = 0;
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < n; j++) {
      let equal = true;
      for (let k = 0; k < n; k++) {
        if (grid[i][k] !== grid[k][j]) {
          equal = false;
          break;
        }
      }
      if (equal) ans++;
    }
  }  
  return ans;
};

// Two test cases to run function on
console.log(equalPairs([[3,2,1],[1,7,6],[2,7,7]])) // 1
console.log(equalPairs([[3,1,2,2],[1,4,4,5],[2,4,2,2],[2,4,2,2]])) // 3