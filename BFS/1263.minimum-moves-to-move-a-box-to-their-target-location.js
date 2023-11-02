// 1263. Minimum Moves to Move a Box to Their Target Location
// A storekeeper is a game in which the player pushes boxes around in a warehouse trying to get them to target locations.
// The game is represented by an m x n grid of characters grid where each element is a wall, floor, or box.
// Your task is to move the box 'B' to the target position 'T' under the following rules:
  // The character 'S' represents the player. The player can move up, down, left, right in grid if it is a floor (empty cell).
  // The character '.' represents the floor which means a free cell to walk.
  // The character '#' represents the wall which means an obstacle (impossible to walk there).
  // There is only one box 'B' and one target cell 'T' in the grid.
  // The box can be moved to an adjacent free cell by standing next to the box and then moving in the direction of the box. This is a push.
  // The player cannot walk through the box.
// Return the minimum number of pushes to move the box to the target. If there is no way to reach the target, return -1.


// Solution: Level by level BFS

// 1. Find locations of box 'B', target 'T', and player 'S'.
// 2. BFS from box's location to the target.
  // each time, BFS to check whether the player can get to the box's location (next to it in the right direction)
  // the location of the player must be next to the box's current location in the correct direction (if going left, player must be on the right)
  // note: make sure to avoid going over the box's current location as it counts as an obstacle.

// Notes:
  // Do level by level BFS so that it is easier to keep track of the number of moves we have made.
  // Use a set to keep track of positions that we have been to.
    // Keep in mind the player's location must be recorded together.
    // Even if the box's location is the same, if the player's location is different it can yield different results.

// Time Complexity: O((mn)^2): 200ms
// Space Complexity: O((mn)^2) 51MB
var minPushBox = function(grid) {
  // up, right, down, left
  const directions = [[-1, 0], [0, 1], [1, 0], [0, -1]];
  // player directions in relation to the box: down, left, up, right
  const player_directions = [[2, 0], [0, -2], [-2, 0], [0, 2]];
  
  let box, target, player;
  let m = grid.length, n = grid[0].length;
  
  // find locations of box 'B', target 'T', and player 'S'.
  for (let i = 0; i < m; i++) {
    for (let j = 0; j < n; j++) {
      if (grid[i][j] === 'B') box = [i, j];
      else if (grid[i][j] === 'T') target = [i, j];
      else if (grid[i][j] === 'S') player = [i, j];
    }
  }
  
  let queue = [[box, player]], seen = new Set();
  let steps = 0;
  while (queue.length) {
    for (let i = queue.length - 1; i >= 0; i--) { // level-by-level bfs
      let [box_pos, player_pos] = queue.shift(), [row, col] = box_pos;
      if (row === target[0] && col === target[1]) return steps;
      for (let i = 0; i < 4; i++) {
        let [x, y] = directions[i], [px, py] = player_directions[i];
        let newX = row + x, newY = col + y;
        let playerX = newX + px, playerY = newY + py;

        let key = `${newX},${newY},${row},${col}`;
        if (!isValid(newX, newY) || seen.has(key)) continue;
        if (playerCanReach(player_pos, [playerX, playerY], box_pos)) {
          queue.push([[newX, newY], box_pos]);
          seen.add(key);
        }
      }
    }
    steps++;
  }
  return -1;
    
  // BFS to check whether it is possible for the player to reach the target position.
  function playerCanReach(pos, target, box_pos) {
    let queue = [pos], seen = Array(m).fill(0).map(() => Array(n).fill(0));
    seen[box_pos[0]][box_pos[1]] = 1; // mark box as seen to ensure the player can't walk through the box
    while (queue.length) {
      let [row, col] = queue.shift();
      if (row === target[0] && col === target[1]) return true;
      for (let [x, y] of directions) {
        let newX = row + x, newY = col + y;
        if (isValid(newX, newY) && !seen[newX][newY]) {
          queue.push([newX, newY]);
          seen[newX][newY] = 1;
        }
      }
    }
    return false;
  }

  function isValid(row, col) {
    if (row < 0 || row >= m || col < 0 || col >= n) return false;
    return grid[row][col] !== '#';
  }
};

// Three test cases
console.log(minPushBox([["#","#","#","#","#","#"],["#","T","#","#","#","#"],["#",".",".","B",".","#"],["#",".","#","#",".","#"],["#",".",".",".","S","#"],["#","#","#","#","#","#"]])) // 3
console.log(minPushBox([["#","#","#","#","#","#"],["#","T","#","#","#","#"],["#",".",".","B",".","#"],["#","#","#","#",".","#"],["#",".",".",".","S","#"],["#","#","#","#","#","#"]])) // -1
console.log(minPushBox([["#",".",".","#","#","#","#","#"],["#",".",".","T","#",".",".","#"],["#",".",".",".","#","B",".","#"],["#",".",".",".",".",".",".","#"],["#",".",".",".","#",".","S","#"],["#",".",".","#","#","#","#","#"]])) // 7