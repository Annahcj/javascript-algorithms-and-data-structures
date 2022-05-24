// 427. Construct Quad Tree
// Given a n * n matrix grid of 0's and 1's only. We want to represent the grid with a Quad-Tree.
// Return the root of the Quad-Tree representing the grid.


// Solution: Recursive DFS

// dfs(row1, column1, row2, column2) -> these are the top left and bottom right corner coordinates.
// 1. Check whether current subgrid should be a leaf node (all the same values).
// 2. 
  // If it is a leaf node, return a new leaf node.
  // Otherwise, find the middle coordinates (rowMid and colMid), then split the subgrid into four quadrants.
    // These represent the top left, top right, bottom left, and bottom right quadrants.
    // Return a new node and pass in the four quadrants as children.

// Time Complexity: O(n^2 * log(n)) 136ms
// Space Complexity: O(n) 46.2MB
var construct = function(grid) {
  if (!grid.length) return null;
  return dfs(0, 0, grid.length - 1, grid.length - 1);
  
  function dfs(r1, c1, r2, c2) { // left top and right bottom corner coordinates
    let isLeaf = true, val = grid[r1][c1];
    for (let i = r1; i <= r2; i++) {
      for (let j = c1; j <= c2; j++) {
        if (grid[i][j] !== val) {
          isLeaf = false;
          break;
        }
      }
    }
    if (isLeaf) return new Node(val === 1, true, null, null, null, null);
    let rowMid = Math.floor((r1 + r2) / 2), colMid = Math.floor((c1 + c2) / 2);
    let topLeft = dfs(r1, c1, rowMid, colMid);
    let topRight = dfs(r1, colMid + 1, rowMid, c2);
    let bottomLeft = dfs(rowMid + 1, c1, r2, colMid);
    let bottomRight = dfs(rowMid + 1, colMid + 1, r2, c2);
    return new Node(true, false, topLeft, topRight, bottomLeft, bottomRight);
  }  
};