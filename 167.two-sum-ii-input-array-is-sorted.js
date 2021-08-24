// 167. Two Sum II - Input array is sorted
// Given an array of integers numbers that is already sorted in non-decreasing order, find two numbers such that they add up to a specific target number.
// Return the indices of the two numbers (1-indexed) as an integer array answer of size 2, where 1 <= answer[0] < answer[1] <= numbers.length.
// The tests are generated such that there is exactly one solution. You may not use the same element twice.


// Solution: Two Pointers

// set two pointers l, r to the start and end of the arr
  // loop through arr,
    // sum = arr[l] + arr[r]
    // if sum is equal to target, return [l + 1, r + 1].
    // if sum is bigger than target, decrement r
    // else, increment l

// Time Complexity: O(n) 80ms
// Space Complexity: O(1) 39.1MB
var twoSum = function(numbers, target) {
  let l = 0, r = numbers.length - 1;
  while (l < r) {
    let sum = numbers[l] + numbers[r];
    if (sum === target) return [l + 1, r + 1];
    if (sum > target) r--;
    else l++;
  }
};

// Three test cases to run function on
console.log(twoSum([2,7,11,15], 9)) // [1,2]
console.log(twoSum([2,3,4], 6)) // [1,3]
console.log(twoSum([-1,0], -1)) // [1,2]