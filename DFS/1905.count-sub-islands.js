// 1905. Count Sub Islands
// You are given two m x n binary matrices grid1 and grid2 containing only 0's (representing water) and 1's (representing land). An island is a group of 1's connected 4-directionally (horizontal or vertical). Any cells outside of the grid are considered water cells.
// An island in grid2 is considered a sub-island if there is an island in grid1 that contains all the cells that make up this island in grid2.
// Return the number of islands in grid2 that are considered sub-islands.


// Solution: DFS

// Starting from each land cell in grid2, traverse in all four directions to find connected land.
// Since an island in grid2 must be fully land in grid1, we need to know the number of land cells in grid1 in the grid2 island.
// If the count of land cells in grid1 is the same as the island size in grid2, then it's a subisland.

// Note that we can't "split" fully connected islands in grid2. Meaning if grid1 is partially land, grid2's island will not become two islands. An island in grid2 is one island, that is valid if all cells are land in grid1.

// m = number of rows, n = number of columns
// Time Complexity: O(mn) 147ms
// Space Complexity: O(mn) 78.4MB
function countSubIslands(grid1, grid2) {
  const directions = [[-1, 0], [0, 1], [1, 0], [0, -1]];
  let m = grid1.length, n = grid1[0].length;
  let subIslands = 0;
  for (let i = 0; i < m; i++) {
    for (let j = 0; j < n; j++) {
      if (grid2[i][j] === 1) {
        let [landInGrid1, landInGrid2] = dfs(i, j);
        if (landInGrid1 === landInGrid2) subIslands++;
      }
    }
  }
  return subIslands;
  
  function dfs(row, col) {
    let landInGrid1 = grid1[row][col];
    let landInGrid2 = grid2[row][col];
    grid2[row][col] = 0;
    
    for (let [x, y] of directions) {
      let newRow = row + x, newCol = col + y;
      if (newRow < 0 || newRow >= m || newCol < 0 || newCol >= n) continue;
      if (grid2[newRow][newCol] === 0) continue;
      let [neiLandInGrid1, neiLandInGrid2] = dfs(newRow, newCol);
      landInGrid1 += neiLandInGrid1;
      landInGrid2 += neiLandInGrid2;
    }
    return [landInGrid1, landInGrid2];
  }  
};

// Two test cases
console.log(countSubIslands([[1,1,1,0,0],[0,1,1,1,1],[0,0,0,0,0],[1,0,0,0,0],[1,1,0,1,1]], [[1,1,1,0,0],[0,0,1,1,1],[0,1,0,0,0],[1,0,1,1,0],[0,1,0,1,0]])) // 3
console.log(countSubIslands([[1,0,1,0,1],[1,1,1,1,1],[0,0,0,0,0],[1,1,1,1,1],[1,0,1,0,1]], [[0,0,0,0,0],[1,1,1,1,1],[0,1,0,1,0],[0,1,0,1,0],[1,0,0,0,1]])) // 2