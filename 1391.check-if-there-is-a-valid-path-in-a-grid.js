// 1391. Check if There is a Valid Path in a Grid
// You are given an m x n grid. Each cell of grid represents a street. The street of grid[i][j] can be:
  // 1 which means a street connecting the left cell and the right cell.
  // 2 which means a street connecting the upper cell and the lower cell.
  // 3 which means a street connecting the left cell and the lower cell.
  // 4 which means a street connecting the right cell and the lower cell.
  // 5 which means a street connecting the left cell and the upper cell.
  // 6 which means a street connecting the right cell and the upper cell.
// You will initially start at the street of the upper-left cell (0, 0). A valid path in the grid is a path that starts from the upper left cell (0, 0) and ends at the bottom-right cell (m - 1, n - 1). The path should only follow the streets.
// Notice that you are not allowed to change any street.
// Return true if there is a valid path in the grid or false otherwise.


// Solution: BFS

// Each street can be used to go to two different directions.
// We can only go to a next street if the directions are the same or same in the half we are traveling to (e.g: right -> right/down or down -> down/left)
// Map out each of these directions in a hashmap for easy access.
  // map[direction] = [val to add to row, val to add to column, values we are allowed to travel to depending on the direction]
  // directionsMap[val] = directions we can go depending on the value 

// Use bfs to efficiently check whether a valid path exists.
// Keep track of cells we have seen to avoid revisiting.

// Time Complexity: O(mn) 309ms
// Space Complexity: O(mn) 60.7MB
var hasValidPath = function(grid) {
  const map = {
    left: [0, -1, [1, 4, 6]],
    right: [0, 1, [1, 3, 5]],
    down: [1, 0, [2, 5, 6]],
    up: [-1, 0, [2, 3, 4]]
  };
  const directionsMap = {
    1: ['left', 'right'],
    2: ['down', 'up'],
    3: ['left', 'down'],
    4: ['right', 'down'],
    5: ['left', 'up'],
    6: ['right', 'up']
  };
  let m = grid.length, n = grid[0].length;
  let seen = Array(m).fill(0).map(() => Array(n).fill(0));
  let queue = [[0, 0]];
  seen[0][0] = 1;

  while (queue.length) {
    let [row, col] = queue.shift();
    if (row === m - 1 && col === n - 1) return true;
    let directions = directionsMap[grid[row][col]];
    for (let direction of directions) {
      let [x, y, allowedStreets] = map[direction];
      let newX = row + x, newY = col + y;
      if (newX < 0 || newX >= m || newY < 0 || newY >= n || seen[newX][newY]) continue; // out of bounds
      if (seen[newX][newY] || !allowedStreets.includes(grid[newX][newY])) continue; // already visited or street value cannot be accessed from the current street
      seen[newX][newY] = 1;
      queue.push([newX, newY]);
    }
  }
  return false;
};

// Three test cases
console.log(hasValidPath([[2,4,3],[6,5,2]])) // true
console.log(hasValidPath([[1,2,1],[1,2,1]])) // false
console.log(hasValidPath([[1,1,2]])) // false