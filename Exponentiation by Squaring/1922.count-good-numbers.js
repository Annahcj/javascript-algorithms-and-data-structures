// 1922. Count Good Numbers
// A digit string is good if the digits (0-indexed) at even indices are even and the digits at odd indices are prime (2, 3, 5, or 7).
  // For example, "2582" is good because the digits (2 and 8) at even positions are even and the digits (5 and 2) at odd positions are prime. However, "3245" is not good because 3 is at an even index but is not even.
// Given an integer n, return the total number of good digit strings of length n. Since the answer may be large, return it modulo 109 + 7.
// A digit string is a string consisting of digits 0 through 9 that may contain leading zeros


// Solution: Combinatorics & Fast Pow

// Even indices:
  // There are ceil(n / 2) even indices.
  // At every even index, there are five choices (0, 2, 4, 6, 8).
  // 5^(ceil(n / 2)).
// Odd indices:
  // There are floor(n / 2) odd indices.
  // At every odd index, there are four choices (2, 3, 5, 7).
  // 4^(floor(n / 2)).

// Use fast pow to efficiently calculate the powers of 4 and 5, by going up in powers of 2.
// For each iteration, double the powers of 4 and 5 by itself. 
// Use the bit representation of ceil(n / 2) and floor(n / 2) to find the total powers of 4 and 5.
// Multiply them together and return the answer modulo 10^9 + 7.

// Time Complexity: O(log(n)) 1ms
// Space Complexity: O(1) 56.8MB
function countGoodNumbers(n) {
  const odd = BigInt(Math.floor(n / 2)), even = BigInt(Math.ceil(n / 2));
  const log2 = Math.floor(Math.log2(Math.ceil(n / 2)));
  const MOD = 1000000007n;
  let powFour = 4n, powFive = 5n;
  let pow = 1n;
  for (let i = 0; i <= log2; i++) {
    if (odd & (1n << BigInt(i))) {
      pow = (pow * powFour) % MOD;
    }
    if (even & (1n << BigInt(i))) {
      pow = (pow * powFive) % MOD;
    }
    powFour = (powFour * powFour) % MOD;
    powFive = (powFive * powFive) % MOD;
  }
  return parseInt(pow);
};

// Three test cases
console.log(countGoodNumbers(1)) // 5
console.log(countGoodNumbers(4)) // 400
console.log(countGoodNumbers(50)) // 564908303