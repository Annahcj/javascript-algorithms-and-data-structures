// 2652. Sum Multiples
// Given a positive integer n, find the sum of all integers in the range [1, n] inclusive that are divisible by 3, 5, or 7.
// Return an integer denoting the sum of all numbers in the given range satisfying the constraint.


// Solution 1: Brute Force

// Go through each number from 1 to n. 
// Add it to the sum if it's divisible by 3, 5, or 7.

// Time Complexity: O(n) 70ms
// Space Complexity: O(1) 42.7MB
var sumOfMultiples = function(n) {
  let sum = 0;
  for (let i = 1; i <= n; i++) {
    if (i % 3 === 0 || i % 5 === 0 || i % 7 === 0) {
      sum += i;
    }
  }  
  return sum;
};


// Solution 2: Hashset

// Go through each multiple of 3, 5, and 7.
// Store unique multiples in a hashset and only add it to the sum if we haven't seen it before.

// Time Complexity: O(n/3 + n/5 + n/7) 84ms
// Space Complexity: O(n/3 + n/5 + n/7) 47.7MB
var sumOfMultiples = function(n) {
  let nums = [3, 5, 7], unique = new Set(), sum = 0;
  for (let num of nums) {
    let multiple = num;
    while (multiple <= n) {
      if (!unique.has(multiple)) {
        sum += multiple;
        unique.add(multiple);
      }
      multiple += num;
    }
  }
  return sum;
};

// Three test cases
console.log(sumOfMultiples(7)) // 21
console.log(sumOfMultiples(10)) // 40
console.log(sumOfMultiples(9)) // 30