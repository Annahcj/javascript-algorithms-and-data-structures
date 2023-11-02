// 1887. Reduction Operations to Make the Array Elements Equal
// Given an integer array nums, your goal is to make all elements in nums equal. To complete one operation, follow these steps:
  // 1. Find the largest value in nums. Let its index be i (0-indexed) and its value be largest. If there are multiple elements with the largest value, pick the smallest i.
  // 2. Find the next largest value in nums strictly smaller than largest. Let its value be nextLargest.
  // 3. Reduce nums[i] to nextLargest.
// Return the number of operations to make all elements in nums equal.


// Solution 1: Sorting & Hashmap

// Every number must become the smallest number in the end.
// Count the number of operations to change each number to the smallest number.

// 1. Get the unique numbers.
// 2. Sort in asc order.
// 3. Store the cost to change each number to the smallest in a hashmap
  // The number of operations to change num to the smallest number = count of unique numbers that are smaller than it = position in sorted unique array

// Time Complexity: O(n log(n)) 510ms
// Space Complexity: O(n) 73.4MB
var reductionOperations = function(nums) {
  let uniqueSet = new Set(), unique = [];
  for (let num of nums) {
    if (!uniqueSet.has(num)) {
      uniqueSet.add(num);
      unique.push(num);
    }
  }
  
  unique.sort((a, b) => a - b);
  let map = new Map(); // map.get(num) = number of operations to change num to the smallest number 
  for (let i = 0; i < unique.length; i++) {
    map.set(unique[i], i);
  }
  
  let ans = 0;
  for (let num of nums) {
    ans += map.get(num);
  }
  return ans;
};


// Solution 2: Sorting

// Sort nums in desc order.
// Process nums from largest to smallest.
  // If nums[i] is not equal to nums[i + 1], 
    // Count the cost to change every number in range [0, ..., i] to be nums[i + 1].

// When we find the second largest number, change every number we have processed so far to the second largest number.

// Time Complexity: O(n log(n)) 248ms
// Space Complexity: O(log(n)) (space for sorting) 54MB
var reductionOperations = function(nums) {
  let n = nums.length, ans = 0;
  nums.sort((a, b) => b - a);
  for (let i = 0; i < n - 1; i++) {
    if (nums[i] !== nums[i + 1]) ans += i + 1;
  }
  return ans;
};

// Three test cases
console.log(reductionOperations([5,1,3])) // 3
console.log(reductionOperations([1,1,1])) // 0
console.log(reductionOperations([1,1,2,2,3])) // 4