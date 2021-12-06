// 864. Shortest Path to Get All Keys
// You are given an m x n grid grid where:
  // '.' is an empty cell.
  // '#' is a wall.
  // '@' is the starting point.
  // Lowercase letters represent keys.
  // Uppercase letters represent locks.
// You start at the starting point and one move consists of walking one space in one of the four cardinal directions. You cannot walk outside the grid, or walk into a wall.
// If you walk over a key, you can pick it up and you cannot walk over a lock unless you have its corresponding key.
// For some 1 <= k <= 6, there is exactly one lowercase and one uppercase letter of the first k letters of the English alphabet in the grid. This means that there is exactly one key for each lock, and one lock for each key; and also that the letters used to represent the keys and locks were chosen in the same order as the English alphabet.
// Return the lowest number of moves to acquire all keys. If it is impossible, return -1.


// Solution: BFS

// BFS is the best option when it comes to finding the shortest path.
// We also need to keep track of cells we have already visited.
// However, since we could have different keys when we revisit a certain spot, we need to loosen the visited requirements.
// Instead of just taking the row & column coordinates into account, we also use a string of keys that we currently have.
// We only keep track of unique keys, so that we can check the length and return if we have obtained all the keys.

// Time Complexity: O(mn2^k) 360ms
// Space Complexity: O(mn2^k) 62.1MB
var shortestPathAllKeys = function(grid) {
  let queue = [];
  let m = grid.length, n = grid[0].length;
  let keysCount = 0;
  for (var i = 0; i < m; i++) {
    for (var j = 0; j < n; j++) {
      if (grid[i][j] === '@') queue.push([i, j, '']); // find the starting point
      else if (grid[i][j] >= 'a' && grid[i][j] <= 'g') keysCount++; // count the total number of keys in the grid
    }
  }
  let visited = new Set(), moves = 0;
  const directions = [[0, 1], [1, 0], [0, -1], [-1, 0]];

  while (queue.length) {
    let next = [];
    while (queue.length) {
      let [row, col, keys] = queue.pop();
      if (visited.has(`${row},${col},${keys}`)) continue;
      if (grid[row][col] >= 'a' && grid[row][col] <= 'g' && !keys.includes(grid[row][col])) keys += grid[row][col]; // add to keys if cell is a key and keys doesn't contain key
      visited.add(`${row},${col},${keys}`); // mark as visited
      if (keys.length === keysCount) { // if the length of the keys is equal to the total count of the keys, return the number of moves to get here.
        return moves;
      }
      for (var [x, y] of directions) {
        let newX = row + x, newY = col + y;
        if (newX < 0 || newX >= m || newY < 0 || newY >= n) continue; // out of bounds, skip.
        if (grid[newX][newY] >= 'A' && grid[newX][newY] <= 'G') { // lock: if we have the key for this lock, we can go to this cell.
          if (keys.includes(grid[newX][newY].toLowerCase())) next.push([newX, newY, keys]);
        } else if (grid[newX][newY] >= 'a' && grid[newX][newY] <= 'g') next.push([newX, newY, keys]); 
        else if (grid[newX][newY] !== '#') next.push([newX, newY, keys]);
      }
    }
    queue = next;
    moves++;
  }
  return -1;
};

// Four test cases to run function on
console.log(shortestPathAllKeys(["@...a",".###A","b.BCc"])) // 10
console.log(shortestPathAllKeys(["@.a.#","###.#","b.A.B"])) // 8
console.log(shortestPathAllKeys(["@..aA","..B#.","....b"])) // 6
console.log(shortestPathAllKeys(["@Aa"])) // -1