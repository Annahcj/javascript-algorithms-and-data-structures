// 1293. Shortest Path in a Grid with Obstacles Elimination
// You are given an m x n integer matrix grid where each cell is either 0 (empty) or 1 (obstacle). You can move up, down, left, or right from and to an empty cell in one step.
// Return the minimum number of steps to walk from the upper left corner (0, 0) to the lower right corner (m - 1, n - 1) given that you can eliminate at most k obstacles. If it is not possible to find such walk return -1.


// Solution: BFS w/ Two Queues

// Note: We can use two queues so that we can pop from the queue (O(1)) instead of shifting (O(n))
// Keep a visited map, and mark [0, 0, k] as visited

// Loop while the queue is not empty *
  // set next to []
  // loop while queue is not empty **
    // let [row, col, currK (current remaining k)] be queue.pop
    // if we have reached the target, return steps
    // loop through each [x, y] in all four directions
      // set newX (new x coordinate) to row + x, and set newY to col + y
      // if newX is in bounds and newY is in bounds
        // set newK (new remaining k) be currK - 1 if grid[newX][newY] is obstacle, otherwise just currK.
        // if [newX, newY, newK] is not visited yet and newK is valid (bigger than -1)
          // mark [newX, newY, newK] as visited
          // push [newX, newY, newK] into next
  // **
  // update queue to next
  // increment steps by one
// *
// if the queue becomes empty, return -1 (target cannot be reached)

// Time Complexity: O(mnk) 1140ms
// Space Complexity: O(mnk) 63.9MB 
var shortestPath = function(grid, k) {
  let width = grid[0].length, length = grid.length;
  const directions = [[-1, 0], [1, 0], [0, -1], [0, 1]];
  let queue = [[0, 0, k]], visited = {};
  let steps = 0;
  visited[[0, 0, k]] = true;
  while (queue.length) {
    let next = [];
    while (queue.length) {
      let [row, col, currK] = queue.pop();
      if (row === length - 1 && col === width - 1) return steps;
      for (var [x, y] of directions) {
        let newX = row + x, newY = col + y;
        if (newX > -1 && newX < length && newY > -1 && newY < width) {
          let newK = currK - (grid[newX][newY] === 1 ? 1 : 0);
          if (!visited[[newX, newY, newK]] && newK > -1) {
            visited[[newX, newY, newK]] = true;
            next.push([newX, newY, newK]);
          }
        }
      }
    }
    queue = next;
    steps++;
  }  
  return -1;
};

// Two test cases to run function on
console.log(shortestPath([[0,0,0],
 [1,1,0],
 [0,0,0],
 [0,1,1],
 [0,0,0]], 1)) // 6
 console.log(shortestPath([[0,1,1],
 [1,1,1],
 [1,0,0]],  1)) // -1