// 2201. Count Artifacts That Can Be Extracted


// Solution: n x n grid

// 1. Initialize the n x n grid with 0's.
// 2. Mark each cell in dig as 1 in the grid.
// 3. Loop through each artifact, 
  // Loop through each cell of the artifact, 
    // if each cell in the grid is 1, increment the answer.

// Time Complexity: O(n^2 * m) 365ms
// Space Complexity: O(n^2) 109.7MB
var digArtifacts = function(n, artifacts, dig) {
  let grid = Array(n).fill(0).map(() => Array(n).fill(0));
  for (let [x, y] of dig) {
    grid[x][y] = 1;
  }
  
  let ans = 0;
  for (let [row1, col1, row2, col2] of artifacts) {
    let isExtracted = true;
    for (let i = row1; i <= row2; i++) {
      for (let j = col1; j <= col2; j++) {
        if (!grid[i][j]) {
          isExtracted = false;
          break;
        }
      }
    }
    if (isExtracted) ans++;
  }
  return ans;
};

// Two test cases
console.log(digArtifacts(2, [[0,0,0,0],[0,1,1,1]], [[0,0],[0,1]])) // 1
console.log(digArtifacts(2, [[0,0,0,0],[0,1,1,1]], [[0,0],[0,1],[1,1]])) // 2