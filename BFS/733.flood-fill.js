// 733. Flood Fill
// An image is represented by an m x n integer grid image where image[i][j] represents the pixel value of the image.
// You are also given three integers sr, sc, and newColor. You should perform a flood fill on the image starting from the pixel image[sr][sc].
// To perform a flood fill, consider the starting pixel, plus any pixels connected 4-directionally to the starting pixel of the same color as the starting pixel, plus any pixels connected 4-directionally to those pixels (also with the same color), and so on. Replace the color of all of the aforementioned pixels with newColor.
// Return the modified image after performing the flood fill.


// Note: In this question, if the color of the starting cell is the newColor, we don't paint it again. 
// This would cause a stack overflow, hence another way to deal with this would be to use a 'visited' set.

// Solution 1: Recursive DFS

// Time Complexity: O(mn) 84ms
// Space Complexity: O(mn) (worst case) 40.9MB
var floodFill = function(image, sr, sc, newColor) {
  const directions = [[-1, 0], [0, 1], [1, 0], [0, -1]];
  let m = image.length, n = image[0].length;
  let color = image[sr][sc];
  if (color !== newColor) dfs(sr, sc); // only if starting cell is not the same color
  return image;
  
  function dfs(row, col) {
    image[row][col] = newColor; // color it with the newColor
    for (var [x, y] of directions) {
      let newX = row + x, newY = col + y;
      if (newX < 0 || newX >= m || newY < 0 || newY >= n || image[newX][newY] !== color) continue;
      dfs(newX, newY);
    }
  }  
};

// Solution 2: BFS

// Both dfs and bfs have the same time complexity, 
// but for JavaScript, bfs could have a slightly slower runtime due to the .shift() having an O(n) time complexity.
// This can be fixed by either using 
  // 1. a linked list or 
  // 2. using two queues 

// Time Complexity: O(mn) 
// Space Complexity: O(mn) (worst case)
var floodFill = function(image, sr, sc, newColor) {
  const directions = [[-1, 0], [0, 1], [1, 0], [0, -1]];
  let m = image.length, n = image[0].length;
  let color = image[sr][sc];
  if (color === newColor) return image;
  
  let queue = [[sr, sc]];
  image[sr][sc] = newColor;
  
  while (queue.length) {
    let [row, col] = queue.shift();
    for (var [x, y] of directions) {
      let newX = row + x, newY = col + y;
      if (newX < 0 || newX >= m || newY < 0 || newY >= n || image[newX][newY] !== color) continue;
      queue.push([newX, newY]);
      image[newX][newY] = newColor;
    }
  }
  return image;
};

// Two test cases to run function on
console.log(floodFill([[1,1,1],[1,1,0],[1,0,1]], 1, 1, 2)) // [[2,2,2],[2,2,0],[2,0,1]]
console.log(floodFill([[0,0,0],[0,0,0]], 0, 0, 2)) // [[2,2,2],[2,2,2]]