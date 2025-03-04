// 1780. Check if Number is a Sum of Powers of Three
// Given an integer n, return true if it is possible to represent n as the sum of distinct powers of three. Otherwise, return false.
// An integer y is a power of three if there exists an integer x such that y == 3^x.


// Solution: Brute Force

// For the maximum n (10^7), the maximum power of 3 is 3^14.
// Since the maximum power is small, we can use brute force to recursively try every state: 
  // For every (n, pow), increment pow by 1,
  // Either decide not to use the current power, or take it and subtract n by 3^pow.

// Time Complexity: O(2^log3(n)) 125ms
// Space Complexity: O(1) 53.84MB
function checkPowersOfThree(n, pow = 0) {
  if (n === 0) return true;
  if (3 ** pow > n) return false;
  return checkPowersOfThree(n, pow + 1) || checkPowersOfThree(n - 3 ** pow, pow + 1);
};

// Three test cases
console.log(checkPowersOfThree(12)) // true
console.log(checkPowersOfThree(91)) // true
console.log(checkPowersOfThree(21)) // false