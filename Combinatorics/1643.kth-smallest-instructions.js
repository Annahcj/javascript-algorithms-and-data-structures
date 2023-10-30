// 1643. Kth Smallest Instructions
// Bob is standing at cell (0, 0), and he wants to reach destination: (row, column). He can only travel right and down. You are going to help Bob by providing instructions for him to reach destination.
// The instructions are represented as a string, where each character is either:
  // 'H', meaning move horizontally (go right), or
  // 'V', meaning move vertically (go down).
// Multiple instructions will lead Bob to destination. For example, if destination is (2, 3), both "HHHVV" and "HVHVH" are valid instructions.
// However, Bob is very picky. Bob has a lucky number k, and he wants the kth lexicographically smallest instructions that will lead him to destination. k is 1-indexed.
// Given an integer array destination and an integer k, return the kth lexicographically smallest instructions that will take Bob to destination.


// Solution: Combinatorics

// A path will always consist of the same amount of instructions: we must go right destination[1] number of times, and we must go down destination[0] number of times (because we can only move right or down).
// When we move down, we will be skipping past nCr(movesRemaining - 1, rowsRemaining) moves.
  // Note: nCr(movesRemaining - 1, rowsRemaining) === nCr(movesRemaining - 1, columnsRemaining)

// Move down while the nCr(movesRemaining - 1, rowsRemaining) > current k.

// Time Complexity: O((r + c)^2) 97ms
// Space Complexity: O(1) 46.1MB
var kthSmallestPath = function(destination, k) {
  let [row, col] = destination, res = "";
  for (let i = 0; i < destination[0] + destination[1]; i++) {
    let movesSkipped = nCr(row + col - 1, row); // the number of moves we skip past if we move down
    if (col === 0 || movesSkipped < k) { 
      row--;
      res += 'V';
      k -= movesSkipped;
    } else {
      col--;
      res += 'H';
    }
  }
  return res;
};

function nCr(n, r) {
  return Number(factorial(n) / (factorial(n - r) * factorial(r)));
}

function factorial(n) {
  n = BigInt(n);
  let ans = 1n;
  while (n > 1) {
    ans *= n;
    n--;
  }
  return BigInt(ans);
}

// Three test cases
console.log(kthSmallestPath([2,3], 1)) // "HHHVV"
console.log(kthSmallestPath([2,3], 2)) // "HHVHV"
console.log(kthSmallestPath([2,3], 3)) // "HHVVH"