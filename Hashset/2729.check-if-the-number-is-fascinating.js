// 2729. Check if The Number is Fascinating
// You are given an integer n that consists of exactly 3 digits.
// We call the number n fascinating if, after the following modification, the resulting number contains all the digits from 1 to 9 exactly once and does not contain any 0's:
  // Concatenate n with the numbers 2 * n and 3 * n.
// Return true if n is fascinating, or false otherwise.
// Concatenating two numbers means joining them together. For example, the concatenation of 121 and 371 is 121371.


// Solution: Hashset 

// Add the digits from n, n*2, and n*3 into a set.
// If the set already contains the digit or the digit is 0, return false.

// Time Complexity: O(1) 66ms
// Space Complexity: O(1) 44MB
var isFascinating = function(n) {
  let digits = new Set();
  return canConcatNum(n) && canConcatNum(n * 2) && canConcatNum(n * 3);  
  
  function canConcatNum(num) {
    while (num > 0) {
      let digit = num % 10;
      if (digit === 0 || digits.has(digit)) return false;
      digits.add(digit);
      num = Math.floor(num / 10);
    }
    return true;
  }
};

// Two test cases
console.log(isFascinating(192)) // true
console.log(isFascinating(100)) // false