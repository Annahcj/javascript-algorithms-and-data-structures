// 3021. Alice and Bob Playing Flower Game
// Alice and Bob are playing a turn-based game on a circular field surrounded by flowers. The circle represents the field, and there are x flowers in the clockwise direction between Alice and Bob, and y flowers in the anti-clockwise direction between them.
// The game proceeds as follows:
  // Alice takes the first turn.
  // In each turn, a player must choose either the clockwise or anti-clockwise direction and pick one flower from that side.
  // At the end of the turn, if there are no flowers left at all, the current player captures their opponent and wins the game.
// Given two integers, n and m, the task is to compute the number of possible pairs (x, y) that satisfy the conditions:
  // Alice must win the game according to the described rules.
  // The number of flowers x in the clockwise direction must be in the range [1,n].
  // The number of flowers y in the anti-clockwise direction must be in the range [1,m].
// Return the number of possible pairs (x, y) that satisfy the conditions mentioned in the statement.


// Solution: Math

// Alice wins with an odd number of flowers.
// Count all the combinations of creating an odd number.
  // x is odd, y is even.
  // x is even, y is odd.

// To find how many even numbers <= n: floor(n / 2)
  // e.g. n = 5 -> [2,4] -> floor(n / 2) = 2
  // e.g. n = 6 -> [2,4,6] -> floor(n / 2) = 3

// To find how many odd numbers <= n: ceil(n / 2)
  // e.g. n = 5 -> [1,3,5] -> ceil(n / 2) = 3
  // e.g. n = 6 -> [1,3,5] -> ceil(n / 2) = 3

// Time Complexity: O(1) 57ms
// Space Complexity: O(1) 49MB
var flowerGame = function(n, m) {
  let oddEven = countOdd(n) * countEven(m);
  let evenOdd = countEven(n) * countOdd(m);
  return oddEven + evenOdd;
};

function countOdd(x) {
  return Math.ceil(x / 2);
}

function countEven(x) {
  return Math.floor(x / 2);
}

// Two test cases
console.log(flowerGame(3, 2)) // 3
console.log(flowerGame(1, 1)) // 0