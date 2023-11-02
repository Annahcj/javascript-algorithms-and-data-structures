// 2660. Determine the Winner of a Bowling Game
// You are given two 0-indexed integer arrays player1 and player2, that represent the number of pins that player 1 and player 2 hit in a bowling game, respectively.
// The bowling game consists of n turns, and the number of pins in each turn is exactly 10.
// Assume a player hit xi pins in the ith turn. The value of the ith turn for the player is:
  // 2xi if the player hit 10 pins in any of the previous two turns.
  // Otherwise, It is xi.
// The score of the player is the sum of the values of their n turns.
// Return
  // 1 if the score of player 1 is more than the score of player 2,
  // 2 if the score of player 2 is more than the score of player 1, and
  // 0 in case of a draw.


// Solution: Follow the instructions and calculate the running sum of the score in player1 and player2.

// Time Complexity: O(n) 71ms
// Space Complexity: O(1) 45MB
var isWinner = function(player1, player2) {
  let n = player1.length, score1 = 0, score2 = 0;
  for (let i = 0; i < n; i++) {
    score1 += isDoubleScore(player1, i) ? 2 * player1[i] : player1[i];
    score2 += isDoubleScore(player2, i) ? 2 * player2[i] : player2[i];
  }
  if (score1 === score2) return 0;
  return score1 > score2 ? 1 : 2;
  
  function isDoubleScore(player, i) {
    return (i > 0 && player[i - 1] === 10) || (i > 1 && player[i - 2] === 10);
  }
};

// Two test cases
console.log(isWinner([4,10,7,9], [6,5,2,3])) // 1
console.log(isWinner([3,5,7,6], [8,10,10,2])) // 2