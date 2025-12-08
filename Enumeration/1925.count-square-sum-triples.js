// 1925. Count Square Sum Triples
// A square triple (a,b,c) is a triple where a, b, and c are integers and a^2 + b^2 = c^2.
// Given an integer n, return the number of square triples such that 1 <= a, b, c <= n.


// Solution: Enumeration

// Enumerate every pair (a, b) where a^2 + b^2 <= n.
// For each pair, check whether sqrt(a^2 + b^2) is an integer, if it is, count it as a valid triplet.

// Time Complexity: O(n^2) 4ms
// Space Complexity: O(1) 57MB
function countTriples(n) {
  let triplets = 0;
  for (let a = 1; a <= n; a++) {
    for (let b = a; Math.sqrt((a * a) + (b * b)) <= n; b++) {
      const c = Math.sqrt((a * a) + (b * b));
      if (c === Math.floor(c)) {
        triplets += a === b ? 1 : 2;
      }
    }
  }
  return triplets;
};

// Two test cases
console.log(countTriples(5)) // 2
console.log(countTriples(10)) // 4