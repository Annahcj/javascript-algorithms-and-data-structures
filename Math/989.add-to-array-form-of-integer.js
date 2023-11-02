// 989. Add to Array-Form of Integer
// The array-form of an integer num is an array representing its digits in left to right order.
  // For example, for num = 1321, the array form is [1,3,2,1].
// Given num, the array-form of an integer, and an integer k, return the array-form of the integer num + k.


// Solution: Add Digit by Digit

// Add each digit in num with the digit in k starting from the back, keeping track of the carry.
// The carry will only ever be 0 or 1, since the maximum sum is 19 (9 + 9 + 1).
// To get the last digit from k, use k % 10.

// When we get the sum of each pair of digits, push the value to an array. 
// We can reverse it at the end since push takes O(1) time and unshift is O(n). By using push we save O(n) for each digit we add to the array.

// n = length of num, m = number of digits in k
// Time Complexity: O(max(n, m)) 107ms
// Space Complexity: O(max(n, m)) 48.2MB
var addToArrayForm = function(num, k) {
  let sum = [], carry = 0;
  for (let i = num.length - 1; i >= 0 || k > 0; i--) {
    let numDigit = i >= 0 ? num[i] : 0;
    let kDigit = k % 10;
    let digitSum = numDigit + kDigit + carry;
    carry = digitSum >= 10 ? 1 : 0;
    sum.push(digitSum % 10);
    k = Math.floor(k / 10);
  }
  if (carry) sum.push(carry);
  return sum.reverse();
};

// Two test cases
console.log(addToArrayForm([1,2,0,0], 34)) // [1,2,3,4]
console.log(addToArrayForm([2,7,4], 181)) // [4,5,5]