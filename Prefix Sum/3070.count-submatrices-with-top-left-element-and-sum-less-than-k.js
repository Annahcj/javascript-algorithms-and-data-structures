// 3070. Count Submatrices with Top-Left Element and Sum Less Than k
// You are given a 0-indexed integer matrix grid and an integer k.
// Return the number of submatrices that contain the top-left element of the grid, and have a sum less than or equal to k.


// Solution: 2D Prefix Sum

// 2D prefix sum on the grid, we only need to keep track of the previous and current row.
// The formula for each cell: 
  // cell value + top cell + left cell - top left cell.
  // We subtract the top left cell sum because it is counted twice in the top cell sum and left cell sum.

// Time Complexity: O(mn) 127ms
// Space Complexity: O(n) 69.7MB
var countSubmatrices = function(grid, k) {
  let m = grid.length, n = grid[0].length;
  let prev = Array(n).fill(0), count = 0;
  for (let i = 0; i < m; i++) {
    let curr = Array(n);
    for (let j = 0; j < n; j++) {
      let left = j === 0 ? 0 : curr[j - 1];
      let top = i === 0 ? 0 : prev[j];
      let topLeft = j === 0 ? 0 : prev[j - 1];
      curr[j] = grid[i][j] + left + top - topLeft;
      if (curr[j] <= k) count++;
    }
    prev = curr;
  } 
  return count;
};

// Two test cases
console.log(countSubmatrices([[7,6,3],[6,6,1]], 18)) // 4
console.log(countSubmatrices([[7,2,9],[1,5,0],[2,6,6]], 20)) // 6