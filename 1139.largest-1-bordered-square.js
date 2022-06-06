// 1139. Largest 1-Bordered Square      
// Given a 2D grid of 0s and 1s, return the number of elements in the largest square subgrid that has all 1s on its border, or 0 if such a subgrid doesn't exist in the grid.


// Solution: Dynamic Programming

// 1. Populate top and left: get the number of consecutive 1's to the left and on top of each cell.
// 2. Try each cell as the bottom right corner of a square,
  // Get the minimum of top and left for the cell
  // Loop through each possible width of the square (loop backwards so that we can terminate when we find a square)
    // Check whether we have a valid 1-bordered square:
      // 1. Check that the bottom left corner cell's top count is >= width
      // 2. Check that the top right corner cell's left count is >= width

// Time Complexity: O(n^3) 112ms
// Space Complexity: O(n^2) 45.2MB
var largest1BorderedSquare = function(grid) {
  let m = grid.length, n = grid[0].length;
  let top = Array(m).fill(0).map(() => Array(n).fill(0));
  let left = Array(m).fill(0).map(() => Array(n).fill(0));
  for (let i = 0; i < m; i++) {
    for (let j = 0; j < n; j++) {
      if (grid[i][j] === 1) {
        left[i][j] = j > 0 ? left[i][j - 1] + 1 : 1;
        top[i][j] = i > 0 ? top[i - 1][j] + 1 : 1;
      } 
    }
  }
  
  let ans = 0;
  for (let i = 0; i < m; i++) {
    for (let j = 0; j < n; j++) {
      let size = Math.min(top[i][j], left[i][j]);
      for (let k = size; k > 0; k--) {
        let bottomLeftTop = top[i][j - k + 1];
        let topRightLeft = left[i - k + 1][j];
        if (bottomLeftTop >= k && topRightLeft >= k) {
          ans = Math.max(ans, k * k);
          break;
        }
      }
    }
  }
  return ans;
};

// Two test cases to run function on
console.log(largest1BorderedSquare([[1,1,1],[1,0,1],[1,1,1]])) // 9
console.log(largest1BorderedSquare([[1,1,0,0]])) // 1