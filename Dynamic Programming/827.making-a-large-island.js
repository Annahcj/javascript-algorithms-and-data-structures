// 827. Making A Large Island
// You are given an n x n binary matrix grid. You are allowed to change at most one 0 to be 1.
// Return the size of the largest island in grid after applying this operation.
// An island is a 4-directionally connected group of 1s.


// Solution: Paint Each Islands Different Colors

// Logic:
// Loop through each cell in grid
  // If the cell is 1, call a helper function paint, which paints the island connected to the cell a unique color (a number bigger than 2).
  // In the paint function, each time an island cell is found, increment island size count for island of the unique color.
// Loop through grid again, which will now be fully painted.
  // If cell is 0, check the four neighboring cells (up, down, left, right), if the numbers at the cells are bigger than 2, add the size of the island to the total.
  // Keep a maxArea, which we will update if necessary.

// Algorithm:
// m = grid length, n = grid width.
// set color to 2 (we will increment for each island we encounter)
// set islandsSize to an empty object, we will store the size of each island (key is color, val is island size)
// set maxArea to 0
// directions = four directions (up, down, left, right).

// paint: (accepts x coordinate, y coordinate, color)
// (dfs in all directions (up, down, left, right) until we go out of bounds or go out of an island)
  // If x or y is out of bounds (out of the grid) or cell is not part of an island, return.
  // Otherwise, set cell to color
  // Increment islandsSize count for island of color 'color'
  // Loop through directions (pointer = i)
    // recursively call paint for (x + directions[i][0], y + directions[i][1], color)
  
// Loop through each cell in grid (grid[i][j])
  // If grid[i][j] is 1 (is island), call function paint for coordinates i, j, and current color.
  // Update maxArea is size of current island is bigger than maxArea (case where there are no cells equal to 0)
  // Increment color (set islands to different colors so we won't overlap)
// When we finish, each island will be painted a different color (numbers 2, 3, 4, 5...)
// Loop through each cell in grid again (grid[i][j])
  // If grid[i][j] is 0 (it is a possible to put an extra island cell),
    // Calculate the total area of neighboring islands (if there are any), keep it in a variable 'tempArea'
    // note: because neighboring blocks could be of the same island, we create a map to make sure we don't calculate the area of the same island more than once.
  // Update maxArea if tempArea is bigger than maxArea
// Return maxArea.

// Time Complexity: O(mn) 344ms
// Space Complexity: O(mn) (call stack) 57.9MB
var largestIsland = function(grid) {
  let m = grid.length, n = grid[0].length;
  let color = 2;
  let islandsSize = {};
  let maxArea = 0;
  let directions = [[0, 1], [1, 0], [0, -1], [-1, 0]];
  for (var i = 0; i < m; i++) {
    for (var j = 0; j < n; j++) {
      if (grid[i][j] === 1) {
        islandsSize[color] = 0;
        paint(i, j, color);
        maxArea = Math.max(maxArea, islandsSize[color]);
        color++;
      };
    }
  }  
  for (i = 0; i < m; i++) {
    for (j = 0; j < n; j++) {
      if (grid[i][j] === 0) {
        let tempArea = 1;
        let neighbors = {};
        for (var h = 0; h < directions.length; h++) {
          let [x, y] = [i + directions[h][0], j + directions[h][1]];
          if (x >= 0 && y >= 0 && x < m && y < n && grid[x][y] > 1) {
            if (!neighbors[grid[x][y]]) tempArea += islandsSize[grid[x][y]];
            neighbors[grid[x][y]] = true;
          } 
          maxArea = Math.max(maxArea, tempArea);
        }
      }
    }
  }
  return maxArea;
  function paint(x, y, color) {
    if (x < 0 || y < 0 || x === m || y === n || grid[x][y] !== 1) return;
    grid[x][y] = color;
    islandsSize[color]++;
    for (var i = 0; i < directions.length; i++) paint(x + directions[i][0], y + directions[i][1], color);
  }
};

// Four test cases 
console.log(largestIsland([[0,0,1],[1,1,0], [1,1,1]])) // 7
console.log(largestIsland([[1,0],[0,1]])) // 3
console.log(largestIsland([[1,1],[1,0]])) // 4
console.log(largestIsland([[1,1],[1,1]])) // 4