// 463. Island Perimeter
// You are given row x col grid representing a map where grid[i][j] = 1 represents land and grid[i][j] = 0 represents water.
// Grid cells are connected horizontally/vertically (not diagonally). The grid is completely surrounded by water, and there is exactly one island (i.e., one or more connected land cells).
// The island doesn't have "lakes", meaning the water inside isn't connected to the water around the island. One cell is a square with side length 1. The grid is rectangular, width and height don't exceed 100. Determine the perimeter of the island.


// Solution: Count Neighboring Land Cells

// For each cell in grid, 
// add 4 to the total perimeter,
// then check each four neighboring cells, subtract the number of neighboring land cells from total perimeter.

// return perimeter.

// Time Complexity: O(nm) 303ms
// Space Complexity: O(1) 48.9MB
var islandPerimeter = function(grid) {
  let perimeter = 0;
  let n = grid.length, m = grid[0].length;
  const directions = [[0, 1], [1, 0], [0, -1], [-1, 0]];
  for (var i = 0; i < n; i++) {
    for (var j = 0; j < m; j++) {
      if (grid[i][j] === 1) {
        perimeter += 4;
        for (var [x, y] of directions) {
          let newX = i + x, newY = j + y;
          if (newX < 0 || newX >= n || newY < 0 || newY >= m) continue;
          if (grid[newX][newY] === 1) {
            perimeter--;
          }
        }
      }
    }
  }  
  return perimeter;
};

// Three test cases to run function on
console.log(islandPerimeter([[0,1,0,0],[1,1,1,0],[0,1,0,0],[1,1,0,0]])) // 16
console.log(islandPerimeter([[1]])) // 4
console.log(islandPerimeter([[1,0]])) // 4