// 417. Pacific Atlantic Water Flow
// There is an m x n rectangular island that borders both the Pacific Ocean and Atlantic Ocean. The Pacific Ocean touches the island's left and top edges, and the Atlantic Ocean touches the island's right and bottom edges.
// The island is partitioned into a grid of square cells. You are given an m x n integer matrix heights where heights[r][c] represents the height above sea level of the cell at coordinate (r, c).
// The island receives a lot of rain, and the rain water can flow to neighboring cells directly north, south, east, and west if the neighboring cell's height is less than or equal to the current cell's height. Water can flow from any cell adjacent to an ocean into the ocean.
// Return a 2D list of grid coordinates result where result[i] = [ri, ci] denotes that rain water can flow from cell (ri, ci) to both the Pacific and Atlantic oceans.


// Solution: DFS from Ocean to Land

// keep two hashmaps -> pacific & atlantic
// start from pacific -> dfs first row & first column
// then atlantic -> last column, last row

// dfs (accepts row, col, and two hashmaps)
  // if [row, col] is not already visited, we mark [row, col] as visited,
    // if second set/map already contains [row, col], push [row, col] into res (that means it is reachable from both pacific & atlantic)
    // try four directions -> if coordinates are within bounds, not visited yet, and height is bigger or equal, call dfs for new coordinates.

// Time Complexity: O(nm) 216ms
// Space Complexity: O(nm) 48.3MB
var pacificAtlantic = function(heights) {
  let pacific = {}, atlantic = {};
  let res = [];
  const directions = [[-1, 0], [0, 1], [1, 0], [0, -1]];
  let n = heights.length, m = heights[0].length;
  // n = rows, m = columns
  for (var j = 0; j < m; j++) dfs(0, j, pacific, atlantic);
  for (var i = 0; i < n; i++) dfs(i, 0, pacific, atlantic);

  for (i = 0; i < n; i++) dfs(i, m - 1, atlantic, pacific);
  for (j = 0; j < m; j++) dfs(n - 1, j, atlantic, pacific);

  return res;

  function dfs(row, col, set1, set2) {
    if (!set1[[row, col]]) {
      set1[[row, col]] = true;
      if (set2[[row, col]]) res.push([row, col]);
      for (var [x, y] of directions) {
      let newX = row + x, newY = col + y;
        if (newX > -1 && newX < n && newY > -1 && newY < m) {
          if (!set1[[newX, newY]] && heights[newX][newY] >= heights[row][col]) {
            dfs(newX, newY, set1, set2);
          }
        }
      }
    }
  }
};

// Two test cases to run function on
console.log(pacificAtlantic([[1,2,2,3,5],[3,2,3,4,4],[2,4,5,3,1],[6,7,1,4,5],[5,1,1,2,4]])) // [[0,4],[1,3],[1,4],[2,2],[3,0],[3,1],[4,0]]
console.log(pacificAtlantic([[2,1],[1,2]])) // [[0,0],[0,1],[1,0],[1,1]]