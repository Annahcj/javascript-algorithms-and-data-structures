// 302. Smallest Rectangle Enclosing Black Pixels
// You are given an m x n binary matrix image where 0 represents a white pixel and 1 represents a black pixel.
// The black pixels are connected (i.e., there is only one black region). Pixels are connected horizontally and vertically.
// Given two integers x and y that represents the location of one of the black pixels, return the area of the smallest (axis-aligned) rectangle that encloses all black pixels.


// Solution: Recursive DFS

// This problem is similar to Number of Islands.
// We are given the location of a black pixel in the 'black pixel island' (the group of connected pixels)
// From that one black pixel, we can recursively dfs through the whole island while keeping track of the minimum row and column, and maximum row and column of the pixel island.

// After the dfs is finished, we can return (max row - min row) * (max column - min column)

// w = max width of rectangle
// h = max height of rectangle
// Time Complexity: O(w * h) 101ms
// Space Complexity: O(w * h) 43.3MB
var minArea = function(image, x, y) {
  const directions = [[0, 1], [1, 0], [0, -1], [-1, 0]];
  let width = image[0].length, length = image.length;
  let minRow = x, maxRow = x;
  let minCol = y, maxCol = y;
  dfs(x, y);
  return (maxRow - minRow + 1) * (maxCol - minCol + 1);

  function dfs(row, col) {
    minRow = Math.min(minRow, row);
    maxRow = Math.max(maxRow, row);
    minCol = Math.min(minCol, col);
    maxCol = Math.max(maxCol, col);

    // try all four directions (right, down, left, up)
    for (var [x, y] of directions) {
      let newX = row + x, newY = col + y;
      // if new coordinates are out of bounds, continue
      if (newX < 0 || newX >= length || newY < 0 || newY >= width) continue;
      // if new pixel is a black pixel, mark it as visited, and dfs that pixel
      if (image[newX][newY] === '1') {
        image[newX][newY] = '2';
        dfs(newX, newY);
      }
    }
  }  
};

// Two test cases to run function on
console.log(minArea([["0","0","1","0"],["0","1","1","0"],["0","1","0","0"]], 0, 2)) // 6
console.log(minArea([["1"]], 0, 0)) // 1