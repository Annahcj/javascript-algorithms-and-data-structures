// 2357. Make Array Zero by Subtracting Equal Amounts
// You are given a non-negative integer array nums. In one operation, you must:
  // Choose a positive integer x such that x is less than or equal to the smallest non-zero element in nums.
  // Subtract x from every positive element in nums.
// Return the minimum number of operations to make every element in nums equal to 0.


// Solution: Count Distinct Positive Numbers

// The minimum number of operations is the number of distinct positive numbers.
// In one operation, we remove all occurances of a number, starting from the smallest numbers to the largest.

// Time Complexity: O(n) 87ms
// Space Complexity: O(n) 41.8MB
var minimumOperations = function(nums) {
  let unique = new Set();
  for (let num of nums) {
    if (num > 0) unique.add(num);
  }
  return unique.size;
};

// Two test cases
console.log(minimumOperations([1,5,0,3,5])) // 3
console.log(minimumOperations([0])) // 0