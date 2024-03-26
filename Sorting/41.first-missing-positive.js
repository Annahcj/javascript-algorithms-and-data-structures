// 41. First Missing Positive
// Given an unsorted integer array nums, find the smallest missing positive integer.
// You must implement an algorithm that runs in O(n) time and uses constant extra space.


// Solution 1: Mark Visited as Negative

// 1. First pass through nums to get the minimum positive number.
// 2. Second pass through nums to turn all negative numbers to the minimum positive number (they are not positive, so we ignore them. we can't turn them into 0 or negative).
// 3. Third pass through nums, marking each nums[nums[i]] as negative to indicate it is present in the array.
// 4. Fourth pass through nums to find the first index with a positive value, indicating it is not present in the array.
  // If all numbers are negative, then return nums.length + 1

// Time Complexity: O(n) 83ms
// Space Complexity: O(1) 58.9MB
var firstMissingPositive = function(nums) {
  let n = nums.length, min = Infinity;
  for (let i = 0; i < n; i++) {
    if (nums[i] > 0) {
      min = Math.min(min, nums[i]);
    }
  }
  if (min === Infinity) return 1;
  for (let i = 0; i < n; i++) {
    if (nums[i] <= 0) {
      nums[i] = min;
    }
  }
  for (let num of nums) {
    let value = Math.abs(num) - 1;
    if (nums[value] > 0) {
      nums[value] = -nums[value];
    }
  }
  for (let i = 0; i < n; i++) {
    if (nums[i] > 0) {
      return i + 1;
    }
  }
  return n + 1;
};


// Solution 2: Swap~sort into Place

// One thing to note is that our answer will always be within [1 to n+1] (n being the length of nums), so we can basically disregard anything smaller than 1 and bigger than the length of nums.
// With that in mind, we can make use of the input array nums to store each number in nums at the index of itself.
// Because of the 0-index, we store each number at nums[nums[i] - 1].
// At the end, loop through nums and find the first number which is not equal to its index + 1.

// Time Complexity: O(n) 74ms
// Space Complexity: O(1) 55.3MB
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