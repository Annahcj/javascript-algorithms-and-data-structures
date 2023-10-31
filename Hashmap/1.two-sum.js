// 1. Two Sum
// Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.


// Solution: Hashmap

// Use a hashmap to store each number and its index in the array, but to save time, we should store them at the same time as we search for a pair.
// Loop through nums
  // Save nums[i] in a variable num to keep it tidy.
  // Since we only need to find one other number, we can look for target - num in the hashmap,
    // If there is target - num, return the index saved in the hashmap and the index of the current number.
    // Otherwise, save the index of num with the key as num.

// Time Complexity: O(n) 72ms
// Space Complexity: O(n) 40.5MB
var twoSum = function(nums, target) {
  let idxs = {};
  for (let i = 0; i < nums.length; i++) {
    let num = nums[i];
    if (idxs[target - num] >= 0) return [idxs[target - num], i];
    idxs[num] = i;
  }
};

// Three test cases
console.log(twoSum([2,7,11,15], 9)) // [0,1]
console.log(twoSum([3,2,4], 6)) // [1,2]
console.log(twoSum([3,3], 6)) // [0,1]