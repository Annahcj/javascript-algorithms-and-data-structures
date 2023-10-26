// 136. Single Number
// Given a non-empty array of integers nums, every element appears twice except for one. Find that single one.
// You must implement a solution with a linear runtime complexity and use only constant extra space.


// Solution 1: Add and Delete in Set

// Since a number can only occur at most twice, we can use a set to store the numbers.
// When we come across the second occurance of a number, delete it from the set.
// After the iteration is finished, the set will only contain the single number.

// Time Complexity: O(n) 132ms
// Space Complexity: O((n-1)/2 + 1) = O(n) 47.1MB
  // We only store the unique numbers, and delete it when a duplicate is found.
  // In the worst case, the set will contain (n-1)/2 + 1 numbers.
var singleNumber = function(nums) {
  let seen = new Set();  
  for (var num of nums) {
    if (seen.has(num)) seen.delete(num);
    else seen.add(num);
  }
  return [...seen][0];
};

// Solution 2: Bit Manipulation using XOR

// a ^ a = 0
// a ^ b ^ a = (a ^ a = 0) ^ b = b

// Time Complexity: O(n) 100ms
// Space Complexity: O(1) 43.2MB
var singleNumber = function(nums) {
  return nums.reduce((prev, curr) => prev ^ curr);
};

// Three test cases to run function on
console.log(singleNumber([2,2,1])) // 1
console.log(singleNumber([4,1,2,1,2])) // 4
console.log(singleNumber([1])) // 1