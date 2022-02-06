// 2165. Smallest Value of the Rearranged Number
// You are given an integer num. Rearrange the digits of num such that its value is minimized and it does not contain any leading zeros.
// Return the rearranged number with minimal value.
// Note that the sign of the number does not change after rearranging the digits.


// Solution: Sorting & Logic

// Positive numbers: Sort in asc order, then swap first zero with smallest non-zero.
// Negative numbers: Sort the digits in descending order, then turn into negative.

// Since the number of digits <= 15, it is constant.
// Time Complexity: O(1) 72ms
// Space Complexity: O(1) 44MB
var smallestNumber = function(num) {
  let neg = false;
  if (num < 0) {
    neg = true; 
    num = -num;
  }
  
  let digits = num.toString().split("");
  if (neg) {
    return -digits.sort((a, b) => b - a).join(""); // sort digits in desc order
  } else {
    digits.sort((a, b) => a - b);
    let firstNonZero = 0;
    for (let i = 0; i < digits.length; i++) { // find index of first non-zero
      if (digits[i] !== '0') {
        firstNonZero = i;
        break;
      }
    }
    [digits[0], digits[firstNonZero]] = [digits[firstNonZero], digits[0]]; // swap first non-zero with first zero
    return +digits.join("");
  }
};

// Two test cases to run function on
console.log(smallestNumber(310)) // 103
console.log(smallestNumber(-7605)) // -7650