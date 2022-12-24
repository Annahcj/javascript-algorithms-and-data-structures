// 2132. Stamping the Grid
// You are given an m x n binary matrix grid where each cell is either 0 (empty) or 1 (occupied).
// You are then given stamps of size stampHeight x stampWidth. We want to fit the stamps such that they follow the given restrictions and requirements:
  // 1. Cover all the empty cells.
  // 2. Do not cover any of the occupied cells.
  // 3. We can put as many stamps as we want.
  // 4. Stamps can overlap with each other.
  // 5. Stamps are not allowed to be rotated.
  // 6. Stamps must stay completely inside the grid.
// Return true if it is possible to fit the stamps while following the given restrictions and requirements. Otherwise, return false.


// Solution: 2D Prefix Sum

// Calculate the 2D prefix sum of the grid.
  // pSum[i][j] = sum of rectangle with top left corner (0, 0) and bottom right corner (i, j).
  // formula to populate pSum: pSum[i][j] = grid[i][j] + pSum[i][j - 1] + pSum[i - 1][j] - pSum[i - 1][j - 1].
  // formula to get sum of a rectangle with top left corner (r1, c1) and bottom right corner (r2, c2): pSum[r2][c2] - pSum[r2][c1 - 1] - pSum[r1 - 1][c2] + pSum[r1 - 1][c1 - 1].

// A stamp can be placed with bottom right corner (i, j) if the sum of the rectangle if equal to 0 (completely empty).
  // stamp[i][j] = 1 if there is a stamp with top left corner (i, j).
  // stampSum[i][j] = sum of stamps with top left corner within (0, 0) and (i, j).

// Go through each (i, j) as the bottom right corner of a stamp.
// If there is a stamp with top left corner within (0, 0) and (i, j), then cell (i, j) is covered by a stamp.

// Summary:
  // 1. Get the prefix sum of the grid so that we can check if an obstacle exists within a rectangle in O(1) time.
  // 2. Record the top left corner indexes of each stamp in a 2D array (1 = stamp exists, 0 = stamp doesn't exist).
  // 3. Get the prefix sum of the stamp 2D array so that we can check if a stamp exists within a rectangle in O(1) time.
  // 4. Check that each non-obstacle cell is covered by at least one stamp.

// Time Complexity: O(mn) 548ms
// Space Complexity: O(mn) 114.6MB
var possibleToStamp = function(grid, stampHeight, stampWidth) {
  let m = grid.length, n = grid[0].length;
  let pSum = getPrefixSum(grid);
  let stamp = Array(m + 1).fill(0).map(() => Array(n + 1).fill(0));
  for (let i = stampHeight - 1; i < m; i++) {
    for (let j = stampWidth - 1; j < n; j++) {
      let sum = getSum(pSum, i - stampHeight + 1, j - stampWidth + 1, i, j);
      if (sum === 0) stamp[i - stampHeight + 1][j - stampWidth + 1] = 1; // no obstacles 
    }
  }
  
  let stampSum = getPrefixSum(stamp);
  for (let i = 0; i < m; i++) {
    for (let j = 0; j < n; j++) {
      if (grid[i][j] === 1) continue; // skip obstacles
      let sumOfStamps = getSum(stampSum, Math.max(0, i - stampHeight + 1), Math.max(0, j - stampWidth + 1), i, j);
      if (sumOfStamps === 0) return false; // found a cell not covered by a stamp
    }
  }
  return true;
};

function getPrefixSum(grid) {
  let m = grid.length, n = grid[0].length;
  let pSum = Array(m + 1).fill(0).map(() => Array(n + 1).fill(0));
  for (let i = 0; i < m; i++) {
    for (let j = 0; j < n; j++) {
      pSum[i + 1][j + 1] = grid[i][j] + pSum[i + 1][j] + pSum[i][j + 1] - pSum[i][j];
    }
  }
  return pSum;
}

function getSum(pSum, r1, c1, r2, c2) { // top left (r1, c1), bottom right (r2, c2)
  return pSum[r2 + 1][c2 + 1] - pSum[r2 + 1][c1] - pSum[r1][c2 + 1] + pSum[r1][c1];
}

// Two test cases
console.log(possibleToStamp([[1,0,0,0],[1,0,0,0],[1,0,0,0],[1,0,0,0],[1,0,0,0]], 4, 3)) // true
console.log(possibleToStamp([[1,0,0,0],[0,1,0,0],[0,0,1,0],[0,0,0,1]], 2, 2)) // false