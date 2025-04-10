// 3375. Minimum Operations to Make Array Values Equal to K
// You are given an integer array nums and an integer k.
// An integer h is called valid if all values in the array that are strictly greater than h are identical.
// For example, if nums = [10, 8, 10, 8], a valid integer is h = 9 because all nums[i] > 9 are equal to 10, but 5 is not a valid integer.
// You are allowed to perform the following operation on nums:
  // Select an integer h that is valid for the current values in nums.
  // For each index i where nums[i] > h, set nums[i] to h.
// Return the minimum number of operations required to make every element in nums equal to k. If it is impossible to make all elements equal to k, return -1.


// Solution 1: Greedy w/ Hashset

// If the minimum nums[i] is smaller than k, it's impossible to make all elements equal to k.

// Handle every group of the same numbers, starting from the maximum.
// Set h to the next smaller number, and change the current group of numbers to be equal to h.

// This can be calculated by counting the distinct numbers in nums.
// At the end, if the minimum number is still larger than k, we need one more operation.

// Time Complexity: O(n) 53ms
// Space Complexity: O(n) 57.6MB
var minOperations = function(nums, k) {
  const set = new Set();
  let min = Infinity;
  for (let num of nums) {
    set.add(num);
    min = Math.min(min, num);
  }
  if (min < k) {
    return -1;
  }
  return (set.size - 1) + (min === k ? 0 : 1);
};


// Solution 2: Greedy w/ Sorting

// Instead of using a hashset, sort nums and iterate through to count the distinct numbers.

// Time Complexity: O(n log(n)) 47ms
// Space Complexity: O(log(n)) 57.7MB
var minOperations = function(nums, k) {
  nums.sort((a, b) => b - a);
  const n = nums.length;
  if (nums[n - 1] < k) {
    return -1;
  }
  let ops = 0;
  for (let i = 1; i < n; i++) {
    if (nums[i] !== nums[i - 1]) {
      ops++;
    }
  }
  return ops + (nums[n - 1] === k ? 0 : 1);
};

// Three test cases
console.log(minOperations([5,2,5,4,5], 2)) // 2
console.log(minOperations([2,1,2], 2)) // -1
console.log(minOperations([9,7,5,3], 1)) // 4