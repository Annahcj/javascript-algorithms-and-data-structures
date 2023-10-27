// 1091. Shortest Path in Binary Matrix
// Given an n x n binary matrix grid, return the length of the shortest clear path in the matrix. If there is no clear path, return -1.
// A clear path in a binary matrix is a path from the top-left cell (i.e., (0, 0)) to the bottom-right cell (i.e., (n - 1, n - 1)) such that:
  // All the visited cells of the path are 0.
  // All the adjacent cells of the path are 8-directionally connected (i.e., they are different and they share an edge or a corner).
// The length of a clear path is the number of visited cells of this path.


// Solution: BFS with Two Queues

// BFS finds us the shortest path to reach a target.
// In order to find the length of the path, we can use two queues to do a level by level bfs.
// Keep track of nodes we have visited in another matrix so that we don't have to modify the input.
// Note: We shouldn't ever need to revisit a node, since the first time we reach a node is already the fastest route.

// Another advantage of the two queues bfs is that we can use .pop() instead of .shift() since the order doesn't matter within a level.
// The .pop() is an O(1) operation whereas .shift() is an O(n) operation at the worst case.

/// n^2 = number of cells in grid
// Time Complexity: O(n^2) 162ms
// Space Complexity: O(n^2) 45.9MB
var shortestPathBinaryMatrix = function(grid) {
  const directions = [[-1, 0], [-1, 1], [0, 1], [1, 1], [1, 0], [1, -1], [0, -1], [-1, -1]];
  let queue = [[0, 0]], length = 1, n = grid.length;
  if (grid[0][0] === 1) return -1; // if the first cell is 1, we can never reach the end cell.
  let visited = Array(n);
  for (let i = 0; i < n; i++) visited[i] = Array(n).fill(0);
  
  while (queue.length) {
    let next = [];
    while (queue.length) {
      let [row, col] = queue.pop();
      if (row === n - 1 && col === n - 1) return length;
      for (let [x, y] of directions) {
        let newX = row + x, newY = col + y;
        if (newX < 0 || newX >= n || newY < 0 || newY >= n || grid[newX][newY] === 1) continue;
        if (visited[newX][newY]) continue;
        next.push([newX, newY]);
        visited[newX][newY] = 1;
      }
    }
    queue = next;
    length++;
  }
  
  return -1;
};

// Three test cases 
console.log(shortestPathBinaryMatrix([[0,1],[1,0]])) // 2
console.log(shortestPathBinaryMatrix([[0,0,0],[1,1,0],[1,1,0]])) // 4
console.log(shortestPathBinaryMatrix([[1,0,0],[1,1,0],[1,1,0]])) // -1