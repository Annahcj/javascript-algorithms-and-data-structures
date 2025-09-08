// 1317. Convert Integer to the Sum of Two No-Zero Integers
// No-Zero integer is a positive integer that does not contain any 0 in its decimal representation.
// Given an integer n, return a list of two integers [a, b] where:
  // a and b are No-Zero integers.
  // a + b = n
// The test cases are generated so that there is at least one valid solution. If there are many valid solutions, you can return any of them.


// Solution: Brute Force

// Time Complexity: O(n) 1ms
// Space Complexity: O(1) 54MB
function getNoZeroIntegers(n) {
  for (let i = 1; i <= n / 2; i++) {
    if (!containsZero(i) && !containsZero(n - i)) {
      return [i, n - i];
    }
  }
};

function containsZero(num) {
  while (num > 0) {
    if (num % 10 === 0) {
      return true;
    }
    num = Math.floor(num / 10);
  }
  return false;
}

// Two test cases
console.log(getNoZeroIntegers(2)) // [1,1]
console.log(getNoZeroIntegers(11)) // [2,9]