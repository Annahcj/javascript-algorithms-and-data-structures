// 869. Reordered Power of 2
// You are given an integer n. We reorder the digits in any order (including the original order) such that the leading digit is not zero.
// Return true if and only if we can do this so that the resulting number is a power of two.


// Solution: Count Occurances of Digits

// Generating all powers of 2 will be a significant amount less than generating each permutation of the digits in n.
// There are 32 bits in a number, which means there are a maximum of 32 powers of 2 we need to compare with n.

// Go through each power of 2, if the occurances of each digit in n matches the occurances of each digit in a power of 2, return true.

// Time Complexity: O(log(n)) 72ms
// Space Complexity: O(1) 42.5MB
var reorderedPowerOf2 = function(n) {
  let count = getDigitCounts(n), pow = 1;
  for (let i = 0; i < 32; i++) {
    let powCount = getDigitCounts(pow);
    let isMatch = true;
    for (let i = 0; i < 10; i++) {
      if (count[i] !== powCount[i]) {
        isMatch = false;
        break;
      }
    }
    if (isMatch) return true;
    pow *= 2;
  }
  return false;
  
  function getDigitCounts(num) {
    let count = Array(10).fill(0);
    if (num === 0) count[0]++;
    while (num > 0) {
      count[num % 10]++;
      num = Math.floor(num / 10);
    }
    return count;
  }
};

// Three test cases
console.log(reorderedPowerOf2(1)) // true
console.log(reorderedPowerOf2(10)) // false
console.log(reorderedPowerOf2(23)) // true