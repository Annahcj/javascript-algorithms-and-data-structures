// 287. Find the Duplicate Number
// Given an array of integers nums containing n + 1 integers where each integer is in the range [1, n] inclusive.
// There is only one repeated number in nums, return this repeated number.
// You must solve the problem without modifying the array nums and uses only constant extra space.


// Solution 1: Negative Marking

// Note: This solution doesn't meet the requirements for this questions because it modifies the original array.

// Logic:
// Since the numbers are all within [1, n] where n + 1 is the length of the array, we can turn the number at the index of nums[i] into a negative number.
// for e.g: [1, 1, 2]
  // i = 0: nums[i] = 1, turn nums[nums[i]] to negative -> [1, -1, 2]
  // i = 1: nums[i] = -1 (1), since nums[nums[i]] is negative, return nums[i].
  

// Loop through nums (pointer = i)
  // let num be the absolute value of nums[i]
  // If nums[num] is negative, return num.
  // Otherwise, set nums[num] to negative.

// Time Complexity: O(n) 84ms
// Space Complexity: O(1) 47.7MB
var findDuplicate = function(nums) {
  for (var i = 0; i < nums.length; i++) {
    let num = Math.abs(nums[i]);
    if (nums[num] < 0) return num;
    nums[num] = -nums[num];
  } 
};

// Solution 2: Floyd's Tortoise and Hare
// https://en.wikipedia.org/wiki/Cycle_detection#Tortoise_and_hare

// Fast pointer goes twice as fast as slow pointer

// Time Complexity: O(n) 96ms
// Space Complexity: O(1) 47.8MB
var findDuplicate = function(nums) {
  let slow = nums[0];
  let fast = nums[slow];
  // Find the intersection point of the two runners.
  while (slow !== fast) {
    slow = nums[slow];
    fast = nums[nums[fast]];
  }
  slow = 0;
  // Find the "entrance" to the cycle.
  while (slow !== fast) {
    slow = nums[slow];
    fast = nums[fast];
  }
  return fast;
};

// Four test cases to run function on
console.log(findDuplicate([1,3,4,2,2])) // 2
console.log(findDuplicate([3,1,3,4,2])) // 3
console.log(findDuplicate([1,1])) // 1
console.log(findDuplicate([1,1,2])) // 1