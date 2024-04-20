// 1992. Find All Groups of Farmland
// You are given a 0-indexed m x n binary matrix land where a 0 represents a hectare of forested land and a 1 represents a hectare of farmland.
// To keep the land organized, there are designated rectangular areas of hectares that consist entirely of farmland. These rectangular areas are called groups. No two groups are adjacent, meaning farmland in one group is not four-directionally adjacent to another farmland in a different group.
// land can be represented by a coordinate system where the top left corner of land is (0, 0) and the bottom right corner of land is (m-1, n-1). Find the coordinates of the top left and bottom right corner of each group of farmland. A group of farmland with a top left corner at (r1, c1) and a bottom right corner at (r2, c2) is represented by the 4-length array [r1, c1, r2, c2].
// Return a 2D array containing the 4-length arrays described above for each group of farmland in land. If there are no groups of farmland, return an empty array. You may return the answer in any order.


// Solution: Iterative

// When we come across a cell of farmland,
  // Go through each cell in the group of farmland.
  // Set the cell value to 0 to mark farmland as visited.
  // Record the maximum row and column in the group.

// Time Complexity: O(mn) 204ms
// Space Complexity: O(1) (excluding output) 75.2MB
var findFarmland = function(land) {
  let m = land.length, n = land[0].length;
  let groups = [];
  for (let i = 0; i < m; i++) {
    for (let j = 0; j < n; j++) {
      if (land[i][j] === 1) {
        let [bottomRightRow, bottomRightCol] = traverseGroup(i, j);
        groups.push([i, j, bottomRightRow, bottomRightCol]);
      }
    }
  }
  return groups;
  
  function traverseGroup(row, col) {
    let bottomRightRow = row, bottomRightCol = col;
    for (let i = row; i < m && land[i][col] === 1; i++) {
      for (let j = col; j < n && land[i][j] === 1; j++) {
        land[i][j] = 0;
        bottomRightRow = i;
        bottomRightCol = j;
      }
    }
    return [bottomRightRow, bottomRightCol];
  }  
};

// Three test cases
console.log(findFarmland([[1,0,0],[0,1,1],[0,1,1]])) // [[0,0,0,0],[1,1,2,2]]
console.log(findFarmland([[1,1],[1,1]])) // [[0,0,1,1]]
console.log(findFarmland([[0]])) // []