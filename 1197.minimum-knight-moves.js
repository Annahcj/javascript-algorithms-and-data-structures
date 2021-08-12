// 1197. Minimum Knight Moves
// In an infinite chess board with coordinates from -infinity to +infinity, you have a knight at square [0, 0].
// A knight has 8 possible moves it can make, as illustrated below. Each move is two squares in a cardinal direction, then one square in an orthogonal direction.
// Return the minimum number of steps needed to move the knight to the square [x, y].  It is guaranteed the answer exists.


// Solution: BFS with Optimizations

// Logic:
// We start at the origin (0, 0), then put it in a queue.
// For every point, we go in the eight directions of a knight while keeping track of how many moves we have made.
// When we reach our target, return the number of moves.
// Firstly, one important thing to note is that all four quadrants will be symmetric, so the number of moves to a given point will always be the same regardless of which quadrant it is in.
// With this in mind, we can simply narrow the search to the 1st quadrant only by turning x, y into positives.
// We also keep a 'visited' map which keeps track of where we have been so that we don't check the same point more than once.
// Another optimization is making sure we don't go out of the first quadrant, making sure the coordinates are bigger than or equal to -1. (first quadrant is all positive)
// Lastly, instead of using .shift (O(n)) every time, we can use .pop and can keep another temporary queue 'next' which will contain all points of a level. When we have finished with a level, simply change the queue to next.

// Algorithm:
// Moves: [[1, 2], [2, 1], [2, -1], [1, -2], [-1, -2], [-2, -1], [-2, 1], [-1, 2]] in clockwise order
// Set queue to [[0, 0]]
// Change x to Math.abs(x), y to Math.abs(y) (search in only 1st quadrant)
// Keep a visited map and level.
// Loop while queue is not empty
  // Create another queue 'next'
  // Loop while queue is not empty
    // Set curr to queue.pop
    // If we have reached the target, return level.
    // If we haven't been to [curr[0], curr[1]] before AND coordinates are bigger than or equal to -1
      // Mark [curr[0], [curr[1]]] as visited
      // Loop through each move in moves
        // Push [curr[0] + move[0], curr[1] + move[1]] to next
  // When we have finished with this level, set queue to next.
  // Increment level by one

// Runtime on LeetCode: 2756 ms
// Memory Usage on LeetCode: 64.6MB
  var minKnightMoves = function(x, y) {
    let moves = [[1, 2], [2, 1], [2, -1], [1, -2], [-1, -2], [-2, -1], [-2, 1], [-1, 2]];
    let queue = [[0, 0]];
    x = Math.abs(x), y = Math.abs(y);
    let visited = {}, level = 0;
    while (queue.length) {
      let next = [];
      while (queue.length) {
        let curr = queue.pop();
        if (curr[0] === x && curr[1] === y) return level;
        if (!visited[[curr[0], curr[1]]] && curr[0] >= -1 && curr[1] >= -1) {
          visited[[curr[0], curr[1]]] = true;
          for (var move of moves) {
            next.push([curr[0] + move[0], curr[1] + move[1]]);
          }
        }
      }
      queue = next;
      level++;
    }
  };
  // Two test cases to run function on
  console.log(minKnightMoves(2, 1)) // 1
  console.log(minKnightMoves(5, 5)) // 4 