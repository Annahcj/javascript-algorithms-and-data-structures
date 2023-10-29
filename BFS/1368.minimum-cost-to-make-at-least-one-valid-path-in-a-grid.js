// 1368. Minimum Cost to Make at Least One Valid Path in a Grid


// Solution: BFS & DFS

// We need:
  // A matrix 'dp' to store the shortest steps to reach point [i][j].
  // Four directions in order of right, left, down, up
  // A queue which stores the next cells 

// 1. DFS: traverse all reachable nodes (following the arrows), push all reachable nodes to a queue.
// 2. Loop through the queue, change the arrow direction and dfs the newly reachable locations.

// Time Complexity: O(nm) 115ms
// Space Complexity: O(nm) 47.7MB
var minCost = function(grid) {
  let n = grid.length, m = grid[0].length;
  let dp = Array(n);
  const directions = [[0, 1], [0, -1], [1, 0], [-1, 0]];
  for (let i = 0; i < n; i++) dp[i] = Array(m).fill(Infinity);
  let cost = 0;
  let queue = [];
  dfs(0, 0, cost);

  while (queue.length) {
    cost++; // keep track of the level we are currently at
    let size = queue.length; // fix the size of the queue, this is important.
    for (let i = 0; i < size; i++) {
      let [row, col] = queue.shift();
      for (let j = 0; j < 4; j++) dfs(row + directions[j][0], col + directions[j][1], cost); // change the direction of the arrow with a cost of 1
    }
  }
  return dp[n - 1][m - 1];

  function dfs(row, col, cost) {
    if (row < 0 || row >= n || col < 0 || col >= m || dp[row][col] !== Infinity) return;
    dp[row][col] = cost; // store the cost to reach this point
    queue.push([row, col]); // push each reachable point in the queue
    let dir = grid[row][col] - 1; // directions corresponds to the arrow directions: 1 is right (0), 2 is left (1), 3 is down (2), 4 is up (3).
    let newX = row + directions[dir][0], newY = col + directions[dir][1]; // new coordinates following the arrow 
    dfs(newX, newY, cost);
  }  
};

// Four test cases 
console.log(minCost([[1,1,1,1],[2,2,2,2],[1,1,1,1],[2,2,2,2]])) // 3
console.log(minCost([[1,1,3],[3,2,2],[1,1,4]])) // 0
console.log(minCost([[1,2],[4,3]])) // 1
console.log(minCost([[2,2,2],[2,2,2]])) // 3