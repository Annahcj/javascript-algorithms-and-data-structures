// 1926. Nearest Exit from Entrance in Maze
// You are given an m x n matrix maze (0-indexed) with empty cells (represented as '.') and walls (represented as '+'). You are also given the entrance of the maze, where entrance = [entrancerow, entrancecol] denotes the row and column of the cell you are initially standing at.
// In one step, you can move one cell up, down, left, or right. You cannot step into a cell with a wall, and you cannot step outside the maze. Your goal is to find the nearest exit from the entrance. An exit is defined as an empty cell that is at the border of the maze. The entrance does not count as an exit.
// Return the number of steps in the shortest path from the entrance to the nearest exit, or -1 if no such path exists.


// Solution: BFS

// Level-by-level BFS from entrance to find the minimum number of steps to reach a border that is empty (an exit). 
// Note: In this solution, I used a matrix 'seen' to keep track of visited cells. This is to avoid modifying the input, but it takes extra O(mn) extra space. The alternative is to mark visited cells as '+', modifying the input.

// Time Complexity: O(mn) 236ms
// Space Complexity: O(mn) 53MB
var nearestExit = function(maze, entrance) {
  let m = maze.length, n = maze[0].length;
  let seen = Array(m).fill(0).map(() => Array(n).fill(0));
  const directions = [[-1, 0], [0, 1], [1, 0], [0, -1]];
  let queue = [entrance], steps = 0;
  seen[entrance[0]][entrance[1]] = 1;
  
  while (queue.length) {
    for (let i = queue.length; i > 0; i--) {
      let [row, col] = queue.shift();
      if (isExit(row, col)) return steps;
      for (let [x, y] of directions) {
        let newX = row + x, newY = col + y;
        if (newX < 0 || newX >= m || newY < 0 || newY >= n) continue; // out of bounds
        if (maze[newX][newY] === '+' || seen[newX][newY]) continue; // wall or already visited
        queue.push([newX, newY]);
        seen[newX][newY] = 1;
      }
    }  
    steps++;
  }
  return -1;
    
  function isExit(row, col) {
    if (row === entrance[0] && col === entrance[1]) return false; // entrance is not an exit
    return (row === 0 || row === m - 1 || col === 0 || col === n - 1) && maze[row][col] === '.';
  }
};

// Three test cases
console.log(nearestExit([["+","+",".","+"],[".",".",".","+"],["+","+","+","."]], [1,2])) // 1
console.log(nearestExit([["+","+","+"],[".",".","."],["+","+","+"]], [1,0])) // 2
console.log(nearestExit([[".","+"]], [0,0])) // -1