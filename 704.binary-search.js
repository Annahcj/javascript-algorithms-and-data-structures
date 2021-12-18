// 704. Binary Search
// Given an array of integers nums which is sorted in ascending order, and an integer target, write a function to search target in nums. If target exists, then return its index. Otherwise, return -1.


// Solution: Binary Search

// Time Complexity: O(log(n)) 84ms
// Space Complexity: O(1) 42.4MB
var search = function(nums, target) {
  let low = 0, high = nums.length - 1;
  while (low <= high) {
    let mid = Math.floor((low + high) / 2);
    if (nums[mid] === target) return mid;
    else if (nums[mid] < target) low = mid + 1;
    else high = mid - 1;
  }
  return -1;
};

// Two test cases to run function on
console.log(search([-1,0,3,5,9,12], 9)) // 4
console.log(search([-1,0,3,5,9,12], 2)) // -1