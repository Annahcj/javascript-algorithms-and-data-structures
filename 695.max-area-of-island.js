// 695. Max Area of Island
// Return the maximum area of an island in grid. If there is no island, return 0.


// Solution 1: Recursive 'DFS'

// Loop through entire grid, when 1 is found, we calculate the size of the island (findIslandSize) and compare it with current biggest island.

// findIslandSize: accepts two params, (i, j) => indicating the position in the matrix
// If either i or j is out of bounds (not within size of the matrix), return 0.
// Set grid[i][j] to zero so we avoid checking the same point again
// Return 1 (current point) + recursive calls on findIslandSize for all four directions: (i + 1, j), (i - 1, j), (i, j + 1), (i, j - 1).
// Return the maxArea.

// Time Complexity: O(mn) (width * height) 88ms
// Space Complexity: O(1) (solution modifies input) 40.9MB
var maxAreaOfIsland = function(grid) {
    let width = grid[0].length, length = grid.length;
    let maxArea = 0;
    for (var i = 0; i < length; i++) {
      for (var j = 0; j < width; j++) {
        if (grid[i][j] === 1) {
          maxArea = Math.max(maxArea, findIslandSize(i, j));
        }
      }
    }
    function findIslandSize(i, j) {
      if (i < 0 || j < 0 || i > length - 1 || j > width - 1 || !grid[i][j]) {
        return 0;
      }
      grid[i][j] = 0;
      return 1 + findIslandSize(i + 1, j) + findIslandSize(i - 1, j) + findIslandSize(i, j + 1) + findIslandSize(i, j - 1);
    }
    return maxArea;
  };
  
  // Two test cases to run function on
  console.log(maxAreaOfIsland([[0,0,1,0,0,0,0,1,0,0,0,0,0],[0,0,0,0,0,0,0,1,1,1,0,0,0],[0,1,1,0,1,0,0,0,0,0,0,0,0],[0,1,0,0,1,1,0,0,1,0,1,0,0],[0,1,0,0,1,1,0,0,1,1,1,0,0],[0,0,0,0,0,0,0,0,0,0,1,0,0],[0,0,0,0,0,0,0,1,1,1,0,0,0],[0,0,0,0,0,0,0,1,1,0,0,0,0]])) // 6
  console.log(maxAreaOfIsland([[0,0,0,0,0,0,0,0]])) // 0