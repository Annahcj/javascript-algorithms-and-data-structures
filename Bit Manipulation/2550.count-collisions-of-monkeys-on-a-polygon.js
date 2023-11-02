// 2550. Count Collisions of Monkeys on a Polygon
// There is a regular convex polygon with n vertices. The vertices are labeled from 0 to n - 1 in a clockwise direction, and each vertex has exactly one monkey.
// Each monkey moves simultaneously to a neighboring vertex. A neighboring vertex for a vertex i can be:
  // the vertex (i + 1) % n in the clockwise direction, or
  // the vertex (i - 1 + n) % n in the counter-clockwise direction.
// A collision happens if at least two monkeys reside on the same vertex after the movement.
// Return the number of ways the monkeys can move so that at least one collision happens. Since the answer may be very large, return it modulo 109 + 7.
// Note that each monkey can only move once.


// Solution: Fast Pow w/ Modulo

// Let's think of the number of collisions where there are no collisions, then we can return total number of collisions - no collisions.
// There are only two cases where there will be no collisions:
  // 1. If all monkeys move in anti-clockwise direction.
  // 2. If all monkeys move in clockwise direction.
// The answer is 2^n - 2.

// e.g: n = 22
// 22 in binary = 10110

// 16 8 4 2 1
//  1 0 1 1 0

// = 2^16 * 2^4 * 2^2 = 2^22

// For each 1-bit in the binary representation of n, we multiply our answer by the current state of x.
// At each iteration, multiply x by itself: 2 -> 2^2 -> 2^4 -> 2^8 -> 2^16 -> ...

// Time Complexity: O(log(n)) 79ms
// Space Complexity: O(1) 41.9MB
var monkeyMove = function(n) {
  let MOD = 1000000007n;
  let x = 2n, ans = 1n;
  while (n > 0) {
    if (n & 1) {
      ans = (ans * x) % MOD;
    }
    x = (x * x) % MOD;
    n >>= 1;
  }
  return (ans - 2n + MOD) % MOD;
};

// Two test cases
console.log(monkeyMove(3)) // 6
console.log(monkeyMove(4)) // 14