// 2119. A Number After a Double Reversal
// Reversing an integer means to reverse all its digits.
  // For example, reversing 2021 gives 1202. Reversing 12300 gives 321 as the leading zeros are not retained.
// Given an integer num, reverse num to get reversed1, then reverse reversed1 to get reversed2. Return true if reversed2 equals num. Otherwise return false.


// Solution: Check Whether Number has Zeroes at End

// If the number has zeros at the end, the answer must be false.
// The special case is 0, where the answer is true.

// Time Complexity: O(1) 76ms
// Space Complexity: O(1) 39.1MB
var isSameAfterReversals = function(num) {
  return num === 0 || num % 10 !== 0;
};

// Three test cases
console.log(isSameAfterReversals(526)) // true
console.log(isSameAfterReversals(1800)) // false
console.log(isSameAfterReversals(0)) // true