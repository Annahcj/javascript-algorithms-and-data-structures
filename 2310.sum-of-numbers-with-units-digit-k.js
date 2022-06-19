// 2310. Sum of Numbers With Units Digit K
// Given two integers num and k, consider a set of positive integers with the following properties:
  // The units digit of each integer is k.
  // The sum of the integers is num.
// Return the minimum possible size of such a set, or -1 if no such set exists.
// Note:
  // The set can contain multiple instances of the same integer, and the sum of an empty set is considered 0.
  // The units digit of a number is the rightmost digit of the number.


// Solution: Math Logic

// e.g: num = 58, k = 9

// The 9 times tables:
// 1: 9
// 2: 18
// 3: 27
// 4: 36
// 5: 45
// and so on...

// We only need to find i where (i * k) % 10 === num % 10
// This is because it doesn't matter what number it is as long as it ends as the digit k.
// So if num = 58, we know that 2 * 9 = 18 has the same last digit as 58.
// This could be 9 + 49, 19 + 39, 29 + 29, it doesn't matter because when you add them up they will always have the same last digit, 8.
// i never has to go past 10 because after that it just repeats.

// The only exception is when i * k is bigger than num, in which case we will have to return -1.

// Time Complexity: O(1) 105ms
// Space Complexity: O(1) 42.2MB
var minimumNumbers = function(num, k) {
  if (num === 0) return 0;
  for (let i = 1; i <= 10; i++) {
    if (i * k > num) return -1;
    if ((i * k) % 10 === num % 10) return i;
  }
  return -1;
};

// Three test cases to run function on
console.log(minimumNumbers(58, 9)) // 2
console.log(minimumNumbers(3000, 9)) // 10
console.log(minimumNumbers(5, 1)) // 5