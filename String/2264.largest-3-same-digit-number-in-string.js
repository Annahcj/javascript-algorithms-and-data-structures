// 2264. Largest 3-Same-Digit Number in String
// You are given a string num representing a large integer. An integer is good if it meets the following conditions:
  // It is a substring of num with length 3.
  // It consists of only one unique digit.
// Return the maximum good integer as a string or an empty string "" if no such integer exists.
// Note:
  // A substring is a contiguous sequence of characters within a string.
  // There may be leading zeroes in num or a good integer.


// Solution: Check Each Length 3 Substring

// Check each length 3 substring.
// If all three digits are equal, compare it with the max.

// Time Complexity: O(n) 72ms
// Space Complexity: O(1) 44.3MB
var largestGoodInteger = function(num) {
  let max = -Infinity, res = "";
  for (let i = 0; i < num.length - 2; i++) {
    let str = num.slice(i, i + 3);
    if (num[i] === num[i + 1] && num[i + 1] === num[i + 2]) {
      if (+str > max) {
        res = str;
        max = +str;
      }
    }
  }  
  return res;
};

// Three test cases
console.log(largestGoodInteger("6777133339")) // "777"
console.log(largestGoodInteger("2300019")) // "000"
console.log(largestGoodInteger("42352338")) // ""