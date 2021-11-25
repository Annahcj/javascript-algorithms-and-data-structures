// 286. Walls and Gates
// You are given an m x n grid rooms initialized with these three possible values.
  // -1 A wall or an obstacle.
  // 0 A gate.
  // INF Infinity means an empty room. We use the value 231 - 1 = 2147483647 to represent INF as you may assume that the distance to a gate is less than 2147483647.
// Fill each empty room with the distance to its nearest gate. If it is impossible to reach a gate, it should be filled with INF.


// Solution: BFS from Gates

// We BFS from all the gates at the same time.
// When we each an empty room, we mark that cell as the distance, thus we will not be visiting that cell again.

// 1. Add each gate to the queue.
// 2. BFS from each gate to all empty rooms

// Note: To avoid using the O(n) shift operation, we store each level in a next array, which we then assign back to queue after the queue is emptied.

// Time Complexity: O(nm) 155ms
// Space Complexity: O(nm) 46.4MB
var wallsAndGates = function(rooms) {
  const directions = [[0, 1], [1, 0], [0, -1], [-1, 0]];
  let queue = [];
  let n = rooms.length, m = rooms[0].length;
  for (var i = 0; i < n; i++) {
    for (var j = 0; j < m; j++) {
      if (rooms[i][j] === 0) {
        queue.push([i, j]); // add each gate to the queue
      }
    }
  }
  while (queue.length) {
    let next = [];
    while (queue.length) {
      let [row, col] = queue.pop();
      for (var [x, y] of directions) {
        let newX = row + x, newY = col + y;
        // if out of bounds or new cell is not empty, skip.
        if (newX < 0 || newX >= n || newY < 0 || newY >= m || rooms[newX][newY] !== 2147483647) continue;
        rooms[newX][newY] = rooms[row][col] + 1; // setting it to a distance value will essentially mark it as visited because it will not be empty anymore.
        next.push([newX, newY]);
      } 
    }
    queue = next;
  }
  return rooms;
};

// A test case to run function on
console.log(wallsAndGates([[2147483647,-1,0,2147483647],[2147483647,2147483647,2147483647,-1],[2147483647,-1,2147483647,-1],[0,-1,2147483647,2147483647]])) // [[3,-1,0,1],[2,2,1,-1],[1,-1,2,-1],[0,-1,3,4]]