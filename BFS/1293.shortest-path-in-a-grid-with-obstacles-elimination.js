// 1293. Shortest Path in a Grid with Obstacles Elimination
// You are given an m x n integer matrix grid where each cell is either 0 (empty) or 1 (obstacle). You can move up, down, left, or right from and to an empty cell in one step.
// Return the minimum number of steps to walk from the upper left corner (0, 0) to the lower right corner (m - 1, n - 1) given that you can eliminate at most k obstacles. If it is not possible to find such walk return -1.


// Solution: BFS

// Level by level BFS from (0, 0).
// For every element in the queue, keep track of [row, column, k].
// Store visited state [row, column, k] and avoid revisiting so we don't have to recompute.

// From every cell, try to move up, down, left, and right.
  // We can only visit a neighboring cell if:
    // The coordinates are in bounds (within the grid)
    // The neighboring cell is an obstacle and we have enough k leftover to eliminate it.
    // We haven't been to that state (newRow, newColumn, newK) before.

// m = number of rows, n = number of columns
// Time Complexity: O(mnk) 446ms
// Space Complexity: O(mnk) 81.4MB
var shortestPath = function(grid, k) {
  let m = grid.length, n = grid[0].length;
  let seen = Array(m).fill(0).map(() => Array(n).fill(0).map(() => Array(k + 1).fill(0)));
  const directions = [[-1, 0], [0, 1], [1, 0], [0, -1]];
  let queue = [[0, 0, k]], steps = 0;
  seen[0][0][k] = 1;
  while (queue.length) {
    for (let i = queue.length; i > 0; i--) {
      let [row, col, kLeft] = queue.shift();
      if (row === m - 1 && col === n - 1) return steps;
      for (let [x, y] of directions) {
        let newX = row + x, newY = col + y;
        if (newX < 0 || newX >= m || newY < 0 || newY >= n) continue; // out of bounds
        if (grid[newX][newY] === 1 && kLeft === 0) continue; // we don't have any k left to eliminate the obstacle
        let newK = grid[newX][newY] === 1 ? kLeft - 1 : kLeft;
        if (seen[newX][newY][newK]) continue; // already been to that state
        seen[newX][newY][newK] = 1;
        queue.push([newX, newY, newK]);
      }
    }
    steps++;
  }
  return -1;
};

// Two test cases 
console.log(shortestPath([[0,0,0],[1,1,0],[0,0,0],[0,1,1],[0,0,0]], 1)) // 6
console.log(shortestPath([[0,1,1],[1,1,1],[1,0,0]],  1)) // -1