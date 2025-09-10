// 1317. Convert Integer to the Sum of Two No-Zero Integers
// No-Zero integer is a positive integer that does not contain any 0 in its decimal representation.
// Given an integer n, return a list of two integers [a, b] where:
  // a and b are No-Zero integers.
  // a + b = n
// The test cases are generated so that there is at least one valid solution. If there are many valid solutions, you can return any of them.


// Solution 1: Brute Force

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


// Solution 2: Logic

// Handle each digit one-by-one from right-to-left.
// For each digit d,
  // If in between 2-9, we can always split it using a = 1, b = d-1
  // If 0, we treat it as 10 and borrow 1 from the left side: Split a = 1, b = 9.
  // If 1, we treat it as 11 and borrow 1 from the left side: Split a = 2, b = 9.

// Time Complexity: O(log(n)) 0ms
// Space Complexity: O(1) 54MB
function getNoZeroIntegers(n) {
  let a = 0, b = 0;
  let m = 1;
  while (n > 0) {
    const digit = n % 10;
    if (digit === 0) {
      a += m;
      b += 9 * m;
      n = Math.floor(n / 10) - 1; // borrow 1 from left side
    } else if (digit === 1 && n !== 1) {
      a += 2 * m;
      b += 9 * m;
      n = Math.floor(n / 10) - 1; // borrow 1 from left side
    } else {
      a += m;
      b += (digit - 1) * m;
      n = Math.floor(n / 10);
    }
    m *= 10;
  }
  return [a, b];
};

// Two test cases
console.log(getNoZeroIntegers(2)) // [1,1]
console.log(getNoZeroIntegers(11)) // [2,9]