// 1730. Shortest Path to Get Food
// You are starving and you want to eat food as quickly as possible. You want to find the shortest path to arrive at any food cell.
// You are given an m x n character matrix, grid, of these different types of cells:
  // '*' is your location. There is exactly one '*' cell.
  // '#' is a food cell. There may be multiple food cells.
  // 'O' is free space, and you can travel through these cells.
  // 'X' is an obstacle, and you cannot travel through these cells.
// You can travel to any adjacent cell north, east, south, or west of your current location if there is not an obstacle.
// Return the length of the shortest path for you to reach any food cell. If there is no path for you to reach food, return -1.


// Solution: BFS

// 1. Find the start location
// 2. Do level by level bfs to find the shortest path to a food cell

// Time Complexity: O(mn) 252ms
// Space Complexity: O(mn) 52.4MB
var getFood = function(grid) {
  let m = grid.length, n = grid[0].length;
  const directions = [[-1, 0], [0, 1], [1, 0], [0, -1]];
  let queue = [], seen = Array(m).fill(0).map(() => Array(n).fill(0));
  
  // find start location
  for (let i = 0; i < m; i++) {
    for (let j = 0; j < n; j++) {
      if (grid[i][j] === '*') {
        queue.push([i, j]);
        seen[i][j] = 1;
        break;
      }
    }
  }
  
  // level by level bfs
  let steps = 0;
  while (queue.length) {
    for (let i = queue.length - 1; i >= 0; i--) {
      let [row, col] = queue.shift();
      if (grid[row][col] === '#') return steps; // found the target
      for (let [x, y] of directions) {
        let newX = row + x, newY = col + y;
        // out of bounds or obstacle or visited
        if (newX < 0 || newX >= m || newY < 0 || newY >= n || grid[newX][newY] === 'X' || seen[newX][newY]) continue;
        queue.push([newX, newY]);
        seen[newX][newY] = 1; // mark as visited
      }
    }
    steps++;
  }
  return -1;
};

// Three test cases to run function on
console.log(getFood([["X","X","X","X","X","X"],["X","*","O","O","O","X"],["X","O","O","#","O","X"],["X","X","X","X","X","X"]])) // 3
console.log(getFood([["X","X","X","X","X"],["X","*","X","O","X"],["X","O","X","#","X"],["X","X","X","X","X"]])) // -1
console.log(getFood([["X","X","X","X","X","X","X","X"],["X","*","O","X","O","#","O","X"],["X","O","O","X","O","O","X","X"],["X","O","O","O","O","#","O","X"],["X","X","X","X","X","X","X","X"]])) // 6