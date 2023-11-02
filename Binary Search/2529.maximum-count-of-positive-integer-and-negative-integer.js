// 2529. Maximum Count of Positive Integer and Negative Integer
// Given an array nums sorted in non-decreasing order, return the maximum between the number of positive integers and the number of negative integers.
  // In other words, if the number of positive integers in nums is pos and the number of negative integers is neg, then return the maximum of pos and neg.
// Note that 0 is neither positive nor negative.


// Solution 1: Brute Force

// Loop through nums and count the number of negative and positive numbers.

// Time Complexity: O(n) 78ms
// Space Complexity: O(1) 44.5MB
var maximumCount = function(nums) {
  let pos = 0, neg = 0;
  for (let num of nums) {
    if (num < 0) neg++;
    if (num > 0) pos++;
  }
  return Math.max(pos, neg);
};

// Solution 2: Binary Search

// Since nums is sorted, we can use binary search:
  // 1. Binary search for the index of the rightmost negative number.
  // 2. Binary search for the index of the leftmost positive number.
// Based on the indexes we can find the amount of negative and positive numbers.

// Time Complexity: O(log(n)) 64ms
// Space Complexity: O(1) 43.7MB
var maximumCount = function(nums) {
  return Math.max(upper_bound(nums), lower_bound(nums));
};

// binary search for the rightmost negative number
function upper_bound(nums) { 
  let low = 0, high = nums.length - 1;
  while (low < high) {
    let mid = Math.ceil((low + high) / 2);
    if (nums[mid] < 0) low = mid;
    else high = mid - 1;
  }
  return nums[0] >= 0 ? 0 : low + 1;
}

// binary search for the leftmost positive number
function lower_bound(nums) {
  let low = 0, high = nums.length - 1;
  while (low < high) {
    let mid = Math.floor((low + high) / 2);
    if (nums[mid] > 0) high = mid;
    else low = mid + 1;
  }
  return nums[nums.length - 1] <= 0 ? 0 : nums.length - low;
}

// Three test cases
console.log(maximumCount([-2,-1,-1,1,2,3])) // 3
console.log(maximumCount([-3,-2,-1,0,0,1,2])) // 3
console.log(maximumCount([5,20,66,1314])) // 4