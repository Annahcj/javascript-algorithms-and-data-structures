// 2038. Remove Colored Pieces if Both Neighbors are the Same Color
// There are n pieces arranged in a line, and each piece is colored either by 'A' or by 'B'. You are given a string colors of length n where colors[i] is the color of the ith piece.
// Alice and Bob are playing a game where they take alternating turns removing pieces from the line. In this game, Alice moves first.
  // Alice is only allowed to remove a piece colored 'A' if both its neighbors are also colored 'A'. She is not allowed to remove pieces that are colored 'B'.
  // Bob is only allowed to remove a piece colored 'B' if both its neighbors are also colored 'B'. He is not allowed to remove pieces that are colored 'A'.
  // Alice and Bob cannot remove pieces from the edge of the line.
  // If a player cannot make a move on their turn, that player loses and the other player wins.
// Assuming Alice and Bob play optimally, return true if Alice wins, or return false if Bob wins.


// Solution: Greedy Logic

// Count the number of three of more consecutives for A's and B's.
// If there are more A's than B's, Alice wins. Otherwise Bob wins. 

// Time Complexity: O(n) 100ms
// Space Complexity: O(1) 45.2MB
var winnerOfGame = function(colors) {
  let a = 0, b = 0;
  for (let i = 1; i < colors.length - 1; i++) {
    if (colors[i] === colors[i - 1] && colors[i] === colors[i + 1]) {
      a += colors[i] === 'A' ? 1 : 0;
      b += colors[i] === 'B' ? 1 : 0;
    }
  }
  return a > b;
};

// Three test cases to run function on
console.log(winnerOfGame("AAABABB")) // true
console.log(winnerOfGame("AA")) // false
console.log(winnerOfGame("ABBBBBBBAAA")) // false