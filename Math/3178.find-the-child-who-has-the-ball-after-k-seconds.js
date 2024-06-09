// 3178. Find the Child Who Has the Ball After K Seconds
// You are given two positive integers n and k. There are n children numbered from 0 to n - 1 standing in a queue in order from left to right.
// Initially, child 0 holds a ball and the direction of passing the ball is towards the right direction. After each second, the child holding the ball passes it to the child next to them. Once the ball reaches either end of the line, i.e. child 0 or child n - 1, the direction of passing is reversed.
// Return the number of the child who receives the ball after k seconds.


// Solution: Math

// 1. Get the "round" number: Math.floor(k / (n - 1)). This determines the direction.
  // If the round number is even, the direction is left-to-right.
  // If the round number is odd, the direction is right-to-left.

// 2. Use modulo to get the number of moves in the last round: k % (n - 1)

// 3. Based on the direction and number of moves in the last round, calculate the position.
  // left-to-right: Return number of moves in last round
  // right-to-left: Return (n - 1) - number of moves in last round

// Time Complexity: O(1) 67ms
// Space Complexity: O(1) 49.7MB
var numberOfChild = function(n, k) {
  const roundNumber = Math.floor(k / (n - 1));
  const movesInLastRound = k % (n - 1);
  return roundNumber % 2 === 0 ? movesInLastRound : n - movesInLastRound - 1;
};

// Three test cases
console.log(numberOfChild(3, 5)) // 1
console.log(numberOfChild(5, 6)) // 2
console.log(numberOfChild(4, 2)) // 2