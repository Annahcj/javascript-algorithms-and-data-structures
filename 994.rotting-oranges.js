// 994. Rotting Oranges
// You are given an m x n grid where each cell can have one of three values:
// 0 representing an empty cell,
// 1 representing a fresh orange, or
// 2 representing a rotten orange.
// Every minute, any fresh orange that is 4-directionally adjacent to a rotten orange becomes rotten.
// Return the minimum number of minutes that must elapse until no cell has a fresh orange. If this is impossible, return -1.


// Solution: BFS

// Count the number of empty cells, and the total number of rotten cells. Keep checking to see whether all fresh oranges have become rotten. ([all cells - empty cells === rotten cells] means all rotten)
// Use a queue to turn adjacent cells into rotten

// Algorithm:

// (keep a minutes counter, initially set to 0)
// Loop through each cell in grid, 
  // If cell is rotten (2), increment rotten count, and push cell's coordinates into queue.
  // If cell is empty (0), increment the emptyCells count.

// allRotten equals true: if total (all cells) - emptyCells equals rotten (rotten cells), otherwise false.

// Loop while queue is not empty AND allRotten is false ~
  // Set next (next level of rotten cells) to an empty array
  // Increment minutes (total minutes until all rotten)
  // Loop while queue is not empty ~~
    // Pop the last item off queue, let x and y be the coordinates.
    // Loop through each move in moves (all four directions)
      // let nx (newX) be x + move[0], ny (newY) be y + move[1]
      // If nx is not out of bounds AND ny is not out of bounds, 
        // turn grid[nx, ny] into a rotten orange (2) (this is so that we don't change the same cell more than once)
        // increment rotten by one
        // push [nx, ny] into next
  // ~~ When a minute is over and the queue is empty, set queue to next.
  // Update allRotten
// ~
// If allRotten is true, return minutes
// Otherwise, return -1 (impossible be all rotten)

// Time Complexity: O(n) 84ms
// Space Complexity: O(n) 41.5MB
  var orangesRotting = function(grid) {
    let minutes = 0, queue = [];
    let moves = [[0, 1], [1, 0], [0, -1], [-1, 0]];
    let width = grid[0].length, length = grid.length;
    let emptyCells = 0, total = grid.length * grid[0].length, rotten = 0;
    let allRotten = false;
    for (var i = 0; i < length; i++) {
      for (var j = 0; j < width; j++) {
        if (grid[i][j] === 2) {
          queue.push([i, j]);
          rotten++;
        } else if (grid[i][j] === 0) {
          emptyCells++;
        }
      }
    }  
    allRotten = (rotten === total - emptyCells) ? true : false;
    while (queue.length && !allRotten) {
      let next = [];
      minutes++;
      while (queue.length) {
        let [x, y] = queue.pop();
        for (var move of moves) {
          let nx = x + move[0], ny = y + move[1];
          if (nx > -1 && nx < length && ny > -1 && ny < width && grid[nx][ny] === 1) {
            grid[nx][ny] = 2;
            rotten++;
            next.push([nx, ny]);
          }
        }
      }
      queue = next;
      allRotten = (rotten === total - emptyCells) ? true : false;
    }
    return allRotten ? minutes : -1;
  };
  
  // Three test cases to run function on
  console.log(orangesRotting([[2,1,1],[1,1,0],[0,1,1]])) // 4
  console.log(orangesRotting([[2,1,1],[0,1,1],[1,0,1]])) // -1
  console.log(orangesRotting([[0,2]])) // 0