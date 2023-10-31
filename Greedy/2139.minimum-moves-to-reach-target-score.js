// 2139. Minimum Moves to Reach Target Score
// You are playing a game with integers. You start with the integer 1 and you want to reach the integer target.
// In one move, you can either:
  // Increment the current integer by one (i.e., x = x + 1).
  // Double the current integer (i.e., x = 2 * x).
// You can use the increment operation any number of times, however, you can only use the double operation at most maxDoubles times.
// Given the two integers target and maxDoubles, return the minimum number of moves needed to reach target starting with 1.


// Solution: Greedy Approach

// Go backwards from target to 1.
// It is always optimal to divide by 2 as QUICKLY as possible.
// Otherwise, subtract by 1 to turn it into an even number.

// Time Complexity: O(log(n)) 112ms
// Space Complexity: O(1) 38.4MB
var minMoves = function(target, maxDoubles) {
  let moves = 0;
  while (target > 1 && maxDoubles > 0) {
    if (target % 2 === 0) {
      target /= 2;
      moves++;
      maxDoubles--;
    } else {
      target--;
      moves++;
    }
  }
  return moves + target - 1; // when we can't divide by 2 anymore, get the number of moves by subtracting 1.
};

// Three test cases
console.log(minMoves(5, 0)) // 4
console.log(minMoves(19, 2)) // 7
console.log(minMoves(10, 4)) // 4