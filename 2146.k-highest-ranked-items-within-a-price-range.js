// 2146. K Highest Ranked Items Within a Price Range
// You are given a 0-indexed 2D integer array grid of size m x n that represents a map of the items in a shop. The integers in the grid represent the following:
  // 0 represents a wall that you cannot pass through.
  // 1 represents an empty cell that you can freely move to and from.
  // All other positive integers represent the price of an item in that cell. You may also freely move to and from these item cells.
// It takes 1 step to travel between adjacent grid cells.
// You are also given integer arrays pricing and start where pricing = [low, high] and start = [row, col] indicates that you start at the position (row, col) and are interested only in items with a price in the range of [low, high] (inclusive). You are further given an integer k.
// You are interested in the positions of the k highest-ranked items whose prices are within the given price range. The rank is determined by the first of these criteria that is different:
  // 1. Distance, defined as the length of the shortest path from the start (shorter distance has a higher rank).
  // 2. Price (lower price has a higher rank, but it must be in the price range).
  // 3. The row number (smaller row number has a higher rank).
  // 4. The column number (smaller column number has a higher rank).
// Return the k highest-ranked items within the price range sorted by their rank (highest to lowest). If there are fewer than k reachable items within the price range, return all of them.


// Solution: Level by Level BFS

// Level by level BFS from the starting cell.
// Stop at the level where we have more than k items (stop at the end of the level, not immediately after we get k items, since if the distance is the same, we need to sort by price).
// At the end, sort the items by (distance, price, row, column) and return the top k items.

// Time Complexity: O(mn log(mn)) 1010ms
// Space Complexity: O(mn) 86MB
var highestRankedKItems = function(grid, pricing, start, k) {
  let m = grid.length, n = grid[0].length; 
  const directions = [[-1, 0], [0, 1], [1, 0], [0, -1]];
  let items = [], queue = [start], dist = 0;
  let visited = Array(m).fill(0).map(() => Array(n).fill(0));
  visited[start[0]][start[1]] = 1; 
  while (queue.length) {
    for (let i = queue.length; i > 0; i--) {
      let [row, col] = queue.shift();
      if (grid[row][col] >= pricing[0] && grid[row][col] <= pricing[1]) {
        items.push([dist, row, col]);
      }
      for (let [x, y] of directions) {
        let newRow = row + x, newCol = col + y;
        if (newRow < 0 || newRow >= m || newCol < 0 || newCol >= n || grid[newRow][newCol] === 0 || visited[newRow][newCol]) continue;
        queue.push([newRow, newCol]);
        visited[newRow][newCol] = 1;
      }
    }
    if (items.length >= k) break;
    dist++;
  }
  return items.sort((a, b) => {
    if (a[0] !== b[0]) return a[0] - b[0];
    if (grid[a[1]][a[2]] !== grid[b[1]][b[2]]) return grid[a[1]][a[2]] - grid[b[1]][b[2]];
    if (a[1] !== b[1]) return a[1] - b[1];
    return a[2] - b[2];
  }).slice(0, k).map(([_, row, col]) => [row, col]);
};

// Three test cases
console.log(highestRankedKItems([[1,2,0,1],[1,3,0,1],[0,2,5,1]], [2,5], [0,0], 3)) // [[0,1],[1,1],[2,1]]
console.log(highestRankedKItems([[1,2,0,1],[1,3,3,1],[0,2,5,1]], [2,3], [2,3], 2)) // [[2,1],[1,2]]
console.log(highestRankedKItems([[1,1,1],[0,0,1],[2,3,4]], [2,3], [0,0], 3)) // [[2,1],[2,0]]