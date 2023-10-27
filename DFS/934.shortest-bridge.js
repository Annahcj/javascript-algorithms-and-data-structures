// 934. Shortest Bridge
// You are given an n x n binary matrix grid where 1 represents land and 0 represents water.
// An island is a 4-directionally connected group of 1's not connected to any other 1's. There are exactly two islands in grid.
// You may change 0's to 1's to connect the two islands to form one island.
// Return the smallest number of 0's you must flip to connect the two islands.


// Solution: DFS & BFS

// Use recursive dfs to find the first island.
// Expand the first island using bfs until it reaches the second island.

// Time Complexity: O(n^2) 155ms
// Space Complexity: O(n^2) 48.2MB 
var shortestBridge = function(grid) {
  const directions = [[-1, 0], [0, 1], [1, 0], [0, -1]];
  let n = grid.length;
  let visited = Array(n);
  for (let i = 0; i < n; i++) visited[i] = Array(n).fill(0);
  let queue = [];

  let islandFound = false;
  for (let i = 0; i < n; i++) {
    if (islandFound) break;
    for (let j = 0; j < n; j++) {
      if (grid[i][j] === 1) {
        dfs(i, j);
        islandFound = true;
        break;
      }
    }
  }

  let level = 0;
  while (queue.length) {
    let next = [];
    while (queue.length) {
      let [row, col] = queue.pop();
      for (let [x, y] of directions) {
        let newX = row + x, newY = col + y;
        if (newX < 0 || newX >= n || newY < 0 || newY >= n || visited[newX][newY]) continue;
        if (grid[newX][newY] === 1) return level;
        next.push([newX, newY]);
        visited[newX][newY] = 1;
      }
    }
    queue = next;
    level++;
  }
  
  function dfs(row, col) {
    if (row < 0 || row >= n || col < 0 || col >= n || grid[row][col] === 0 || visited[row][col]) return;
    visited[row][col] = 1;
    queue.push([row, col]);
    for (let [x, y] of directions) {
      dfs(row + x, col + y);
    }
  }  
};

// Three test cases
console.log(shortestBridge([[0,1],[1,0]])) // 1
console.log(shortestBridge([[0,1,0],[0,0,0],[0,0,1]])) // 2
console.log(shortestBridge([[1,1,1,1,1],[1,0,0,0,1],[1,0,1,0,1],[1,0,0,0,1],[1,1,1,1,1]])) // 1