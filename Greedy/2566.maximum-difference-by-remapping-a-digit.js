// 2566. Maximum Difference by Remapping a Digit
// You are given an integer num. You know that Danny Mittal will sneakily remap one of the 10 possible digits (0 to 9) to another digit.
// Return the difference between the maximum and minimum values Danny can make by remapping exactly one digit in num.


// Solution: Greedy

// Max number: Change the first non-9 digit at the most significant place (leftmost) to 9. 
// Min number: Change the first digit (leftmost) to 0.
// Note that we change all occurances of the digit that we choose.

// Time Complexity: O(log(n)) 63ms
// Space Complexity: O(log(n)) 42.4MB
var minMaxDifference = function(num) {
  let str = num.toString().split("");
  let maxDigitToChange = '9', minDigitToChange = str[0];
  for (let i = 0; i < str.length; i++) {
    if (str[i] !== '9') {
      maxDigitToChange = str[i];
      break;
    }
  }
  let max = "", min = "";
  for (let i = 0; i < str.length; i++) {
    if (str[i] === maxDigitToChange) max += '9';
    else max += str[i];
    if (str[i] === minDigitToChange) min += '0';
    else min += str[i];
  }
  return Number(max) - Number(min);
};

// Two test cases
console.log(minMaxDifference(11891)) // 99009
console.log(minMaxDifference(90)) // 99