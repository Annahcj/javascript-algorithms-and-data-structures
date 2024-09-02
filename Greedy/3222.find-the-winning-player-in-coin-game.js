// 3222. Find the Winning Player in Coin Game
// You are given two positive integers x and y, denoting the number of coins with values 75 and 10 respectively.
// Alice and Bob are playing a game. Each turn, starting with Alice, the player must pick up coins with a total value 115. If the player is unable to do so, they lose the game.
// Return the name of the player who wins the game if both players play optimally.


// Solution: Greedy Logic

// Total value 115 = One of the 75 coin and four of the 10 coin.
// The number of 115s we can make = Math.min(x, Math.floor(y / 4)).
// If the number of 115s is odd, then Alice wins, otherwise Bob will win.

// Time Complexity: O(1) 69ms
// Space Complexity: O(1) 51.4MB
function losingPlayer(x, y) {
  return Math.min(x, Math.floor(y / 4)) % 2 === 1 ? 'Alice' : 'Bob';
};

// Two test cases
console.log(losingPlayer(2, 7)) // "Alice"
console.log(losingPlayer(4, 11)) // "Bob"