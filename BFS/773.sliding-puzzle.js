// 773. Sliding Puzzle
// On an 2 x 3 board, there are five tiles labeled from 1 to 5, and an empty square represented by 0. A move consists of choosing 0 and a 4-directionally adjacent number and swapping it.
// The state of the board is solved if and only if the board is [[1,2,3],[4,5,0]].
// Given the puzzle board board, return the least number of moves required so that the state of the board is solved. If it is impossible for the state of the board to be solved, return -1.


// Solution: BFS

// Level by level bfs so that know the number of swaps made.
// Try to swap the zero with all positions in the four directions.
// To avoid an infinite loop, we use a set to track which states we have already been in.
// Note: We also keep track of the row and column the 0 is currently in so we don't have to search for it each time.

// Time Complexity: O(mn * (mn)!) (all possible states of the board) 88ms
// Space Complexity: O(mn * (mn)!) 44.9MB
var slidingPuzzle = function(board) {
  const directions = [[-1, 0], [0, 1], [1, 0], [0, -1]];
  let queue = [];
  for (var i = 0; i < 2; i++) {
    for (var j = 0; j < 3; j++) {
      if (board[i][j] !== 0) continue;
      queue.push([i, j, `${board[0].join("")},${board[1].join("")}`]);
    }
  }
  
  let solvedState = '123,450';
  let swaps = 0, seen = new Set();
  while (queue.length) {
    let size = queue.length;
    for (var i = 0; i < size; i++) {
      let [row, col, state] = queue.shift();
      if (state === solvedState) return swaps;

      for (var [x, y] of directions) {
        let newX = row + x, newY = col + y;
        if (newX < 0 || newX >= 2 || newY < 0 || newY >= 3) continue;

        let stateBoard = state.split(",");
        stateBoard[0] = stateBoard[0].split(""), stateBoard[1] = stateBoard[1].split("");
        stateBoard[row][col] = stateBoard[newX][newY];
        stateBoard[newX][newY] = '0';
        
        let newState = `${stateBoard[0].join("")},${stateBoard[1].join("")}`;

        if (seen.has(newState)) continue;
        queue.push([newX, newY, newState]);
        seen.add(newState);
      }
    }
    swaps++;
  }
  return -1;
};

// Four test cases to run function on
console.log(slidingPuzzle([[1,2,3],[4,0,5]])) // 1
console.log(slidingPuzzle([[1,2,3],[5,4,0]])) // -1
console.log(slidingPuzzle([[4,1,2],[5,0,3]])) // 5
console.log(slidingPuzzle([[3,2,4],[1,5,0]])) // 14