// 2427. Number of Common Factors
// Given two positive integers a and b, return the number of common factors of a and b.
// An integer x is a common factor of a and b if x divides both a and b.


// Solution: Brute Force

// Time Complexity: O(min(a, b)) 104ms
// Space Complexity: O(1) 41.9MB
var commonFactors = function(a, b) {
  let ans = 0;
  for (let i = 0; i <= Math.min(a, b); i++) {
    if (a % i === 0 && b % i === 0) ans++;
  }
  return ans;
};

// Two test cases
console.log(commonFactors(12, 6)) // 4
console.log(commonFactors(25, 30)) // 2