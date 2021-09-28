// 66. Plus One
// You are given a large integer represented as an integer array digits, where each digits[i] is the ith digit of the integer. The digits are ordered from most significant to least significant in left-to-right order. The large integer does not contain any leading 0's.
// Increment the large integer by one and return the resulting array of digits.


// Solution: Backwards Traversal

// Thoughts:
// The question is pretty simple, just add one to the last digit of digits.
// The only special case is 9, for that we would need to loop backwards for as long as the digits are 9, and turn them into 0's.

// Set i to digits.length - 1
// Loop while i is valid (0 or more) and digits[i] is equal to 9
  // set digits[i] to 0
  // decrement i
// if i is smaller than 0,
  // set digits[0] to 1
  // push an extra 0 in digits
  // return digits
// otherwise, increment digits[i] by one
// return digits

// Time Complexity: O(n) 76ms
// Space Complexity: O(1) 39MB
var plusOne = function(digits) {
  let i = digits.length - 1;
  while (i > -1 && digits[i] === 9) {
    digits[i] = 0;
    i--;
  }
  if (i < 0) {
    digits[0] = 1;
    digits.push(0);
    return digits;
  }
  digits[i]++;
  return digits;
};

// Four test cases to run function on
console.log(plusOne([1,2,3])) // [1,2,4]
console.log(plusOne([4,3,2,1])) // [4,3,2,2]
console.log(plusOne([0])) // [1]
console.log(plusOne([9])) // [1,0]