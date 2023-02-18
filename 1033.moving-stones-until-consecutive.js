// 1033. Moving Stones Until Consecutive
// There are three stones in different positions on the X-axis. You are given three integers a, b, and c, the positions of the stones.
// In one move, you pick up a stone at an endpoint (i.e., either the lowest or highest position stone), and move it to an unoccupied position between those endpoints. Formally, let's say the stones are currently at positions x, y, and z with x < y < z. You pick up the stone at either position x or position z, and move that stone to an integer position k, with x < k < z and k != y.
// The game ends when you cannot make any more moves (i.e., the stones are in three consecutive positions).
// Return an integer array answer of length 2 where:
  // answer[0] is the minimum number of moves you can play, and
  // answer[1] is the maximum number of moves you can play.


// Solution: Greedy

// Minimum moves:
  // If two stones' positions have a difference <= 2, we only need 1 move.
    // Difference of 2: Put stone in between
      // e.g: a = 1, b = 4, c = 6
      // Put a in between b and c: b = 4, a = 5, c = 6
    // Difference of 1: Put stone on the left
      // e.g: a = 1, b = 4, c = 5
      // Put a on the left side of b: a = 3, b = 4, c = 5
  // Otherwise, we will need 2 moves to move the two outer stones next to the middle stone.

// Maximum moves:
  // Move the first and last stone incrementally towards the middle stone: mid position - first position + last position - mid position.

// Time Complexity: O(1) 61ms
// Space Complexity: O(1) 42.4MB
var numMovesStones = function(a, b, c) {
  let stones = [a, b, c].sort((a, b) => a - b);
  if (stones[1] - stones[0] === 1 && stones[2] - stones[1] === 1) return [0, 0];
  let minDiff = Math.min(stones[1] - stones[0], stones[2] - stones[1]);
  let minMoves = minDiff <= 2 ? 1 : 2;
  let maxMoves = stones[2] - stones[1] + stones[1] - stones[0] - 2;
  return [minMoves, maxMoves];
};

// Three test cases
console.log(numMovesStones(1, 2, 5)) // [1,2]
console.log(numMovesStones(4, 3, 2)) // [0,0]
console.log(numMovesStones(3, 5, 1)) // [1,2]