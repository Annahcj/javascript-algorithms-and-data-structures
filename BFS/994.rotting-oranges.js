// 994. Rotting Oranges
// You are given an m x n grid where each cell can have one of three values:
// 0 representing an empty cell,
// 1 representing a fresh orange, or
// 2 representing a rotten orange.
// Every minute, any fresh orange that is 4-directionally adjacent to a rotten orange becomes rotten.
// Return the minimum number of minutes that must elapse until no cell has a fresh orange. If this is impossible, return -1.


// Solution: BFS

// Algorithm:

// Loop through each cell in grid, 
  // If cell is rotten (2), increment rotten count, and push cell's coordinates into queue.
  // If cell is empty (0), increment the empty count.

// allRotten = total number of cells - empty cells (this is the number of cells that should become rotten in the end)

// Loop while queue is not empty ~
  // Set next (next level of rotten cells) to an empty array
  // Loop while queue is not empty ~~
    // Pop the last item off queue, let row and col be the coordinates.
    // Loop through each [x, y] in directions 
      // let newX be row + x, newY be col + y
      // if newX is out of bounds or newY is out of bounds, continue. 
      // if grid[newX][newY] is a fresh cell (1),
        // push [newX, newY] into next
        // turn grid[newX][newY] into a rotten orange (2) (this is so that we don't visit the same cell more than once)
        // increment rotten by one
  // ~~ When a minute is over and the queue is empty, set queue to next.
  // if queue is not empty, increment minutes by 1
// ~
// If rotten is equal to allRotten (target reached), return minutes, otherwise return -1 (impossible be all rotten)

// Time Complexity: O(n) 80ms
// Space Complexity: O(n) 41.2MB
var orangesRotting = function(grid) {
  let queue = [], empty = 0, rotten = 0;  
  for (let i = 0; i < grid.length; i++) {
    for (let j = 0; j < grid[0].length; j++) {
      if (grid[i][j] === 2) {
        queue.push([i, j]);
        rotten++;
      } else if (grid[i][j] === 0) empty++;
    }
  }

  let allRotten = grid.length * grid[0].length - empty;
  const directions = [[0, 1], [1, 0], [0, -1], [-1, 0]];
  let mins = 0;
  while (queue.length) {
    let next = [];
    while (queue.length) {
      let [row, col] = queue.pop();
      for (let [x, y] of directions) {
        let newX = row + x, newY = col + y;
        if (newX < 0 || newX >= grid.length || newY < 0 || newY >= grid[0].length) continue;
        if (grid[newX][newY] === 1) {
          next.push([newX, newY]);
          grid[newX][newY] = 2;
          rotten++;
        }
      }
    }
    queue = next;
    if (queue.length) mins++;
  }
  return rotten === allRotten ? mins : -1;
};

// Three test cases
console.log(orangesRotting([[2,1,1],[1,1,0],[0,1,1]])) // 4
console.log(orangesRotting([[2,1,1],[0,1,1],[1,0,1]])) // -1
console.log(orangesRotting([[0,2]])) // 0