// 2088. Count Fertile Pyramids in a Land
// A farmer has a rectangular grid of land with m rows and n columns that can be divided into unit cells. Each cell is either fertile (represented by a 1) or barren (represented by a 0). All cells outside the grid are considered barren.
// A pyramidal plot of land can be defined as a set of cells with the following criteria:
  // 1. The number of cells in the set has to be greater than 1 and all cells must be fertile.
  // 2. The apex of a pyramid is the topmost cell of the pyramid. The height of a pyramid is the number of rows it covers. Let (r, c) be the apex of the pyramid, and its height be h. Then, the plot comprises of cells (i, j) where r <= i <= r + h - 1 and c - (i - r) <= j <= c + (i - r).
// An inverse pyramidal plot of land can be defined as a set of cells with similar criteria:
  // 1. The number of cells in the set has to be greater than 1 and all cells must be fertile.
  // 2. The apex of an inverse pyramid is the bottommost cell of the inverse pyramid. The height of an inverse pyramid is the number of rows it covers. Let (r, c) be the apex of the pyramid, and its height be h. Then, the plot comprises of cells (i, j) where r - h + 1 <= i <= r and c - (r - i) <= j <= c + (r - i).
// Given a 0-indexed m x n binary matrix grid representing the farmland, return the total number of pyramidal and inverse pyramidal plots that can be found in grid.


// Solution: Bottom-up Dynamic Programming

// For each grid[i][j], count how many pyramids there can be with grid[i][j] as the apex.
  // Take (the minimum of dp[i + 1][j - 1] and dp[i + 1][j + 1]) + 1, 
  // given that grid[i][j] and grid[i + 1][j] are both 1.

// The cells must be processed from top to bottom so that we can use the previously calculated results.
// For the inverse pyramids, reverse each row and the grid and perform the same count.

// Time Complexity: O(mn) 147ms
// Space Complexity: O(mn) 48.7MB
var countPyramids = function(grid) {
  return count(grid) + count(grid.map(row => row.reverse()).reverse());
};

function count(grid) {
  let m = grid.length, n = grid[0].length;
  let dp = grid.map(row => [...row]), ans = 0;
  
  for (let i = m - 2; i >= 0; i--) {
    for (let j = 1; j < n - 1; j++) {
      if (grid[i][j] === 0 || grid[i + 1][j] === 0) continue;
      dp[i][j] = Math.min(dp[i + 1][j - 1], dp[i + 1][j + 1]) + 1;
      ans += dp[i][j] - 1;
    }
  }
  return ans;
}

// Three test cases
console.log(countPyramids([[0,1,1,0],[1,1,1,1]])) // 2
console.log(countPyramids([[1,1,1],[1,1,1]])) // 2
console.log(countPyramids([[1,1,1,1,0],[1,1,1,1,1],[1,1,1,1,1],[0,1,0,0,1]])) // 13