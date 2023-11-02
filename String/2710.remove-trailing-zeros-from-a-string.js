// 2710. Remove Trailing Zeros From a String
// Given a positive integer num represented as a string, return the integer num without trailing zeros as a string.


// Solution: 

// Find the index of the first trailing zero.
// Return the substring up to that index.

// Time Complexity: O(n) 74ms
// Space Complexity: O(n) 44.4MB
var removeTrailingZeros = function(num) {
  let endIndex = num.length - 1;
  while (num[endIndex] === '0') endIndex--;
  return num.slice(0, endIndex + 1);
};

// Two test cases
console.log(removeTrailingZeros("51230100")) // "512301"
console.log(removeTrailingZeros("123")) // "123"