// 542. 01 Matrix
// Given an m x n binary matrix mat, return the distance of the nearest 0 for each cell.
// The distance between two adjacent cells is 1.


// Solution: Multi-source BFS

// Multi-source level-by-level BFS starting from all the 0's.
// Avoid revisiting cells.
// When we reach an unvisited cell, the shortest distance to a 0 is the current level of the BFS.

// Note: The time complexity here is calculated as if we are using a real queue with O(1) complexity when removing the first element.

// Time Complexity: O(mn) 202ms
// Space Complexity: O(mn) 62MB
var updateMatrix = function(mat) {
  const directions = [[-1, 0], [0, 1], [1, 0], [0, -1]];
  let m = mat.length, n = mat[0].length;
  let queue = [], minDist = Array(m).fill(0).map(() => Array(n).fill(Infinity));
  for (let i = 0; i < m; i++) {
    for (let j = 0; j < n; j++) {
      if (mat[i][j] === 0) {
        queue.push([i, j]);
        minDist[i][j] = 0;
      }
    }
  }
  let level = 0;
  while (queue.length) {
    for (let i = queue.length; i > 0; i--) {
      let [row, col] = queue.shift();
      for (let [x, y] of directions) {
        let newRow = row + x, newCol = col + y;
        if (newRow < 0 || newRow >= m || newCol < 0 || newCol >= n || minDist[newRow][newCol] !== Infinity) continue;
        minDist[newRow][newCol] = level + 1;
        queue.push([newRow, newCol]);
      }
    }
    level++;
  }
  return minDist;
};
  
// Four test cases
console.log(updateMatrix([[1,1,1],[1,1,1],[1,1,0]])) // [[4,3,2],[3,2,1],[2,1,0]]
console.log(updateMatrix([[0,0,0],[1,1,1],[1,1,0]])) // [[0,0,0],[1,1,1],[2,1,0]]
console.log(updateMatrix([[0,0,0],[0,1,0],[0,0,0]])) // [[0,0,0],[0,1,0],[0,0,0]]
console.log(updateMatrix([[0,0,0],[0,1,0],[1,1,1]])) // [[0,0,0],[0,1,0],[1,2,1]]