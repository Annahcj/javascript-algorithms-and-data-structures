// 154. Find Minimum in Rotated Sorted Array II
// Suppose an array of length n sorted in ascending order is rotated between 1 and n times. For example, the array nums = [0,1,4,4,5,6,7] might become:
// [4,5,6,7,0,1,4] if it was rotated 4 times.
// [0,1,4,4,5,6,7] if it was rotated 7 times.
// Notice that rotating an array [a[0], a[1], a[2], ..., a[n-1]] 1 time results in the array [a[n-1], a[0], a[1], a[2], ..., a[n-2]].
// Given the sorted rotated array nums that may contain duplicates, return the minimum element of this array.
// You must decrease the overall operation steps as much as possible.


// Solution: Modified Binary Search

// Logic:
// There are four situations we may come across
// 1. mid is bigger than right (since we know a smaller number exists, set left to mid + 1)
// 2. mid is smaller than right (we know that mid is currently smallest, so we set right to mid)
// 3. mid is equal to right (we can't determine whether there are smaller numbers on the right or left, so set right to mid)
// in case 3, we can safely set right to mid since mid is equal to right
// when the loop finishes, return nums[left].

// Time Complexity: O(log(n)) to O(n) 74ms
// Space Complexity: O(1) 39.9MB
var findMin = function(nums) {
  let left = 0, right = nums.length - 1;
  while (left < right) {
    let mid = Math.floor((left + right) / 2);
    if (nums[mid] > nums[right]) left = mid + 1;
    else if (nums[mid] < nums[right]) right = mid;
    else right--;
  }  
  return nums[left];
}; 

// Five test cases to run function on
console.log(findMin([1,3,3])) // 1
console.log(findMin([2,2,3,3,2,2])) // 2
console.log(findMin([3,1,2,3])) // 1
console.log(findMin([1,3,5])) // 1
console.log(findMin([2,2,2,0,1])) // 0