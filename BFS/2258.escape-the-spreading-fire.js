// 2258. Escape the Spreading Fire
// You are given a 0-indexed 2D integer array grid of size m x n which represents a field. Each cell has one of three values:
  // 0 represents grass,
  // 1 represents fire,
  // 2 represents a wall that you and fire cannot pass through.
// You are situated in the top-left cell, (0, 0), and you want to travel to the safehouse at the bottom-right cell, (m - 1, n - 1). Every minute, you may move to an adjacent grass cell. After your move, every fire cell will spread to all adjacent cells that are not walls.
// Return the maximum number of minutes that you can stay in your initial position before moving while still safely reaching the safehouse. If this is impossible, return -1. If you can always reach the safehouse regardless of the minutes stayed, return 109.
// Note that even if the fire spreads to the safehouse immediately after you have reached it, it will be counted as safely reaching the safehouse.
// A cell is adjacent to another cell if the former is directly north, east, south, or west of the latter (i.e., their sides are touching).


// Solution: BFS & Binary Search 

// Binary search for the maximum number of minutes to reach the safehouse.
  // lower bound: 0, upper bound: 10^9

// 1. We need to do some preprocessing.
  // BFS level-by-level to record the minimum time for fire to spread to each individual cell (fireSpread[row][col] = minimum number of minutes for fire to spread to grid[row][col])

// 2. Binary search for the number of minutes:
  // To check whether we can reach the safehouse after waiting x minutes:
    // BFS level-by-level, keeping track of the number of minutes.
    // We can only move to an adjacent cell if the time for the fire to reach it is less than the current time + 1. (The only exception is the safehouse, in which it can be equal time).

// m = number of rows, n = number of columns, k = 10^9
// Time Complexity: O(mn log(k)) 447ms
// Space Complexity: O(mn) 62.6MB
var maximumMinutes = function(grid) {
  let fireSpread = getFireSpreadTime(grid);
  let low = 0, high = 10 ** 9;
  while (low < high) {
    let mid = Math.ceil((low + high) / 2);
    if (canReachSafehouse(grid, fireSpread, mid)) low = mid;
    else high = mid - 1;
  }
  return canReachSafehouse(grid, fireSpread, low) ? low : -1;
};

function canReachSafehouse(originalGrid, fireSpread, timeToWait) {
  const directions = [[0, 1], [1, 0], [0, -1], [-1, 0]];
  let grid = originalGrid.map((row) => [...row]);
  let m = grid.length, n = grid[0].length;
  let queue = [[0, 0]], time = timeToWait;
  while (queue.length) {
    for (let i = queue.length; i > 0; i--) {
      let [row, col] = queue.shift();
      if (row === m - 1 && col === n - 1) {
        return true;
      }
      for (let [x, y] of directions) {
        let newX = row + x, newY = col + y;
        if (newX < 0 || newX >= m || newY < 0 || newY >= n || grid[newX][newY] !== 0) continue; // out of bounds or cell is not grass
        let isTarget = newX === m - 1 && newY === n - 1;
        if ((isTarget && time + 1 <= fireSpread[newX][newY]) || time + 1 < fireSpread[newX][newY]) { // only visit if fire will not spread to new cell at the next minute
          grid[newX][newY] = 1;
          queue.push([newX, newY]);
        }
      }
    }
    time++;
  }
  return false;
}

function getFireSpreadTime(originalGrid) {
  const directions = [[0, 1], [1, 0], [0, -1], [-1, 0]];
  let grid = originalGrid.map((row) => [...row]);
  let m = grid.length, n = grid[0].length;
  let queue = [];
  for (let i = 0; i < m; i++) {
    for (let j = 0; j < n; j++) {
      if (grid[i][j] === 1) {
        queue.push([i, j]);
      }
    }
  }
  
  let time = 0, fireSpread = Array(m).fill(0).map(() => Array(n).fill(Infinity));
  while (queue.length) {
    for (let i = queue.length; i > 0; i--) {
      let [row, col] = queue.shift();
      fireSpread[row][col] = time;
      for (let [x, y] of directions) {
        let newX = row + x, newY = col + y;
        if (newX < 0 || newX >= m || newY < 0 || newY >= n || grid[newX][newY] !== 0) continue; // out of bounds or cell is not grass
        grid[newX][newY] = 1;
        queue.push([newX, newY]);
      }
    }
    time++;
  }
  return fireSpread;
}

// Three test cases
console.log(maximumMinutes([[0,2,0,0,0,0,0],[0,0,0,2,2,1,0],[0,2,0,0,1,2,0],[0,0,2,2,2,0,2],[0,0,0,0,0,0,0]])) // 3
console.log(maximumMinutes([[0,0,0,0],[0,1,2,0],[0,2,0,0]])) // -1
console.log(maximumMinutes([[0,0,0],[2,2,0],[1,2,0]])) // 1000000000