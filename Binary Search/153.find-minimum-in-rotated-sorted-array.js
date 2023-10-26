// 153. Find Minimum in Rotated Sorted Array
// Suppose an array of length n sorted in ascending order is rotated between 1 and n times. For example, the array nums = [0,1,2,4,5,6,7] might become:
// [4,5,6,7,0,1,2] if it was rotated 4 times.
// [0,1,2,4,5,6,7] if it was rotated 7 times.
// Notice that rotating an array [a[0], a[1], a[2], ..., a[n-1]] 1 time results in the array [a[n-1], a[0], a[1], a[2], ..., a[n-2]].
// Given the sorted rotated array nums of unique elements, return the minimum element of this array.
// You must write an algorithm that runs in O(log n) time.


// Solution: Modified Binary Search

// Logic:
// At any given point in nums, we have exactly two different situations:
// 1. The numbers from nums[mid] to nums[right] are in increasing order (nums[mid] is bigger than nums[right])
// 2. The numbers from nums[mid] to nums[right] are NOT in increasing order (nums[mid] is smaller than nums[right])
// At situation 1, we would definitely look further right as nums[mid] is already bigger than nums[right], so set left to mid + 1
// At situation 2, we would look left, but nums[mid] may be the minimum, so set right to mid.
// When the loop is finished, return nums[left].

// Time Complexity: (O log(n)) 95ms
// Space Complexity: O(1) 38.4MB
var findMin = function(nums) {
  let left = 0, right = nums.length - 1;
  while (left < right) {
    let mid = Math.floor((left + right) / 2);
    if (nums[mid] > nums[right]) left = mid + 1;
    if (nums[mid] < nums[right]) right = mid;
  }  
  return nums[left];
};

// Three test cases to run function on
console.log(findMin([3,4,5,1,2])) // 1
console.log(findMin([4,5,6,7,0,1,2])) // 0
console.log(findMin([11,13,15,17])) // 11