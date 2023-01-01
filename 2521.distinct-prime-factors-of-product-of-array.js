// 2521. Distinct Prime Factors of Product of Array
// Given an array of positive integers nums, return the number of distinct prime factors in the product of the elements of nums.
// Note that:
  // A number greater than 1 is called prime if it is divisible by only 1 and itself.
  // An integer val1 is a factor of another integer val2 if val2 / val1 is an integer.


// Solution: Find Prime Factors of Each Number

// Every number greater than 1 is made up of a product of prime numbers.
// Therefore we don't need to multiply the numbers together, we can get the prime factors from each individual number.
// Store the prime factors in a set and return the size of the set at the end.

// n = length of nums, m = max(nums[i])
// Time Complexity: O(n sqrt(m)) 84ms
// Space Complexity: O(sqrt(m)) 44.4MB
var distinctPrimeFactors = function(nums) {
  let distinct = new Set();
  for (let num of nums) {
    for (let x = 2; (x * x) <= num; x++) {
      while (num % x === 0) {
        distinct.add(x);
        num /= x;
      }
    }
    if (num > 1) distinct.add(num);
  }
  return distinct.size;
};

// Two test cases
console.log(distinctPrimeFactors([2,4,3,7,10,6])) // 4
console.log(distinctPrimeFactors([2,4,8,16])) // 1