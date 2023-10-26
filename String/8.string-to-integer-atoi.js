// 8. String to Integer (atoi)
// Implement the myAtoi(string s) function, which converts a string to a 32-bit signed integer (similar to C/C++'s atoi function).
// The algorithm for myAtoi(string s) is as follows:
// Read in and ignore any leading whitespace.
// Check if the next character (if not already at the end of the string) is '-' or '+'. Read this character in if it is either. This determines if the final result is negative or positive respectively. Assume the result is positive if neither is present.
// Read in next the characters until the next non-digit charcter or the end of the input is reached. The rest of the string is ignored.
// Convert these digits into an integer (i.e. "123" -> 123, "0032" -> 32). If no digits were read, then the integer is 0. Change the sign as necessary (from step 2).
// If the integer is out of the 32-bit signed integer range [-231, 231 - 1], then clamp the integer so that it remains in the range. Specifically, integers less than -231 should be clamped to -231, and integers greater than 231 - 1 should be clamped to 231 - 1.
// Return the integer as the final result.
// Note:
// Only the space character ' ' is considered a whitespace character.
// Do not ignore any characters other than the leading whitespace or the rest of the string after the digits.


// Solution: Using Flag

// Set sign to 1 (multiply with num at the end), and num (parsed answer) to 0
// Set numExists to false (number or plus/minus has appeared before, meaning any non-number appearing after will be invalid)
// Set min and max bounds
// Loop through s (pointer = i)
  // If s[i] is minus or plus sign
    // if numExists is false,
      // set sign to 1 if s[i] is +, otherwise -1.
      // set numExists to true
    // otherwise, break.
  // otherwise if s[i] is a letter OR (numExists is true AND s[i] is a whitespace)
    // break
  // otherwise if s[i] is a number and not a whitespace
    // multiply num by 10 and add +s[i]
    // set numExists to true

// multiply num by sign
// if num is smaller than min bound, return min bound.
// otherwise if num is bigger than max bound, return max bound.
// otherwise, return num

// Time Complexity: O(n) 96ms
// Space Complexity: O(n) (the final num) 42.5MB
var myAtoi = function(s) {
  let sign = 1, num = 0;
  let numExists = false;
  let min = -(2 ** 31), max = (2 ** 31) - 1;
  for (var i = 0; i < s.length; i++) {
    if (s[i] === '-' || s[i] === '+') {
      if (!numExists) {
        sign = s[i] === '+' ? 1 : -1;
        numExists = true;
      } else {
        break;
      }
    } else if ((isNaN(s[i])) || (numExists && s[i] === ' ')) {
      break;
    } else if (!isNaN(s[i]) && s[i] !== ' ') {
      num = num * 10 + +s[i];
      if (!numExists) numExists = true;
    } 
  }  
  num *= sign;
  if (num < min) return min;
  if (num > max) return max;
  return num;
};

// Seven test cases to run function on
console.log(myAtoi("   +0 123")) // 0
console.log(myAtoi("00000-42a1234")) // 0
console.log(myAtoi("42")) // 42
console.log(myAtoi("   -42")) // -42
console.log(myAtoi("4193 with words")) // 4193
console.log(myAtoi("words and 987")) // 0
console.log(myAtoi("-91283472332")) // -2147483648