// 1432. Max Difference You Can Get From Changing an Integer
// You are given an integer num. You will apply the following steps exactly two times:
  // Pick a digit x (0 <= x <= 9).
  // Pick another digit y (0 <= y <= 9). The digit y can be equal to x.
  // Replace all the occurrences of x in the decimal representation of num by y.
  // The new integer cannot have any leading zeros, also the new integer cannot be 0.
// Let a and b be the results of applying the operations to num the first and second times, respectively.
// Return the max difference between a and b.


// Solution 1: Greedy 

// It is optimal to create the minimum and maximum possible number.
// To create the minimum or maximum, the earliest digit we pick is the most significance (will make the biggest difference in the number).

// Build minimum number:
  // The digit must not be 0.
  // If the digit to change is a leading digit (equal to the first digit),
    // If the digit is 1, then we choose the next best digit. Because it would make no difference to change 1's to 1's.
    // Otherwise, change them to 1.
  // Otherwise, we can change it to be 0.

// Build maximum number:
  // Choose the first digit that is not 9, and turn them all into 9.

// Time Complexity: O(log(n)) 77ms
// Space Complexity: O(log(n)) 42.2MB
var maxDiff = function(num) {
  let str = num.toString();
  let min, max;
  for (let i = 0; i < str.length; i++) {
    // for minimum number
    let isLeadingDigit = str[i] === str[0];
    if (isLeadingDigit) {
      if (!min && str[i] !== '0' && str[i] !== '1') min = str.replaceAll(new RegExp(str[i], 'g'), '1');
    } else if (!min && str[i] !== '0') {
      min = str.replaceAll(new RegExp(str[i], 'g'), '0');
    }
    
    // for maximum number
    if (!max && str[i] !== '9') {
      max = str.replaceAll(new RegExp(str[i], 'g'), '9');
    }
  }
  min = Number(min), max = Number(max);
  min = min ? min: num;
  max = max ? max : num;
  return max - min;
};


// Solution 2: Try Every Digit 

// Given the same greedy logic, this time we go through every digit from 0 to 9,
  // Replace digit with 0 (for minimum number), 1 (for minimum number) and 9 (for maximum number).
  // Record the minimum and maximum number which has no leading zeros.

// Time Complexity: O(10 * log(n)) 109ms
// Space Complexity: O(10 * log(n)) 44.3MB
var maxDiff = function(num) {
  let str = num.toString();
  let min = num, max = num;
  for (let i = 0; i <= 9; i++) {
    let digit = i.toString();
    let replaceWith0 = str.replaceAll(new RegExp(digit, 'g'), '0');
    let replaceWith1 = str.replaceAll(new RegExp(digit, 'g'), '1');
    let replaceWith9 = str.replaceAll(new RegExp(digit, 'g'), '9');
    if (replaceWith0[0] !== '0') {
      min = Math.min(min, Number(replaceWith0));
    } 
    min = Math.min(min, Number(replaceWith1));
    max = Math.max(max, Number(replaceWith9));
  }
  return max - min;
};

// Two test cases
console.log(maxDiff(555)) // 888
console.log(maxDiff(9)) // 8