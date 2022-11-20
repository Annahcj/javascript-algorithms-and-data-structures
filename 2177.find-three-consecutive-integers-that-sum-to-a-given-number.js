// 2177. Find Three Consecutive Integers That Sum to a Given Number
// Given an integer num, return three consecutive integers (as a sorted array) that sum to num. If num cannot be expressed as the sum of three consecutive integers, return an empty array.


// Solution: Divisible by 3

// If the number is not divisible by 3, it cannot be expressed as the sum of three consective numbers.
// The middle number will always be num / 3. From here we can find the first and third numbers also.

// Time Complexity: O(1) 106ms
// Space Complexity: O(1) 42.6MB
var sumOfThree = function(num) {
  if (num % 3 !== 0) return [];
  return [num / 3 - 1, num / 3, num / 3 + 1];
};

// Two test cases
console.log(sumOfThree(33)) // [10,11,12]
console.log(sumOfThree(4)) // []