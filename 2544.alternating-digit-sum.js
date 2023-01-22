// 2544. Alternating Digit Sum
// You are given a positive integer n. Each digit of n has a sign according to the following rules:
  // The most significant digit is assigned a positive sign.
  // Each other digit has an opposite sign to its adjacent digits.
// Return the sum of all digits with their corresponding sign.


// Solution 1: Convert to String

// Convert n to a string, then go through digit by digit from front to back.

// Time Complexity: O(log(n)) 87ms
// Space Complexity: O(log(n)) 42.2MB
var alternateDigitSum = function(n) {
  n = n.toString();
  let sum = 0;
  for (let i = 0; i < n.length; i++) {
    let digit = Number(n[i]);
    sum += i % 2 === 0 ? digit : -digit;
  }
  return sum;
};


// Solution 2: Reverse, Modulo 10

// Reverse n by using modulo 10.
// Then, process the reversed n from back to front,
  // Use modulo 10 to get the last digit.
  // Set n to be Math.floor(n / 10) to remove the last digit.

// Time Complexity: O(log(n)) 61ms
// Space Complexity: O(log(n)) 42.5MB
var alternateDigitSum = function(n) {
  n = reverse(n);
  let sum = 0, positive = true;
  while (n > 0) {
    let digit = n % 10;
    sum += positive ? digit : -digit;
    positive = !positive;
    n = Math.floor(n / 10);
  }
  return sum;
};

function reverse(num) {
  let reversed = 0;
  while (num > 0) {
    let digit = num % 10;
    reversed = reversed * 10 + digit;
    num = Math.floor(num / 10);
  }
  return reversed;
}

// Three test cases
console.log(alternateDigitSum(521)) // 4
console.log(alternateDigitSum(111)) // 1
console.log(alternateDigitSum(886996)) // 0