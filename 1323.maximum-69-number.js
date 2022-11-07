// 1323. Maximum 69 Number
// You are given a positive integer num consisting only of digits 6 and 9.
// Return the maximum number you can get by changing at most one digit (6 becomes 9, and 9 becomes 6).


// Solution: Change First 6 into 9

// We only want to change 6 -> 9.
// Changing 9 -> 6 will only make the number smaller.

// Changing digits earlier on (left digits) will result in the biggest difference in the number.
// Change the first 6 into 9.

// Time Complexity: O(log(n)) 88ms
// Space Complexity: O(1) 42.3MB
var maximum69Number = function(num) {
  return Number(num.toString().replace('6', '9'));
};

// Three test cases
console.log(maximum69Number(9669)) // 9969
console.log(maximum69Number(9996)) // 9999
console.log(maximum69Number(9999)) // 9999