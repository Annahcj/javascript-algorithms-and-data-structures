// 162. Find Peak Element
// A peak element is an element that is strictly greater than its neighbors.
// Given an integer array nums, find a peak element, and return its index. If the array contains multiple peaks, return the index to any of the peaks.


// Solution 1: Binary Search

// A few things to think about -
// Special cases: First or last numbers can be considered peaks as long as they are bigger than the number before/after them.
// At any given point in an array, if any number to the left or right of that point is bigger, we know that there must be a peak on that side. The order doesn't matter since we can return any peak. 
// There will always be a peak in the array since nums.length is always >= 1.

// Algorithm
// Create a binary search, returning index if it's a peak, otherwise searching the left side if nums[mid - 1] is bigger than mid point, or the right side if nums[mid + 1] is bigger mid point.

// Time Complexity: O(log(n)) 68ms
// Space Complexity: O(1) 38.8MB

var findPeakElement = function(nums) {
    let left = 0, right = nums.length - 1;
    if (nums.length === 1) return 0;
    while (left <= right) {
      let mid = Math.floor((left + right) / 2);
      if (mid === 0 && nums[mid + 1] < nums[mid]) return mid;
      else if (mid === nums.length - 1 && nums[mid - 1] < nums[mid]) return mid;
      else if (nums[mid] > nums[mid - 1] && nums[mid] > nums[mid + 1]) return mid;
      else if (nums[mid - 1] > nums[mid]) right = mid - 1;
      else if (nums[mid + 1] > nums[mid]) left = mid + 1;
    }
  };
  
  // Four test cases to run function on
  console.log(findPeakElement([1,2,3,4])) // 3
  console.log(findPeakElement([1])) // 0
  console.log(findPeakElement([1,2,3,1])) // 2
  console.log(findPeakElement([1,2,1,3,5,6,4])) // 5