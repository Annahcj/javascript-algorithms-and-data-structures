// 490. The Maze
// There is a ball in a maze with empty spaces (represented as 0) and walls (represented as 1). The ball can go through the empty spaces by rolling up, down, left or right, but it won't stop rolling until hitting a wall. When the ball stops, it could choose the next direction.
// Given the m x n maze, the ball's start position and the destination, where start = [startrow, startcol] and destination = [destinationrow, destinationcol], return true if the ball can stop at the destination, otherwise return false.
// You may assume that the borders of the maze are all walls (see examples).


// Solution: DFS

// For every position, traverse all four directions (up, right, down, left).
// Use a helper function 'traverse' to go as far as possible in a direction before hitting a wall.
// Keep a m x n visited matrix so that we don't visit the same cells more than once.

// Time Complexity: O(mn) 84ms
// Space Complexity: O(mn) 43.4MB
var hasPath = function(maze, start, destination) {
  let m = maze.length, n = maze[0].length;
  const directions = [[0, 1], [1, 0], [0, -1], [-1, 0]];
  let visited = Array(m).fill(0).map(() => Array(n).fill(0));
  return dfs(start[0], start[1]);

  function dfs(row, col) {
    visited[row][col] = 1;
    if (row === destination[0] && col === destination[1]) return true;
    for (var [x, y] of directions) {
      let [newX, newY] = traverse(row, col, x, y);
      if (!visited[newX][newY]) {
        if (dfs(newX, newY)) return true;
      }
    }
    return false;
  }

  function traverse(row, col, x, y) { 
    while (row + x >= 0 && row + x < m && col + y >= 0 && col + y < n && maze[row + x][col + y] !== 1) {
      row += x, col += y;
    }
    return [row, col];
  }
};

// Three test cases to run function on
console.log(hasPath([[0,0,1,0,0],[0,0,0,0,0],[0,0,0,1,0],[1,1,0,1,1],[0,0,0,0,0]], [0,4], [4,4])) // true
console.log(hasPath([[0,0,1,0,0],[0,0,0,0,0],[0,0,0,1,0],[1,1,0,1,1],[0,0,0,0,0]], [0,4], [3,2])) // false
console.log(hasPath([[0,0,0,0,0],[1,1,0,0,1],[0,0,0,0,0],[0,1,0,0,1],[0,1,0,0,0]], [4,3], [0,1])) // false