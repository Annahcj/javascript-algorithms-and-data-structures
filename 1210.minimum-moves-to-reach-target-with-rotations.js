// 1210. Minimum Moves to Reach Target with Rotations
// In an n*n grid, there is a snake that spans 2 cells and starts moving from the top left corner at (0, 0) and (0, 1). The grid has empty cells represented by zeros and blocked cells represented by ones. The snake wants to reach the lower right corner at (n-1, n-2) and (n-1, n-1).
// In one move the snake can:
  // Move one cell to the right if there are no blocked cells there. This move keeps the horizontal/vertical position of the snake as it is.
  // Move down one cell if there are no blocked cells there. This move keeps the horizontal/vertical position of the snake as it is.
  // Rotate clockwise if it's in a horizontal position and the two cells under it are both empty. In that case the snake moves from (r, c) and (r, c+1) to (r, c) and (r+1, c).
  // Rotate counterclockwise if it's in a vertical position and the two cells to its right are both empty. In that case the snake moves from (r, c) and (r+1, c) to (r, c) and (r, c+1).
// Return the minimum number of moves to reach the target.
// If there is no way to reach the target, return -1.


// Solution: Level by level BFS

// Perform level by level BFS starting from (0, 0) and (0, 1).
// Store each [row, column, isHorizontal].
// Avoid visiting states we have already been to.

// For each state, there are three paths we can take:
  // 1. Move right - only if there is enough space on the right side and no obstacle
  // 2. Move down - only if there is enough space on the bottom and no obstacle
  // 3. Rotate (clockwise or counterclockwise) - only if there are two empty spaces (on the right or bottom)

// Time Complexity: O(mn) 229ms
// Space Complexity: O(mn) 51.6MB
var minimumMoves = function(grid) {
  let n = grid.length;
  let seen = Array(n).fill(0).map(() => Array(n).fill(0).map(() => Array(2).fill(0)));
  let queue = [[0, 0, 1]], moves = 0;
  seen[0][0][1] = 1;
  while (queue.length) {
    for (let i = queue.length; i > 0; i--) {
      let [r, c, isHorizontal] = queue.shift();
      if (r === n - 1 && c === n - 2 && isHorizontal) return moves;

      if (isHorizontal) {
        if (c + 2 < n && grid[r][c + 2] === 0 && !seen[r][c + 1][1]) { // move right
          seen[r][c + 1][1] = 1;
          queue.push([r, c + 1, 1]);
        }
        if (r + 1 < n && grid[r + 1][c] === 0 && grid[r + 1][c + 1] === 0 && !seen[r + 1][c][1]) { // move down
          seen[r + 1][c][1] = 1;
          queue.push([r + 1, c, 1]);
        }
        if (r + 1 < n && grid[r + 1][c] === 0 && grid[r + 1][c + 1] === 0 && !seen[r][c][0]) { // rotate clockwise 
          seen[r][c][0] = 1;
          queue.push([r, c, 0]);
        }
      } else {
        if (c + 1 < n && grid[r][c + 1] === 0 && grid[r + 1][c + 1] === 0 && !seen[r][c + 1][0]) { // move right
          seen[r][c + 1][0] = 1;
          queue.push([r, c + 1, 0]);
        }
        if (r + 2 < n && grid[r + 2][c] === 0 && !seen[r + 1][c][0]) { // move down
          seen[r + 1][c][0] = 1;
          queue.push([r + 1, c, 0]);
        }
        if (c + 1 < n && grid[r][c + 1] === 0 && grid[r + 1][c + 1] === 0 && !seen[r][c][1]) { // rotate counterclockwise
          seen[r][c][1] = 1;
          queue.push([r, c, 1]);
        }
      }
    }
    moves++;
  }
  return -1;
};

// Two test cases to run function on
console.log(minimumMoves([[0,0,0,0,0,1],[1,1,0,0,1,0],[0,0,0,0,1,1],[0,0,1,0,1,0],[0,1,1,0,0,0],[0,1,1,0,0,0]])) // 11
console.log(minimumMoves([[0,0,1,1,1,1],[0,0,0,0,1,1],[1,1,0,0,0,1],[1,1,1,0,0,1],[1,1,1,0,0,1],[1,1,1,0,0,0]])) // 9