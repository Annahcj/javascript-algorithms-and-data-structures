// 3001. Minimum Moves to Capture The Queen
// There is a 1-indexed 8 x 8 chessboard containing 3 pieces.
// You are given 6 integers a, b, c, d, e, and f where:
  // (a, b) denotes the position of the white rook.
  // (c, d) denotes the position of the white bishop.
  // (e, f) denotes the position of the black queen.
// Given that you can only move the white pieces, return the minimum number of moves required to capture the black queen.
// Note that:
  // Rooks can move any number of squares either vertically or horizontally, but cannot jump over other pieces.
  // Bishops can move any number of squares diagonally, but cannot jump over other pieces.
  // A rook or a bishop can capture the queen if it is located in a square that they can move to.
  // The queen does not move.


// Solution: Greedy

// 1 move:
  // If the rook is in the same row or column as the queen, and is not blocked by the bishop.
  // If the bishop is in the same diagonal or anti-diagonal, and is not blocked by the rook.

// 2 moves: The rook can always reach the queen in two moves.
  // If the rook -> bishop -> queen is in the same row or column but the bishop is blocking, the bishop can move and the rook can reach the queen.
  // Otherwise, no matter where the queen or rook is on the board, the rook can always reach the queen in two moves.

// Time Complexity: O(1) 76ms
// Space Complexity: O(1) 43.6MB
var minMovesToCaptureTheQueen = function (a, b, c, d, e, f) {
  if (
    rookCanReachQueenInOneMove([a, b], [c, d], [e, f]) ||
    bishopCanReachQueenInOneMove([a, b], [c, d], [e, f])
  ) {
    return 1;
  }
  return 2;
};

function bishopCanReachQueenInOneMove(rook, bishop, queen) {
  // left to right diagonal (x - y)
  if (bishop[0] - bishop[1] === queen[0] - queen[1]) {
    if (bishop[0] - bishop[1] === rook[0] - rook[1] && (
      queen[0] < rook[0] && rook[0] < bishop[0] ||
      bishop[0] < rook[0] && rook[0] < queen[0]
    )) {
      return false;
    }
    return true;
  }

  // right to left diagonal (x + y)
  if (bishop[0] + bishop[1] === queen[0] + queen[1]) {
    if (bishop[0] + bishop[1] === rook[0] + rook[1] && (
      queen[0] < rook[0] && rook[0] < bishop[0] ||
      bishop[0] < rook[0] && rook[0] < queen[0]
    )) {
      return false;
    }
    return true;
  }
  
  return false;
}

function rookCanReachQueenInOneMove(rook, bishop, queen) {
  if (rook[0] === queen[0]) {
    // bishop is in between the rook and queen, either rook -> bishop -> queen OR queen -> bishop -> rook
    if (
      bishop[0] === rook[0] &&
      ((rook[1] < bishop[1] && bishop[1] < queen[1]) ||
        (queen[1] < bishop[1] && bishop[1] < rook[1]))
    ) {
      return false;
    }
    return true;
  }

  if (rook[1] === queen[1]) {
    // bishop is in between the rook and queen, either rook -> bishop -> queen OR queen -> bishop -> rook
    if (
      bishop[1] === rook[1] &&
      ((rook[0] < bishop[0] && bishop[0] < queen[0]) ||
        (queen[0] < bishop[0] && bishop[0] < rook[0]))
    ) {
      return false;
    }
    return true;
  }

  return false;
}

// Two test cases
console.log(minMovesToCaptureTheQueen(1, 1, 8, 8, 2, 3)) // 2
console.log(minMovesToCaptureTheQueen(5, 3, 3, 4, 5, 2)) // 1