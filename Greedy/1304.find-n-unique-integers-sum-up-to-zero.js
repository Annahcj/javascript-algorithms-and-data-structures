// 1304. Find N Unique Integers Sum up to Zero
// Given an integer n, return any array containing n unique integers such that they add up to 0.


// Solution: Positive-Negative Pairs

// If n is even, add n / 2 pairs of (1, -1), (2, -2), (3, -3)...
// If n is odd, add an extra 0.

// Time Complexity: O(n) 125ms
// Space Complexity: O(1) (not including output) 42.7MB
var sumZero = function(n) {
  let res = [], half = Math.floor(n / 2);
  for (let i = 0; i < half; i++) {
    res.push(i + 1);
    res.push(-i - 1);
  }
  if (n % 2 === 1) res.push(0);
  return res;
};