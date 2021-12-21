// 909. Snakes and Ladders
// Return the least number of moves required to reach the square n2. If it is not possible to reach the square, return -1.


// Solution: BFS

// Level by level bfs while keeping track of the number of moves each level.

// Formula for row and column based on number:
// e.g: n = 6, idx/number = 7
  // row: n - 1 - Math.floor((idx - 1) / n): 5 - Math.floor(6 / 6) = 5 - 1 = 4
  // column: from bottom up, if the row is
    // even: (idx - 1) % n
    // odd: n - 1 - ((idx - 1) % n)

// Time Complexity: O(n^2) 88ms
// Space Complexity: O(n^2) 41.3MB
var snakesAndLadders = function(board) {
  let queue = [1], moves = 0;
  let n = board.length, seen = Array(n * n + 1).fill(0);
  while (queue.length) {
    let next = [];
    while (queue.length) {
      let pos = queue.pop();
      if (pos === n * n) return moves;
      for (var idx = pos + 1; idx <= Math.min(n * n, pos + 6); idx++) {
        let row = Math.floor((idx - 1) / n), col = row % 2 === 0 ? (idx - 1) % n : n - 1 - ((idx - 1) % n);
        let nextPos = idx;
        if (board[n - 1 - row][col] > -1) nextPos = board[n - 1 - row][col];
        if (!seen[nextPos]) {
          next.push(nextPos);
          seen[nextPos] = 1;
        }
      }
    }
    moves++;
    queue = next;
  }  
};

// Two test cases to run function on
console.log(snakesAndLadders([[-1,-1,-1,-1,-1,-1],[-1,-1,-1,-1,-1,-1],[-1,-1,-1,-1,-1,-1],[-1,35,-1,-1,13,-1],[-1,-1,-1,-1,-1,-1],[-1,15,-1,-1,-1,-1]])) // 4
console.log(snakesAndLadders([[-1,-1],[-1,3]])) // 1