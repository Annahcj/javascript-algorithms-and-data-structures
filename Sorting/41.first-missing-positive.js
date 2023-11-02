// 41. First Missing Positive
// Given an unsorted integer array nums, find the smallest missing positive integer.
// You must implement an algorithm that runs in O(n) time and uses constant extra space.


// Solution: Swap~sort into Place

// Thoughts:
// One thing to note is that our answer will always be within [1 to n+1] (n being the length of nums), so we can basically disregard anything smaller than 1 and bigger than the length of nums.
// With that in mind, we could make use of the input array nums to store each number in nums at the index of itself. 
// Because of the 0-index, we would store each number at itself - 1. 
// After the have finished, we can simply loop through nums and find the first number which is not equal to its index + 1.

// Algorithm:
// Loop through nums (pointer = i),
  // Define index to be nums[i] - 1 
  // If the number at index is not already nums[i], and nums[i] is bigger than 0, and smaller than or equal to the length of nums, 
    // Swap nums[i] into the place of index (nums[i] - 1)
    // Then decrement i to account for the new number we just swapped in
// When iteration is done, loop through nums one more time (pointer = j)
  // If nums[j] isn't the right number (not equal to j + 1), return j + 1.
// If iteration is finished and we got through the entire array, return the length of nums + 1. (the worst case: the contents of nums was every individual number from 1 to n).

// Time Complexity: O(n) (technically O(2n)) 108ms
// Space Complexity: O(1) 57.5MB
var firstMissingPositive = function(nums) {
  let n = nums.length;
  for (let i = 0; i < nums.length; i++) {
    let idx = nums[i] - 1;
    if (nums[idx] !== nums[i] && nums[i] > 0 && nums[i] <= n) {
      [nums[i], nums[idx]] = [nums[idx], nums[i]];
      i--;
    }
  }
  for (let j = 0; j < nums.length; j++) {
    if (nums[j] !== j + 1) {
      return j + 1;
    }
  }
  return n + 1;
};

// Five test cases
console.log(firstMissingPositive([1,2,3])) // 4
console.log(firstMissingPositive([1,2,0])) // 3
console.log(firstMissingPositive([5,3,1,8])) // 2
console.log(firstMissingPositive([3,4,-1,1])) // 2
console.log(firstMissingPositive([7,8,9,11,12])) // 1