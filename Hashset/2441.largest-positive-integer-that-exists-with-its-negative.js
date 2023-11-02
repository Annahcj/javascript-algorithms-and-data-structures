// 2441. Largest Positive Integer That Exists With Its Negative
// Given an integer array nums that does not contain any zeros, find the largest positive integer k such that -k also exists in the array.
// Return the positive integer k. If there is no such integer, return -1.


// Solution: Hashset 

// Store numbers in a set for quick lookup.
// Find the maximum positive number where the negative number exists in the set.

// Time Complexity: O(n) 91ms
// Space Complexity: O(n) 46.2MB
var findMaxK = function(nums) {
  let set = new Set(nums), max = -1;
  for (let num of nums) {
    if (num > 0 && set.has(-num)) {
      max = Math.max(max, num);
    }
  }
  return max;
};

// Three test cases
console.log(findMaxK([-1,2,-3,3])) // 3
console.log(findMaxK([-1,10,6,7,-7,1])) // 7
console.log(findMaxK([-10,8,6,7,-2,-3])) // -1