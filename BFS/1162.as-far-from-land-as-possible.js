// 1162. As Far from Land as Possible
// Given an n x n grid containing only values 0 and 1, where 0 represents water and 1 represents land, find a water cell such that its distance to the nearest land cell is maximized, and return the distance. If no land or water exists in the grid, return -1.
// The distance used in this problem is the Manhattan distance: the distance between two cells (x0, y0) and (x1, y1) is |x0 - x1| + |y0 - y1|.


// Solution: BFS

// Level by level BFS from all land cells.
// When we reach a water cell for the first time, the closest land cell would have reached it first.
// Record the distance of reaching the last unvisited water cell.

// n = length/width of grid
// Time Complexity: O(n^2) 112ms
// Space Complexity: O(n^2) 49.2MB
var maxDistance = function(grid) {
  let n = grid.length, queue = [];
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < n; j++) {
      if (grid[i][j] === 1) {
        queue.push([i, j]);
      }
    }
  }
  
  const directions = [[-1, 0], [0, 1], [1, 0], [0, -1]];
  let dist = 0, maxDist = 0;
  while (queue.length) {
    for (let i = queue.length; i > 0; i--) {
      let [row, col] = queue.shift();
      for (let [x, y] of directions) {
        let newX = row + x, newY = col + y;
        if (newX < 0 || newX >= n || newY < 0 || newY >= n || grid[newX][newY] !== 0) continue;
        queue.push([newX, newY]);
        grid[newX][newY] = 1; // mark as visited
        maxDist = Math.max(maxDist, dist + 1);
      }
    }
    dist++;
  }
  return maxDist === 0 ? -1 : maxDist;
};

// Two test cases
console.log(maxDistance([[1,0,1],[0,0,0],[1,0,1]])) // 2
console.log(maxDistance([[1,0,0],[0,0,0],[0,0,0]])) // 4